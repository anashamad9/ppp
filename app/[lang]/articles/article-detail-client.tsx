"use client"

import { useEffect, useState, ReactNode } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import type { Locale } from "@/i18n-config"
import { ArticleChartBlock } from "./article-charts"
import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block"
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/shadcn-io/code-block"

type Article = {
  id: number
  enabled: boolean
  topic: string
  date: string
  readTime: string
  content?: string
}

export default function ArticleDetailClient({
  lang,
  article,
}: {
  lang: Locale
  article: Article
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const renderArticleContent = () => {
    const content = article.content ?? ""
    const lines = content.split("\n")
    const elements: ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
      const rawLine = lines[i]
      const trimmed = rawLine.trim()

      if (!trimmed) {
        i += 1
        continue
      }

      if (trimmed.startsWith("```")) {
        const rawMeta = trimmed.replace("```", "").trim()
        let language: BundledLanguage = "text"
        let filename = "snippet.txt"

        if (rawMeta) {
          const colonSplit = rawMeta.split(":")
          if (colonSplit.length > 1 && colonSplit[0].trim()) {
            language = colonSplit[0].trim().toLowerCase() as BundledLanguage
            const potentialFilename = colonSplit.slice(1).join(":").trim()
            if (potentialFilename) {
              filename = potentialFilename
            } else if (language && language !== "text") {
              filename = `snippet.${language}`
            }
          } else {
            const tokens = rawMeta.split(/\s+/).filter(Boolean)
            if (tokens.length > 0) {
              language = tokens[0].toLowerCase() as BundledLanguage
              if (tokens.length > 1) {
                filename = tokens.slice(1).join(" ")
              } else if (language && language !== "text") {
                filename = `snippet.${language}`
              }
            }
          }
        }

        const codeLines: string[] = []
        i += 1
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i])
          i += 1
        }
        i += 1

        const data = [
          {
            language,
            filename,
            code: codeLines.join("\n"),
          },
        ]

        const defaultLanguage = data[0]?.language ?? "text"
        const shouldShowSelect = data.length > 1

        elements.push(
          <CodeBlock
            key={`code-${key}`}
            data={data}
            defaultValue={defaultLanguage}
            className="mb-6 border-border/60 bg-muted/40"
          >
            <CodeBlockHeader className="gap-2">
              <CodeBlockFiles>
                {(item) => (
                  <CodeBlockFilename key={item.language} value={item.language}>
                    {item.filename}
                  </CodeBlockFilename>
                )}
              </CodeBlockFiles>
              {shouldShowSelect ? (
                <CodeBlockSelect>
                  <CodeBlockSelectTrigger>
                    <CodeBlockSelectValue />
                  </CodeBlockSelectTrigger>
                  <CodeBlockSelectContent>
                    {(item) => (
                      <CodeBlockSelectItem key={item.language} value={item.language}>
                        {item.language}
                      </CodeBlockSelectItem>
                    )}
                  </CodeBlockSelectContent>
                </CodeBlockSelect>
              ) : null}
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem key={item.language} value={item.language}>
                  <CodeBlockContent
                    language={item.language}
                    syntaxHighlighting={item.language !== "text"}
                  >
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        )
        key += 1
        continue
      }

      if (trimmed.startsWith("##")) {
        elements.push(
          <h2 key={`heading-${key}`} className="mt-6 mb-3 text-lg font-semibold text-foreground">
            {trimmed.replace("##", "").trim()}
          </h2>
        )
        key += 1
        i += 1
        continue
      }

      const chartMatch = trimmed.match(/^\[chart:([a-z0-9-]+)\]$/i)
      if (chartMatch) {
        elements.push(<ArticleChartBlock key={`chart-${chartMatch[1]}-${key}`} id={chartMatch[1]} lang={lang} />)
        key += 1
        i += 1
        continue
      }

      if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length > 4) {
        elements.push(
          <h3 key={`subheading-${key}`} className="mt-4 mb-2 text-sm font-semibold text-foreground">
            {trimmed.replace(/\*\*/g, "")}
          </h3>
        )
        key += 1
        i += 1
        continue
      }

      elements.push(
        <p key={`paragraph-${key}`} className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {trimmed}
        </p>
      )
      key += 1
      i += 1
    }

    return elements
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
              <Link
                href={`/${lang}#articles`}
                className="text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                {lang === "ar" ? "العودة إلى المقالات" : "Back to articles"}
              </Link>
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
              </div>
            </div>

            <div className="prose prose-sm max-w-none">{renderArticleContent()}</div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${lang}#articles`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="border-b border-border pb-[2px]">
                  {lang === "ar" ? "العودة إلى المقالات" : "Back to articles"}
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
