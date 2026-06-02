import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { absUrl, PERSON_NAME_AR, PERSON_NAME_AR_STYLED, PERSON_NAME_EN, SITE_DESCRIPTION_AR, SITE_DESCRIPTION_EN, SITE_EMAIL, SITE_TITLE_AR, SITE_TITLE_EN } from "@/lib/site"
import PortfolioClient from "./portfolio-client"

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isArabic = params.lang === "ar"
  return {
    title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
    description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
    alternates: {
      canonical: `/${params.lang}`,
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
    ],
  }
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  // Load the correct language dictionary on the server
  const dict = await getDictionary(params.lang)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME_EN,
    alternateName: [PERSON_NAME_AR, PERSON_NAME_AR_STYLED, dict.header.name],
    url: absUrl(`/${params.lang}`),
    image: absUrl("/anas logo.png"),
    jobTitle: params.lang === "ar" ? "مهندس ذكاء اصطناعي وتعلم آلة" : "AI & Machine Learning Engineer",
    sameAs: [
      "https://www.linkedin.com/in/anas-hamad1909/",
      "https://github.com/anashamad9",
      "https://x.com/its_anas9",
      "https://huggingface.co/anashamad",
    ],
    email: SITE_EMAIL,
  }

  // Render the client component and pass data via props
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <PortfolioClient dict={dict} lang={params.lang} />
    </>
  )
}
