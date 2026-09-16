'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { articles, getLocalizedArticle } from '@/lib/articles'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { MarketingFooter } from '@/components/marketing-footer'
import { TopNav } from '@/components/top-nav'

type Language = 'en' | 'ar'

type PageCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  heading: string
  subtitle: string
  read: string
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

const STORAGE_KEY = 'baz-language'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const copy: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Atmet Technologies',
      whatWeDo: 'Services',
      articles: 'Cases',
      sayHi: 'Say Hi',
    },
    heading: 'Case Studies',
    subtitle: 'How applied AI agents, knowledge systems, and integrations change real company workflows.',
    read: 'Read',
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
    heading: 'دراسات حالة',
    subtitle: 'كيف تغيّر وكلاء الذكاء الاصطناعي وأنظمة المعرفة والتكاملات سير العمل الحقيقي داخل الشركات.',
    read: 'قراءة',
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
}

export default function ArticlesPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
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
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const aiTechnologiesHref = isArabic ? '/ar/our-work/ai-technologies' : '/en/our-work/ai-technologies'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'
  const articleBaseHref = isArabic ? '/ar/articles' : '/en/articles'

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

      <section className={`mx-auto mt-4 w-full max-w-2xl ${textAlignClass}`}>
        <h1 className="text-xl leading-6 font-medium tracking-normal text-black text-balance dark:text-white">{t.heading}</h1>
        <p className="mt-3 text-base leading-6 font-light text-black/65 text-pretty dark:text-white/62">{t.subtitle}</p>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-2xl gap-3">
        {articles.map((article) => {
          const localizedArticle = getLocalizedArticle(article, language)

          return (
            <Link
              key={article.slug}
              href={`${articleBaseHref}/${article.slug}`}
              className={`group grid overflow-hidden rounded-lg bg-site-gray-surface/70 p-1 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-site-gray-surface active:scale-[0.99] sm:grid-cols-[180px_minmax(0,1fr)] dark:bg-white/[0.045] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] dark:hover:bg-white/[0.065] ${textAlignClass}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black/5 outline outline-1 -outline-offset-1 outline-black/10 dark:bg-white/5 dark:outline-white/10 sm:aspect-auto">
                <Image
                  src={localizedArticle.imageSrc}
                  alt={localizedArticle.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                  sizes="(min-width: 640px) 180px, calc(100vw - 56px)"
                />
              </div>
              <div className="min-w-0 px-2 py-3 sm:px-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs leading-4 font-light text-black/48 dark:text-white/45">
                    {localizedArticle.category}
                  </span>
                  <span className="text-xs leading-4 font-light text-black/45 dark:text-white/38">{localizedArticle.readTime}</span>
                </div>
                <h2 className="mt-2 text-lg leading-6 font-medium tracking-normal text-black text-balance dark:text-white">{localizedArticle.title}</h2>
                <p className="mt-2 text-sm leading-5 font-light text-black/65 text-pretty dark:text-white/60">{localizedArticle.excerpt}</p>
                <p className="mt-3 text-xs leading-4 font-medium text-black/55 transition-colors group-hover:text-black dark:text-white/50 dark:group-hover:text-white">{t.read}</p>
              </div>
            </Link>
          )
        })}
      </section>
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
