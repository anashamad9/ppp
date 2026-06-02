"use client"

import { isValidElement, useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar, Clock, LockKeyhole } from "lucide-react"
import type { Locale } from "@/i18n-config"
import { ArticleChartBlock } from "./article-charts"
import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/shadcn-io/code-block"

type Article = {
  id: number
  enabled: boolean
  topic: string
  date: string
  readTime: string
  content?: string
  coverImage?: string
  coverAlt?: string
}

export default function ArticleDetailClient({
  lang,
  article,
  relatedArticles,
}: {
  lang: Locale
  article: Article
  relatedArticles: Article[]
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const isProtectedArticle = [4, 5, 6].includes(article.id)
  const headerImage = article.coverImage || "/anas logo.png"
  const headerAlt = article.coverAlt || article.topic
  const forceSnippetLtr = lang === "ar"

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const renderCodeSnippet = (codeValue: string, rawLanguage?: string) => {
    const languageMeta = rawLanguage ?? "text"
    const [langToken, filenameToken] = languageMeta.split(":")
    const normalizedLanguage = (langToken?.trim().toLowerCase() || "text") as BundledLanguage
    const filename =
      filenameToken?.trim() ||
      (normalizedLanguage && normalizedLanguage !== "text" ? `snippet.${normalizedLanguage}` : "snippet.txt")

    const data = [
      {
        language: normalizedLanguage,
        filename,
        code: codeValue.replace(/\n$/, ""),
      },
    ]

    return (
      <CodeBlock
        data={data}
        defaultValue={data[0].language}
        dir={forceSnippetLtr ? "ltr" : undefined}
        className={`mb-6 border-zinc-700/80 bg-zinc-950 text-zinc-100 [&_.bg-secondary]:!bg-zinc-900 [&_.border-b]:!border-zinc-700/80 [&_.text-muted-foreground]:!text-zinc-300 ${
          forceSnippetLtr ? "[&_pre]:text-left [&_code]:text-left [&_.line]:text-left" : ""
        }`}
      >
        <CodeBlockHeader className="gap-2">
          <CodeBlockFiles>
            {(item) => (
              <CodeBlockFilename key={item.language} value={item.language}>
                {item.filename}
              </CodeBlockFilename>
            )}
          </CodeBlockFiles>
          <CodeBlockCopyButton />
        </CodeBlockHeader>
        <CodeBlockBody>
          {(item) => (
            <CodeBlockItem
              key={item.language}
              value={item.language}
              lineNumbers={false}
              className="bg-zinc-950 text-zinc-100 [&_code]:overflow-x-visible [&_code]:whitespace-pre-wrap [&_code]:break-words [&_.line]:whitespace-pre-wrap [&_.line]:break-words"
            >
              <CodeBlockContent
                language={item.language}
                syntaxHighlighting={item.language !== "text"}
                themes={{ light: "vitesse-dark", dark: "vitesse-dark" }}
              >
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    )
  }

  const renderMarkdown = (markdown: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h2 className="mt-6 mb-3 text-xl font-semibold text-foreground">{children}</h2>,
        h2: ({ children }) => <h2 className="mt-6 mb-3 text-lg font-semibold text-foreground">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-4 mb-2 text-sm font-semibold text-foreground">{children}</h3>,
        p: ({ children }) => <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        hr: () => <hr className="my-6 border-border/60" />,
        ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 ps-6 text-sm text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 ps-6 text-sm text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {children}
          </a>
        ),
        pre: ({ children }) => {
          const firstChild = Array.isArray(children) ? children[0] : children
          if (isValidElement(firstChild)) {
            const className = String((firstChild.props as { className?: string }).className ?? "")
            const codeValue = String((firstChild.props as { children?: unknown }).children ?? "")
            const rawLanguage = className.match(/language-([^\s]+)/)?.[1] ?? "text"
            return renderCodeSnippet(codeValue, rawLanguage)
          }
          return <pre className="mb-6 overflow-x-auto rounded-md bg-muted p-3 text-sm">{children}</pre>
        },
        code: ({ children }) => {
          const text = String(children ?? "")
          return <code className="rounded bg-muted px-1 py-0.5 text-[0.85em] text-foreground">{text}</code>
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  )

  const renderArticleContent = () => {
    const content = article.content ?? ""
    const chartRegex = /(\[chart:[a-z0-9-]+\])/gi
    const segments = content.split(chartRegex)

    return segments.map((segment, index) => {
      const chartMatch = segment.trim().match(/^\[chart:([a-z0-9-]+)\]$/i)
      if (chartMatch) {
        return <ArticleChartBlock key={`chart-${chartMatch[1]}-${index}`} id={chartMatch[1]} lang={lang} />
      }
      if (!segment.trim()) {
        return null
      }
      return <div key={`md-${index}`}>{renderMarkdown(segment)}</div>
    })
  }

  const extractPreviewText = (content?: string) => {
    if (!content) return ""
    const cleaned = content
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
      .replace(/\[[^\]]+]\([^)]+\)/g, " ")
      .replace(/^#+\s+/gm, "")
      .replace(/[*_`>|-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return cleaned.slice(0, 180)
  }

  if (isProtectedArticle) {
    const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft

    return (
      <main className="flex flex-col items-center bg-background font-sans">
        <div className="flex w-full flex-col bg-background px-4 pt-16 pb-8 sm:px-6 sm:py-10 md:px-8">
          <Card className="mx-auto flex w-full max-w-[720px] border-none bg-transparent shadow-none">
            <CardContent
              className={`flex min-h-[calc(100vh-13rem)] w-full flex-col justify-center gap-6 p-0 transition-all duration-700 ease-out sm:p-4 ${
                isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
              }`}
            >
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LockKeyhole className="h-4 w-4" />
                  <span className={lang === "ar" ? "" : "uppercase"}>
                    {lang === "ar" ? "مقال مخفي" : "Protected article"}
                  </span>
                </div>
                <div className="max-w-[560px] space-y-3">
                  <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                    {lang === "ar" ? "هذا المقال محمي أو مخفي من المالك" : "This article is protected or hidden by the owner"}
                  </h1>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {lang === "ar"
                      ? "يمكنك الرجوع إلى قائمة المقالات وقراءة المقالات المتاحة حالياً."
                      : "You can go back to the articles list and read the articles that are currently available."}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/${lang}#articles`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <BackIcon className="h-4 w-4" />
                    <span className="border-b border-border pb-[2px]">
                      {lang === "ar" ? "العودة للمقالات" : "Back to articles"}
                    </span>
                  </Link>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background font-sans">
      <div
        className={`w-full min-h-screen px-4 pt-16 pb-10 sm:px-6 sm:py-10 md:px-8 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
        }`}
      >
        <Card className="mx-auto mb-8 w-full max-w-[720px] border-none bg-transparent shadow-none sm:mb-16">
          <CardContent className="flex flex-col gap-6 p-0 sm:p-4">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl border border-border/50 bg-muted/20">
                <img src={headerImage} alt={headerAlt} className="h-auto w-full object-cover" loading="eager" />
              </div>
              <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">{article.topic}</h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
                <Link
                  href={`/${lang}`}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                >
                  <span className="border-b border-border pb-[2px]">
                    {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
                  </span>
                </Link>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">{renderArticleContent()}</div>

            {relatedArticles.length > 0 ? (
              <section className="mt-4 space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  {lang === "ar" ? "اقرأ المزيد من المقالات" : "Read more articles"}
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((related) => {
                    const relatedImage = related.coverImage || "/anas logo.png"
                    const relatedAlt = related.coverAlt || related.topic
                    const preview = extractPreviewText(related.content)

                    return (
                      <Link
                        key={related.id}
                        href={`/${lang}/articles/${related.id}`}
                        className="group block rounded-3xl border border-border/60 bg-background/80 p-3 transition-colors hover:bg-muted/30"
                      >
                        <div className={`flex items-center gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                          <div className="min-w-0 flex-1 space-y-2">
                            <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                              {related.topic}
                            </h3>
                            {preview ? <p className="line-clamp-2 text-sm text-muted-foreground">{preview}...</p> : null}
                            <p className="text-sm text-muted-foreground">{related.date}</p>
                          </div>
                          <div className="h-28 w-36 shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-muted/20 sm:h-32 sm:w-44">
                            <img src={relatedImage} alt={relatedAlt} className="h-full w-full object-cover" loading="lazy" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${lang}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="border-b border-border pb-[2px]">
                  {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="border-b border-border pb-[2px]">
                  {lang === "ar" ? "العودة للأعلى" : "Back to top"}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
