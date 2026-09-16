'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Languages } from 'lucide-react'

type TopNavProps = {
  isArabic: boolean
  logo: string
  logoLightSrc?: string
  logoDarkSrc?: string
  services: string
  articles?: string
  sayHi: string
  navItems?: Array<{
    label: string
    href: string
  }>
  language?: 'en' | 'ar'
  onLanguageToggle?: () => void
  homeHref: string
  servicesHref: string
  articlesHref?: string
  contactHref: string
  aiTechnologiesHref?: string
  navMaxWidthClass?: string
}

export function TopNav({
  isArabic,
  logo,
  logoLightSrc,
  logoDarkSrc,
  services,
  articles,
  sayHi,
  navItems,
  language,
  onLanguageToggle,
  homeHref,
  servicesHref,
  articlesHref,
  contactHref,
  aiTechnologiesHref: _aiTechnologiesHref,
  navMaxWidthClass = 'max-w-[560px]',
}: TopNavProps) {
  void _aiTechnologiesHref
  const activeNavItems = navItems ?? [
    { label: services, href: servicesHref },
    ...(articles && articlesHref ? [{ label: articles, href: articlesHref }] : []),
    { label: sayHi, href: contactHref },
  ]

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className={`top-nav-glass relative z-10 flex w-full ${navMaxWidthClass} items-center justify-between rounded-md px-3 py-1.5`}>
        <div className="flex items-center gap-1.5">
          <Link href={homeHref} className="inline-flex items-center gap-1.5 text-sm leading-6 font-medium text-black dark:text-white/90">
            {logoLightSrc && logoDarkSrc ? (
              <span className="relative inline-flex size-4 shrink-0" aria-hidden>
                <Image src={logoLightSrc} alt="" fill className="object-contain dark:hidden" />
                <Image src={logoDarkSrc} alt="" fill className="hidden object-contain dark:block" />
              </span>
            ) : null}
            <span>{logo}</span>
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          {activeNavItems.map(item => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">{item.label}</Link>
          ))}
          {language && onLanguageToggle ? (
            <button
              type="button"
              onClick={onLanguageToggle}
              className="inline-flex h-6 items-center justify-center text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              aria-label={isArabic ? 'تبديل اللغة' : 'Switch language'}
              title={isArabic ? 'تبديل اللغة' : 'Switch language'}
            >
              <Languages className="size-4" />
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  )
}
