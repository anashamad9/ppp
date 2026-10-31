import type { Locale } from "@/i18n-config"

type ArticlePreview = { topic: string; content?: string; description?: string }

export function getArticleDescription(article: ArticlePreview): string {
  const paragraph = article.description || (article.content || "")
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\r?\n\s*\r?\n/)
    .find((block) => block.trim() && !/^\s*(?:#|!\[|\[chart:|<|\||[-*]\s)/.test(block))

  const plain = (paragraph || article.topic)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (plain.length <= 220) return plain
  const excerpt = plain.slice(0, 217).replace(/\s+\S*$/, "")
  return `${excerpt}…`
}

export function getArticleImagePath(lang: Locale, id: number, format: "svg" | "png" = "svg") {
  return `/${lang}/articles/${id}/header.${format}`
}
