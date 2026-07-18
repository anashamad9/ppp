import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { PERSON_NAME_AR, PERSON_NAME_AR_STYLED, PERSON_NAME_EN, SITE_DESCRIPTION_AR, SITE_DESCRIPTION_EN, SITE_EMAIL, SITE_TITLE_AR, SITE_TITLE_EN } from "@/lib/site"
import { getRequestSiteUrl } from "@/lib/site-url.server"
import PortfolioClient from "./portfolio-client"

const featuredArticleIds = new Set([7, 1, 3, 4, 5])

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const isArabic = lang === "ar"
  return {
    title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
    description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    keywords: [
      "Anas Hamad",
      "أنس حمد",
      "انــــــس حمد",
      "AI Engineer",
      "Machine Learning Engineer",
      "Jordan",
      "Amman",
      "Anas Hamad articles",
      "AI articles",
      "product development articles",
    ],
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/anas-logo.png",
      shortcut: "/anas-logo.png",
      apple: "/anas-logo.png",
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const siteUrl = await getRequestSiteUrl()
  // Load the correct language dictionary on the server
  const dict = await getDictionary(lang)
  const featuredArticles = dict.articles.filter((article) => article.enabled && featuredArticleIds.has(article.id)).slice(0, 4)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME_EN,
    alternateName: [PERSON_NAME_AR, PERSON_NAME_AR_STYLED, dict.header.name],
    url: `${siteUrl}/${lang}`,
    image: `${siteUrl}/anas-logo.png`,
    jobTitle: lang === "ar" ? "مهندس ذكاء اصطناعي وتعلم آلة" : "AI & Machine Learning Engineer",
    sameAs: [
      "https://www.linkedin.com/in/anas-hamad1909",
      "https://github.com/anashamad9",
      "https://x.com/buildanas?s=11&t=xHJPYPOInZK-SWRzKy7yWA",
      "https://huggingface.co/anashamad",
    ],
    email: SITE_EMAIL,
  }
  const articleItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "ar" ? "مقالات أنس حمد" : "Anas Hamad Articles",
    description:
      lang === "ar"
        ? "أهم مقالات أنس حمد حول الذكاء الاصطناعي، الوكلاء، المنتجات، والأتمتة."
        : "Featured articles by Anas Hamad about AI, agents, products, and automation.",
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

  // Render the client component and pass data via props
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleItemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <PortfolioClient dict={dict} lang={lang} hideExperience hideTechStack hideArticles compactHome directContactHref={`mailto:${SITE_EMAIL}`} />
    </>
  )
}
