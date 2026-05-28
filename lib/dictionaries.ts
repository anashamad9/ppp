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
  },
  en: {
    1: "article-en.md",
  },
}

function extractMarkdownTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
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
      const article = dictionary.articles.find((item) => item.id === id)

      if (!article) {
        return
      }

      try {
        const markdownPath = path.join(process.cwd(), "public", filename)
        const markdown = (await readFile(markdownPath, "utf8")).trim()
        const title = extractMarkdownTitle(markdown)

        article.content = markdown
        if (title) {
          article.topic = title
        }
      } catch {
        // Keep JSON fallback content when markdown file is missing/unreadable.
      }
    }),
  )

  return dictionary
}
