import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import PortfolioClient from "../portfolio-client"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

export default async function ResumePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)
  return <PortfolioClient dict={dict} lang={params.lang} />
}
