import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import ArticleDetailClient from "../article-detail-client"
import { notFound } from "next/navigation"
import { PERSON_NAME_EN, SITE_DESCRIPTION_AR, SITE_DESCRIPTION_EN, SITE_TITLE_AR, SITE_TITLE_EN } from "@/lib/site"
import { getRequestSiteUrl } from "@/lib/site-url.server"

type ArticleParams = {
  params: Promise<{
    lang: string
    articleId: string
  }>
}

type ArticlePreviewFields = {
  coverImage?: string
  ogImage?: string
  coverAlt?: string
}

const stripMarkdown = (value = "") =>
  value
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`~\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim()

const getDescription = (content: string | undefined, fallback: string) => {
  const plainText = stripMarkdown(content)
  return plainText ? plainText.slice(0, 155) : fallback
}

const toIsoDate = (value: string | undefined) => {
  if (!value) {
    return undefined
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  const { lang: langParam, articleId } = await params
  const lang = langParam as Locale
  const siteUrl = await getRequestSiteUrl()
  const dict = await getDictionary(lang)
  const article = dict.articles.find((item) => item.enabled && String(item.id) === articleId)
  const isArabic = lang === "ar"

  if (!article) {
    return {
      title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
      description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
      robots: { index: false, follow: true },
    }
  }

  const articlePreview = article as typeof article & ArticlePreviewFields
  const previewImage = articlePreview.ogImage || articlePreview.coverImage || "/anas-preview.png"
  const previewImageUrl = previewImage.startsWith("http") ? previewImage : `${siteUrl}${previewImage}`
  const previewImageAlt = articlePreview.coverAlt || article.topic
  const description = getDescription(article.content, isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN)
  const canonicalPath = `/${lang}/articles/${articleId}`
  const publishedTime = toIsoDate(article.date)

  return {
    title: `${article.topic} | ${isArabic ? "المقالات" : "Articles"} | Anas Hamad`,
    description,
    authors: [{ name: PERSON_NAME_EN, url: siteUrl }],
    creator: PERSON_NAME_EN,
    publisher: PERSON_NAME_EN,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}${canonicalPath}`,
      title: article.topic,
      description,
      siteName: "Anas Hamad",
      locale: isArabic ? "ar_JO" : "en_US",
      publishedTime,
      authors: [PERSON_NAME_EN],
      images: [
        {
          url: previewImageUrl,
          width: 1200,
          height: 629,
          alt: previewImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.topic,
      description,
      images: [previewImageUrl],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en/articles/${articleId}`,
        ar: `/ar/articles/${articleId}`,
      },
    },
  }
}

export default async function ArticlePage({ params }: ArticleParams) {
  const { lang: langParam, articleId } = await params
  const lang = langParam as Locale
  const siteUrl = await getRequestSiteUrl()
  const dict = await getDictionary(lang)
  const article = dict.articles.find((item) => item.enabled && String(item.id) === articleId)
  const isArabic = lang === "ar"

  if (!article) {
    notFound()
  }

  const relatedArticles = dict.articles
    .filter((item) => item.enabled && item.id !== article.id)
    .slice(0, 3)
  const articlePreview = article as typeof article & ArticlePreviewFields
  const previewImage = articlePreview.ogImage || articlePreview.coverImage || "/anas-preview.png"
  const publishedDate = toIsoDate(article.date)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.topic,
    description: getDescription(article.content, isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN),
    image: previewImage.startsWith("http") ? previewImage : `${siteUrl}${previewImage}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: PERSON_NAME_EN,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: PERSON_NAME_EN,
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/${lang}/articles/${articleId}`,
    inLanguage: isArabic ? "ar" : "en",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ArticleDetailClient lang={lang} article={article} relatedArticles={relatedArticles} />
    </>
  )
}
