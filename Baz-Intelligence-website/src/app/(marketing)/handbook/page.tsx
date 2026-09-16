import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { BookOpen, ListTree } from 'lucide-react'
import { TopNav } from '@/components/top-nav'
import { HandbookToc, type TocSection } from './handbook-toc'

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'rule' }

type TocItem = {
  id: string
  text: string
  level: number
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const siteName = 'Atmet Technologies'
const title = 'Applied AI Automation Company Handbook | Atmet Technologies'
const description =
  'Internal handbook for positioning, selling, designing, building, deploying, and supporting custom AI automation systems.'
const handbookPath = path.join(process.cwd(), 'applied_ai_automation_company_handbook.md')

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/handbook',
  },
  openGraph: {
    type: 'article',
    url: '/handbook',
    siteName,
    title,
    description,
    locale: 'en_US',
    images: [
      {
        url: '/Preview Eng.png',
        width: 1200,
        height: 630,
        alt: 'Atmet Technologies handbook preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/Preview Eng.png'],
  },
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const stripMarkdown = (value: string) =>
  value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim()

function createHeadingId(text: string, counts: Map<string, number>) {
  const baseId = slugify(stripMarkdown(text)) || 'section'
  const count = counts.get(baseId) ?? 0
  counts.set(baseId, count + 1)
  return count === 0 ? baseId : `${baseId}-${count + 1}`
}

function parseMarkdown(markdown: string) {
  const blocks: MarkdownBlock[] = []
  const headingCounts = new Map<string, number>()
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let index = 0

  while (index < lines.length) {
    const rawLine = lines[index] ?? ''
    const line = rawLine.trim()

    if (!line) {
      index += 1
      continue
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line)
    if (headingMatch) {
      const text = headingMatch[2].trim()
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text,
        id: createHeadingId(text, headingCounts),
      })
      index += 1
      continue
    }

    if (/^-{3,}$/.test(line)) {
      blocks.push({ type: 'rule' })
      index += 1
      continue
    }

    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (index < lines.length && lines[index]?.trim().startsWith('>')) {
        quoteLines.push((lines[index] ?? '').trim().replace(/^>\s?/, ''))
        index += 1
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') })
      continue
    }

    const bulletMatch = /^[-*]\s+(.+)$/.exec(line)
    const orderedMatch = /^\d+\.\s+(.+)$/.exec(line)
    if (bulletMatch || orderedMatch) {
      const ordered = Boolean(orderedMatch)
      const items: string[] = []

      while (index < lines.length) {
        const current = (lines[index] ?? '').trim()
        const match = ordered ? /^\d+\.\s+(.+)$/.exec(current) : /^[-*]\s+(.+)$/.exec(current)
        if (!match) break
        items.push(match[1].trim())
        index += 1
      }

      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const current = (lines[index] ?? '').trim()
      if (
        !current ||
        /^(#{1,6})\s+/.test(current) ||
        /^-{3,}$/.test(current) ||
        current.startsWith('>') ||
        /^[-*]\s+/.test(current) ||
        /^\d+\.\s+/.test(current)
      ) {
        break
      }
      paragraphLines.push(current)
      index += 1
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
  }

  return blocks
}

function renderInline(text: string) {
  const parts: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index))
    }

    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${match.index}-strong`} className="font-medium text-black dark:text-white/90">
          {token.slice(2, -2)}
        </strong>,
      )
    } else {
      parts.push(
        <code
          key={`${match.index}-code`}
          className="rounded bg-site-gray-ui px-1 py-0.5 text-[0.9em] text-black/80 dark:text-white/80"
        >
          {token.slice(1, -1)}
        </code>,
      )
    }

    cursor = match.index + token.length
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }

  return parts
}

function MarkdownContent({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="space-y-0">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Heading = `h${Math.min(block.level + 1, 6)}` as HeadingTag
          const spacingClass = block.level <= 1 ? 'mt-12 scroll-mt-24 text-xl leading-7' : 'mt-9 scroll-mt-24 text-base leading-6'
          const colorClass = block.level <= 1 ? 'text-black dark:text-white/90' : 'text-black/85 dark:text-white/80'

          return (
            <Heading
              key={block.id}
              id={block.id}
              className={`${spacingClass} ${colorClass} font-medium tracking-normal first:mt-0`}
            >
              {renderInline(block.text)}
            </Heading>
          )
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="mt-3 text-base leading-7 font-light text-black/68 dark:text-white/64">
              {renderInline(block.text)}
            </p>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={index}
              className="mt-4 rounded-md border border-black/10 bg-site-gray-surface px-4 py-3 text-base leading-7 font-light text-black/75 dark:border-white/10 dark:text-white/72"
            >
              {renderInline(block.text)}
            </blockquote>
          )
        }

        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul'
          return (
            <List
              key={index}
              className={`mt-3 space-y-1.5 pl-5 text-base leading-7 font-light text-black/68 dark:text-white/64 ${
                block.ordered ? 'list-decimal' : 'list-disc'
              }`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </List>
          )
        }

        return <hr key={index} className="my-10 border-black/10 dark:border-white/10" />
      })}
    </div>
  )
}

function createTocSections(items: TocItem[]) {
  const sections: TocSection[] = []

  for (const item of items) {
    if (item.level <= 1 || sections.length === 0) {
      sections.push({
        id: item.id,
        text: item.text,
        children: [],
      })
      continue
    }

    sections[sections.length - 1].children.push({
      id: item.id,
      text: item.text,
    })
  }

  return sections
}

export default async function HandbookPage() {
  const markdown = await readFile(handbookPath, 'utf8')
  const parsedBlocks = parseMarkdown(markdown)
  const documentTitle =
    parsedBlocks[0]?.type === 'heading' ? stripMarkdown(parsedBlocks[0].text) : 'Applied AI Automation Company Handbook'
  const contentBlocks = parsedBlocks[0]?.type === 'heading' ? parsedBlocks.slice(1) : parsedBlocks
  const tocItems: TocItem[] = contentBlocks
    .filter((block): block is Extract<MarkdownBlock, { type: 'heading' }> => block.type === 'heading' && block.level <= 2)
    .map((block) => ({
      id: block.id,
      text: stripMarkdown(block.text),
      level: block.level,
    }))
  const tocSections = createTocSections(tocItems)

  return (
    <main className="min-h-screen bg-white px-6 pt-16 pb-20 text-black sm:px-8 dark:bg-background dark:text-white">
      <TopNav
        isArabic={false}
        logo="Atmet Technologies"
        services="Services"
        articles="Cases"
        sayHi="Say Hi"
        homeHref="/en"
        servicesHref="/en/what-we-do"
        articlesHref="/en/articles"
        contactHref="/en/contact"
      />

      <section className="mx-auto grid w-full max-w-6xl gap-8 pt-8 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] leading-4 font-medium tracking-[0.12em] text-black/45 uppercase dark:text-white/45">
              <ListTree className="size-3.5" />
              Contents
            </div>
            <HandbookToc sections={tocSections} />
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-black/10 pb-8 dark:border-white/10">
            <div className="inline-flex items-center gap-2 rounded-md bg-site-gray-ui px-2 py-1 text-xs leading-4 font-light text-black/65 dark:text-white/65">
              <BookOpen className="size-3.5" />
              Internal Guide
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl leading-9 font-medium tracking-normal text-black sm:text-4xl sm:leading-11 dark:text-white/90">
              {documentTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 font-light text-black/65 dark:text-white/64">
              A clean reader view generated directly from{' '}
              <span className="font-medium text-black/75 dark:text-white/75">applied_ai_automation_company_handbook.md</span>.
            </p>
          </header>

          <article className="max-w-3xl pt-8">
            <MarkdownContent blocks={contentBlocks} />
          </article>
        </div>
      </section>
    </main>
  )
}
