import "server-only"
import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Locale } from "@/i18n-config"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
}

const markdownArticleFiles: Record<Locale, Record<number, string>> = {
  ar: {
    1: "article-ar.md",
    2: "article-product-future.md",
    3: "memory-in-llm-agents-ar.md",
  },
  en: {
    1: "article-en.md",
    3: "memory-in-llm-agents.md",
  },
}

type ArticlePreviewFields = {
  coverImage?: string
  ogImage?: string
  coverAlt?: string
}

function extractMarkdownTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function parseMarkdownFrontmatter(markdown: string): {
  body: string
  coverImage?: string
  ogImage?: string
  coverAlt?: string
} {
  const trimmed = markdown.trim()
  if (!trimmed.startsWith("---\n")) {
    return { body: trimmed }
  }

  const frontmatterEnd = trimmed.indexOf("\n---\n", 4)
  if (frontmatterEnd === -1) {
    return { body: trimmed }
  }

  const frontmatterBlock = trimmed.slice(4, frontmatterEnd)
  const body = trimmed.slice(frontmatterEnd + 5).trim()
  const entries = frontmatterBlock
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf(":")
      if (separatorIndex === -1) {
        return null
      }
      const key = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "")
      return [key, value] as const
    })
    .filter((entry): entry is readonly [string, string] => entry !== null)

  const frontmatter = Object.fromEntries(entries)

  return {
    body,
    coverImage: frontmatter.coverImage || frontmatter.cover_image,
    ogImage: frontmatter.ogImage || frontmatter.og_image,
    coverAlt: frontmatter.coverAlt || frontmatter.cover_alt,
  }
}

export const getDictionary = async (locale: Locale) => {
  const baseDictionary = await dictionaries[locale]()
  const dictionary = structuredClone(baseDictionary) as typeof baseDictionary
  const fileMap = markdownArticleFiles[locale]

  if (!Array.isArray(dictionary.articles)) {
    return dictionary
  }

  await Promise.all(
    Object.entries(fileMap).map(async ([articleId, filename]) => {
      const id = Number(articleId)
      const article = dictionary.articles.find((item) => item.id === id) as
        | (typeof dictionary.articles[number] & ArticlePreviewFields)
        | undefined

      if (!article) {
        return
      }

      try {
        const markdownPath = path.join(process.cwd(), "public", filename)
        const rawMarkdown = await readFile(markdownPath, "utf8")
        const { body, coverImage, ogImage, coverAlt } = parseMarkdownFrontmatter(rawMarkdown)
        const title = extractMarkdownTitle(body)

        article.content = body
        if (title) {
          article.topic = title
        }
        if (coverImage) {
          article.coverImage = coverImage
        }
        if (ogImage) {
          article.ogImage = ogImage
        }
        if (coverAlt) {
          article.coverAlt = coverAlt
        }
      } catch {
        // Keep JSON fallback content when markdown file is missing/unreadable.
      }
    }),
  )

  return dictionary
}
