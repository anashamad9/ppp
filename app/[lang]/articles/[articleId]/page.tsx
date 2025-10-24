import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import ArticleDetailClient from "../article-detail-client"
import { notFound } from "next/navigation"

type ArticleParams = {
  params: {
    lang: Locale
    articleId: string
  }
}

export default async function ArticlePage({ params }: ArticleParams) {
  const dict = await getDictionary(params.lang)
  const article = dict.articles.find((item) => item.enabled && String(item.id) === params.articleId)

  if (!article) {
    notFound()
  }

  return <ArticleDetailClient lang={params.lang} article={article} />
}
