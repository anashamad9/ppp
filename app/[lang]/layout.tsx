import "@/app/globals.css"
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { TopControls } from "@/components/top-controls"
import { i18n, type Locale } from "@/i18n-config"
import { SITE_DESCRIPTION_AR, SITE_DESCRIPTION_EN, SITE_TITLE_AR, SITE_TITLE_EN, SITE_URL } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans-arabic",
  preload: true,
  fallback: ["Noto Sans Arabic", "Arial Unicode MS", "Tahoma", "sans-serif"],
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const isArabic = lang === "ar"
  return {
    metadataBase: new URL(SITE_URL),
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
    openGraph: {
      type: "website",
      url: `/${lang}`,
      title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
      description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
      siteName: "Anas Hamad",
      locale: isArabic ? "ar_JO" : "en_US",
      images: [
        {
          url: "/anas-preview.png",
          width: 1200,
          height: 630,
          alt: "Anas Hamad",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? SITE_TITLE_AR : SITE_TITLE_EN,
      description: isArabic ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION_EN,
      images: ["/anas-preview.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/anas logo.png",
      shortcut: "/anas logo.png",
      apple: "/anas logo.png",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${ibmPlexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/anas logo.png" sizes="any" />
        <link rel="icon" href="/anas logo.png" type="image/png" />
        <link rel="shortcut icon" href="/anas logo.png" />
        <link rel="apple-touch-icon" href="/anas logo.png" />
      </head>
      <body className={lang === "ar" ? "font-arabic" : "font-sans"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <TopControls lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  )
}
