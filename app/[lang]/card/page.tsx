import type { Metadata } from "next"
import { BadgePage } from "@/components/card/badge-page"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: "Anas Hamad | Digital Card",
    description: "Meet Anas Hamad, AI & Machine Learning Engineer in Amman, Jordan. An interactive digital business card.",
    alternates: { canonical: `/${lang}/card`, languages: { en: "/en/card", ar: "/ar/card" } },
  }
}

export default async function CardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <BadgePage lang={lang === "ar" ? "ar" : "en"} />
}
