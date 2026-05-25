import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import ArticleDetailClient from "../article-detail-client"
import { notFound } from "next/navigation"
import { SITE_DESCRIPTION_AR, SITE_DESCRIPTION_EN, SITE_TITLE_AR, SITE_TITLE_EN } from "@/lib/site"

type ArticleParams = {
  params: {
    lang: Locale
    articleId: string
  }
}

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const article = dict.articles.find((item) => item.enabled && String(item.id) === params.articleId)
  const isArabic = params.lang === "ar"

  if (!article) {
    return {
      title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
      description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
      robots: { index: false, follow: true },
    }
  }

  return {
    title: `${article.topic} | ${isArabic ? "المقالات" : "Articles"} | Anas Hamad`,
    description: article.content?.slice(0, 160) || (isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN),
    alternates: {
      canonical: `/${params.lang}/articles/${params.articleId}`,
      languages: {
        en: `/en/articles/${params.articleId}`,
        ar: `/ar/articles/${params.articleId}`,
      },
    },
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
