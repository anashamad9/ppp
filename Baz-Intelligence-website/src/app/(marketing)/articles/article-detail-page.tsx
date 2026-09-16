'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import type { Article } from '@/lib/articles'
import { getLocalizedArticle } from '@/lib/articles'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { MarketingFooter } from '@/components/marketing-footer'
import { TopNav } from '@/components/top-nav'

type Language = 'en' | 'ar'

const STORAGE_KEY = 'baz-language'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const copy = {
  en: {
    nav: {
      logo: 'Atmet Technologies',
      whatWeDo: 'Services',
      articles: 'Cases',
      sayHi: 'Say Hi',
    },
    back: 'Back to articles',
    contact: {
      x: 'X',
      instagram: 'Instagram',
      linkedIn: 'LinkedIn',
    },
  },
  ar: {
    nav: {
      logo: 'أتمت تيكنولوجيس',
      whatWeDo: 'الخدمات',
      articles: 'الحالات',
      sayHi: 'تواصل',
    },
    back: 'العودة للمقالات',
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
} as const

function ArticleHeaderImage({ article }: { article: Article }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-md bg-site-gray-surface outline outline-1 -outline-offset-1 outline-black/10 dark:bg-white/5 dark:outline-white/10">
      {!hasImageError ? (
        <Image
          src={article.imageSrc}
          alt={article.title}
          width={1600}
          height={900}
          unoptimized
          className="h-full w-full object-cover"
          priority
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4 text-center">
          <p className="text-xs leading-5 font-light text-black/45 dark:text-white/45">
            Header image placeholder · 1600 × 900 px · {article.imageSrc}
          </p>
        </div>
      )}
    </div>
  )
}

export function ArticleDetailPage({
  article,
  initialLanguage = 'en',
}: {
  article: Article
  initialLanguage?: Language
}) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', mediaQuery.matches)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [])

  const isArabic = language === 'ar'
  const t = copy[language]
  const localizedArticle = getLocalizedArticle(article, language)
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const aiTechnologiesHref = isArabic ? '/ar/our-work/ai-technologies' : '/en/our-work/ai-technologies'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white px-6 pt-16 pb-40 text-black sm:px-8 sm:pb-32 dark:bg-[#181615] dark:text-white ${isArabic ? ibmArabic.className : ''}`}
    >
      <TopNav
        isArabic={isArabic}
        logo={t.nav.logo}
        services={t.nav.whatWeDo}
        articles={t.nav.articles}
        sayHi={t.nav.sayHi}
        language={language}
        onLanguageToggle={() => {
          setLanguage(language === 'en' ? 'ar' : 'en')
        }}
        homeHref={homeHref}
        servicesHref={servicesHref}
        aiTechnologiesHref={aiTechnologiesHref}
        articlesHref={articlesHref}
        contactHref={contactHref}
      />

      <article className={`mx-auto mt-4 w-full max-w-2xl ${textAlignClass}`}>
        <Link
          href={articlesHref}
          className="inline-flex h-7 items-center gap-1.5 rounded-md bg-site-gray-ui px-2 py-0 text-xs font-light text-black/65 transition-[color,background-color,transform] duration-200 hover:text-black active:scale-[0.96] dark:bg-white/10 dark:text-white/62 dark:hover:text-white"
        >
          <ArrowLeft className={`size-3.5 ${isArabic ? 'rotate-180' : ''}`} />
          {t.back}
        </Link>

        <header className="mt-5 border-b border-black/10 pb-6 dark:border-white/10">
          <ArticleHeaderImage article={localizedArticle} />
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/60 dark:bg-white/10 dark:text-white/62">
              {localizedArticle.category}
            </span>
            <span className="text-xs leading-4 font-light text-black/45 dark:text-white/38">{localizedArticle.readTime}</span>
          </div>
          <h1 className="mt-4 text-3xl leading-9 font-medium tracking-normal text-black text-balance sm:text-4xl sm:leading-11 dark:text-white">
            {localizedArticle.title}
          </h1>
        </header>

        <div className="pt-3">
          {localizedArticle.sections.map((section, sectionIndex) => (
            <section key={section.heading} className="mt-8 first:mt-0">
              <h2 className={`${sectionIndex === 0 ? 'sr-only' : 'text-xl leading-6'} font-medium tracking-normal text-black text-balance dark:text-white`}>
                {section.heading}
              </h2>
              <div className={sectionIndex === 0 ? 'space-y-4' : 'mt-4 space-y-4'}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 font-light text-black/68 text-pretty dark:text-white/64">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.imageSrc ? (
                <div className="mt-6 overflow-hidden rounded-md bg-site-gray-surface outline outline-1 -outline-offset-1 outline-black/10 dark:bg-white/5 dark:outline-white/10">
                  <Image
                    src={section.imageSrc}
                    alt={section.imageAlt ?? section.heading}
                    width={1440}
                    height={1420}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </article>
      <MarketingFooter
        isArabic={isArabic}
        textAlignClass={textAlignClass}
        contact={t.contact}
        language={language}
        onLanguageToggle={() => {
          setLanguage(language === 'en' ? 'ar' : 'en')
        }}
      />
    </main>
  )
}
