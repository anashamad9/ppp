"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"

import type { Locale } from "@/i18n-config"
import { SITE_EMAIL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button"
import { CopyButton } from "@/components/ui/copy-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopControlsProps {
  lang: Locale
}

export function TopControls({ lang }: TopControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isBuildHost, setIsBuildHost] = useState(false)
  const { startTransition } = useThemeTransition()

  useEffect(() => {
    setMounted(true)
    setIsBuildHost(window.location.hostname === "build.anashamad.com")
  }, [])

  const isRTL = lang === "ar"
  const labels = useMemo(
    () => ({
      toggle: isRTL ? "تبديل المظهر" : "Toggle theme",
      switchLang: isRTL ? "تبديل اللغة" : "Switch language",
      contact: isRTL ? "تواصل معي على:" : "Contact me at:",
      email: SITE_EMAIL,
      english: "English",
      arabic: "العربية",
    }),
    [isRTL]
  )
  const socialLinks = [
    { label: "X", href: "https://x.com/its_anas9" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anas-hamad1909" },
    { label: "GitHub", href: "https://github.com/anashamad9" },
    { label: "Hugging Face", href: "https://huggingface.co/anashamad" },
  ]
  const buildSocialLinks = [
    { label: "X", href: "https://x.com/buildanas?s=11&t=xHJPYPOInZK-SWRzKy7yWA" },
    { label: "Instagram", href: "https://www.instagram.com/buildanas?igsh=MW9lc2ltaWI3dTc0ZQ%3D%3D&utm_source=qr" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anas-hamad1909" },
  ]
  const activeSocialLinks = isBuildHost ? buildSocialLinks : socialLinks

  const activeTheme = mounted ? resolvedTheme ?? theme : undefined
  const isDark = activeTheme === "dark"
  const currentTheme = isDark ? "dark" : "light"
  const isMainHomepage = pathname === `/${lang}`
  const shouldUseCompactHomeControls = isMainHomepage && !isBuildHost

  const handleSwitchLang = (nextLang: Locale) => {
    if (!pathname) {
      router.push(`/${nextLang}`)
      return
    }

    const segments = pathname.split("/")
    if (segments.length > 1) {
      segments[1] = nextLang
    }
    const target = segments.join("/") || `/${nextLang}`
    router.push(target)
  }

  const handleToggleTheme = () => {
    const next = isDark ? "light" : "dark"
    startTransition(() => setTheme(next))
  }

  if (shouldUseCompactHomeControls) {
    return (
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-7 items-center gap-1 rounded-full border-0 bg-muted px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted/80"
              aria-label={labels.switchLang}
              title={labels.switchLang}
            >
              {lang === "ar" ? labels.arabic : labels.english}
              <ChevronDown className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-[9rem]">
            <DropdownMenuItem onClick={() => handleSwitchLang("en")} className="font-sans text-left" dir="ltr">
              {labels.english}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSwitchLang("ar")}
              className="font-arabic text-right"
              dir="rtl"
            >
              {labels.arabic}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggleButton
          theme={currentTheme}
          variant="circle-blur"
          start="center"
          onClick={handleToggleTheme}
          className={cn(
            "h-7 w-7 rounded-full border-0 bg-muted text-foreground hover:bg-muted/80 hover:text-foreground",
            !mounted && "opacity-0"
          )}
          aria-label={labels.toggle}
          title={labels.toggle}
        />
      </div>
    )
  }

  return (
    <div className="px-4 pb-4 sm:px-6">
      <div className="mx-auto w-full max-w-[720px] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {activeSocialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-7 items-center gap-1 rounded-full bg-muted px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted/80"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-1 rounded-full border-0 bg-muted px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted/80"
                  aria-label={labels.switchLang}
                  title={labels.switchLang}
                >
                  {lang === "ar" ? labels.arabic : labels.english}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[9rem]">
                <DropdownMenuItem onClick={() => handleSwitchLang("en")} className="font-sans text-left" dir="ltr">
                  {labels.english}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSwitchLang("ar")}
                  className="font-arabic text-right"
                  dir="rtl"
                >
                  {labels.arabic}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggleButton
              theme={currentTheme}
              variant="circle-blur"
              start="center"
              onClick={handleToggleTheme}
              className={cn(
                "h-7 w-7 rounded-full border-0 bg-muted text-foreground hover:bg-muted/80 hover:text-foreground",
                !mounted && "opacity-0"
              )}
              aria-label={labels.toggle}
              title={labels.toggle}
            />
          </div>
        </div>
        <div className="border-t border-border/60 pt-3 sm:pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-sm text-muted-foreground">{labels.contact}</span>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="truncate text-sm text-black transition-opacity hover:opacity-90 dark:text-white"
            >
              {labels.email}
            </a>
            <CopyButton
              content={labels.email}
              aria-label="Copy email"
              className="h-auto w-auto shrink-0 border-0 bg-transparent p-0 text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopControls
