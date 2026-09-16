'use client'

import { useEffect } from 'react'
import { ArrowUpRight, Languages, Moon, Sun } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { usePersistedTheme, type Theme } from '@/hooks/use-persisted-theme'

const EMAIL_ADDRESS = 'team@atmet.pro'
const THEME_STORAGE_KEY = 'baz-theme'
const X_URL = 'https://x.com/intlgnc_lab'
const INSTAGRAM_URL = 'https://www.instagram.com/intelligencelab.dev?igsh=N2t4c2J4c2lpb3Zh'
const LINKEDIN_URL = 'https://www.linkedin.com/company/intelligence-lab-dev'

type MarketingFooterProps = {
  isArabic: boolean
  textAlignClass: string
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
  language?: 'en' | 'ar'
  onLanguageToggle?: () => void
}

export function MarketingFooter({ isArabic, textAlignClass, contact, language, onLanguageToggle }: MarketingFooterProps) {
  const [theme, setTheme] = usePersistedTheme('system', THEME_STORAGE_KEY)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const shouldUseDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      document.documentElement.classList.toggle('dark', shouldUseDark)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme: Theme) => {
      if (currentTheme === 'dark') return 'light'
      if (currentTheme === 'light') return 'dark'

      return document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    })
  }
  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))

  return (
    <footer
      id="contact"
      className="fixed bottom-0 left-1/2 z-40 grid w-[calc(100%-3rem)] max-w-2xl -translate-x-1/2 grid-cols-1 gap-2 border-t border-black/10 bg-white py-3 sm:w-[calc(100%-4rem)] md:grid-cols-3 md:items-center"
    >
      <div className={`w-full text-base leading-6 font-light text-black/65 md:w-auto ${textAlignClass}`}>
        <div className={`flex flex-wrap items-center gap-1 ${isArabic ? 'justify-end md:justify-end' : 'justify-start'}`}>
          <a href={`mailto:${EMAIL_ADDRESS}`} className="transition-colors hover:text-black">
            {EMAIL_ADDRESS}
          </a>
          <CopyButton
            value={EMAIL_ADDRESS}
            size="sm"
            className="size-5 rounded-full text-black/65 transition-colors hover:text-black"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={onLanguageToggle}
          disabled={!language || !onLanguageToggle}
          className="inline-flex size-6 items-center justify-center rounded-full text-black/60 transition-colors hover:text-black disabled:pointer-events-none disabled:opacity-35 dark:text-white/62 dark:hover:text-white"
          aria-label={isArabic ? 'تبديل اللغة' : 'Switch language'}
          title={isArabic ? 'تبديل اللغة' : 'Switch language'}
        >
          <Languages className="size-4" />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex size-6 items-center justify-center rounded-full text-black/60 transition-colors hover:text-black dark:text-white/62 dark:hover:text-white"
          aria-label={isArabic ? 'تبديل النمط' : 'Toggle theme'}
          title={isArabic ? 'تبديل النمط' : 'Toggle theme'}
        >
          {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
      <div className={`flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-base leading-6 font-light text-black/65 md:w-auto ${isArabic ? 'justify-end md:justify-start' : 'justify-start'}`}>
        <a
          href={X_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.x}
          <ArrowUpRight className="size-3" />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.instagram}
          <ArrowUpRight className="size-3" />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.linkedIn}
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </footer>
  )
}
