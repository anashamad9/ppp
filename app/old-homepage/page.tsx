import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import { PERSON_NAME_AR, PERSON_NAME_AR_STYLED, PERSON_NAME_EN, SITE_EMAIL, SITE_TITLE_AR, SITE_DESCRIPTION_AR } from "@/lib/site"
import { getRequestSiteUrl } from "@/lib/site-url.server"
import PortfolioClient from "../[lang]/portfolio-client"

const featuredArticleIds = new Set([1, 3, 4, 5])

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SITE_TITLE_AR,
    description: SITE_DESCRIPTION_AR,
    alternates: {
      canonical: "/old-homepage",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function OldHomepagePage() {
  const lang = "ar" as const
  const siteUrl = await getRequestSiteUrl()
  const dict = await getDictionary(lang)
  const featuredArticles = dict.articles.filter((article) => article.enabled && featuredArticleIds.has(article.id)).slice(0, 4)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME_EN,
    alternateName: [PERSON_NAME_AR, PERSON_NAME_AR_STYLED, dict.header.name],
    url: `${siteUrl}/${lang}`,
    image: `${siteUrl}/anas-logo.png`,
    jobTitle: "مهندس ذكاء اصطناعي وتعلم آلة",
    sameAs: [
      "https://www.linkedin.com/in/anas-hamad1909",
      "https://github.com/anashamad9",
      "https://x.com/its_anas9",
      "https://huggingface.co/anashamad",
    ],
    email: SITE_EMAIL,
  }
  const articleItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مقالات أنس حمد",
    description: "أهم مقالات أنس حمد حول الذكاء الاصطناعي، الوكلاء، المنتجات، والأتمتة.",
    itemListElement: featuredArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.topic,
      url: `${siteUrl}/${lang}/articles/${article.id}`,
    })),
  }
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anas Hamad",
    alternateName: ["Anas Hamad Portfolio", "Anas Hamad Articles", PERSON_NAME_AR],
    url: `${siteUrl}/${lang}`,
    inLanguage: lang,
    publisher: {
      "@type": "Person",
      name: PERSON_NAME_EN,
      url: `${siteUrl}/${lang}`,
    },
    hasPart: featuredArticles.map((article) => ({
      "@type": "Article",
      headline: article.topic,
      url: `${siteUrl}/${lang}/articles/${article.id}`,
      author: {
        "@type": "Person",
        name: PERSON_NAME_EN,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleItemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <PortfolioClient dict={dict} lang={lang} />
    </>
  )
}
