"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Languages, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import type { Locale } from "@/i18n-config"
import { cn } from "@/lib/utils"

interface TopControlsProps {
  lang: Locale
}

export function TopControls({ lang }: TopControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

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

  return (
    <div className="fixed right-2.5 top-2.5 z-50 flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative inline-flex h-6 w-11 items-center justify-between rounded-full border border-border/50 bg-background/70 px-1 text-muted-foreground transition-colors hover:text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50"
        aria-label={labels.toggle}
        title={labels.toggle}
      >
        <span className="pointer-events-none relative z-10 flex h-full w-1/2 items-center justify-center">
          <Sun className="h-3 w-3" />
        </span>
        <span className="pointer-events-none relative z-10 flex h-full w-1/2 items-center justify-center">
          <Moon className="h-3 w-3" />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0.5 left-1 z-0 h-[18px] w-[18px] rounded-full bg-muted shadow-sm transition-transform duration-200 ease-out",
            isDark ? "translate-x-[18px]" : "translate-x-0"
          )}
          style={{ transform: mounted ? undefined : "translateX(0)" }}
        />
      </button>
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
