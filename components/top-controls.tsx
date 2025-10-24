"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"
import { useTheme } from "next-themes"

import type { Locale } from "@/i18n-config"
import { cn } from "@/lib/utils"
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button"

interface TopControlsProps {
  lang: Locale
}

export function TopControls({ lang }: TopControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { startTransition } = useThemeTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isRTL = lang === "ar"
  const labels = useMemo(
    () => ({
      toggle: isRTL ? "تبديل المظهر" : "Toggle theme",
      switchLang: isRTL ? "تبديل اللغة" : "Switch language",
    }),
    [isRTL]
  )

  const activeTheme = mounted ? resolvedTheme ?? theme : undefined
  const isDark = activeTheme === "dark"
  const currentTheme = isDark ? "dark" : "light"

  const handleSwitchLang = () => {
    const other = lang === "ar" ? "en" : "ar"

    if (!pathname) {
      router.push(`/${other}`)
      return
    }

    const segments = pathname.split("/")
    if (segments.length > 1) {
      segments[1] = other
    }
    const target = segments.join("/") || `/${other}`
    router.push(target)
  }

  const handleToggleTheme = () => {
    const next = isDark ? "light" : "dark"
    startTransition(() => setTheme(next))
  }

  return (
    <div className="fixed right-3 top-3 z-50 flex items-center gap-1.5 sm:right-6 sm:top-6">
      <ThemeToggleButton
        theme={currentTheme}
        variant="circle-blur"
        start="center"
        onClick={handleToggleTheme}
        className={cn(
          "h-7 w-7 rounded-full border-border/50 bg-background/70 text-muted-foreground hover:text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50",
          !mounted && "opacity-0"
        )}
        aria-label={labels.toggle}
        title={labels.toggle}
      />
      <button
        type="button"
        onClick={handleSwitchLang}
        className="grid h-7 w-7 place-items-center rounded-full border border-border/40 bg-background/70 text-muted-foreground transition-colors hover:text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50"
        aria-label={labels.switchLang}
        title={labels.switchLang}
      >
        <Languages className="h-3 w-3" />
      </button>
    </div>
  )
}

export default TopControls
