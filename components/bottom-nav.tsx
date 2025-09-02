"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/i18n-config"
import {
  Home,
  BookOpen,
  Mail,
  User as IdCard,
  Moon,
  Sun,
  Languages,
  ChevronRight,
  ChevronUp,
} from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"

// simple classnames helper
const cls = (...s: (string | false | null | undefined)[]) => s.filter(Boolean).join(" ")

export default function BottomNav({
  lang,
  onContactClick,
}: {
  lang: Locale
  onContactClick: () => void
}) {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isRTL = lang === "ar"
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  // --- THEME: load from localStorage (fallback to system), and apply to <html> ---
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial: "light" | "dark" = stored ?? (systemDark ? "dark" : "light")
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  const applyTheme = (next: "light" | "dark") => {
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  const toggleTheme = () => applyTheme(theme === "light" ? "dark" : "light")

  const switchLang = () => {
    const other = lang === "ar" ? "en" : "ar"
    const newPath = pathname?.replace(`/${lang}`, `/${other}`) || `/${other}`
    window.location.href = newPath
  }

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === `/${lang}` : pathname?.startsWith(href)

  // Items inside the collapsible box
  const navItems: Array<
    | { key: string; label: string; href: string; icon: React.ReactNode; onClick?: never }
    | { key: string; label: string; href?: never; icon: React.ReactNode; onClick: () => void }
  > = useMemo(
    () => [
      { key: "home", label: t("Home", "الرئيسية"), href: `/${lang}`, icon: <Home className="h-4 w-4" /> },
      { key: "articles", label: t("Articles", "مقالاتي"), href: `/${lang}/articles`, icon: <BookOpen className="h-4 w-4" /> },
      { key: "card", label: t("Card", "كرت"), href: `/${lang}/card`, icon: <IdCard className="h-4 w-4" /> },
      { key: "contact", label: t("Contact", "تواصل"), onClick: onContactClick, icon: <Mail className="h-4 w-4" /> },
    ],
    [lang] // eslint-disable-line
  )

  return (
    <nav
      className={cls(
        "fixed bottom-3 left-1/2 z-50 -translate-x-1/2 select-none",
        "flex items-center gap-1"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="bottom-collapsible-nav"
        className={cls(
          "grid place-items-center rounded-xl border border-border/60 bg-background/70 backdrop-blur-xl",
          "h-9 w-9 shadow-sm transition-colors hover:border-primary/50"
        )}
        aria-label={t("Open navigation", "فتح القائمة")}
      >
        <ChevronUp
          className={cls(
            "h-5 w-5 transition-transform",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {/* Collapsible box */}
      <div
  id="bottom-collapsible-nav"
  role="group"
  aria-label={t("Primary navigation", "التنقل الرئيسي")}
  aria-hidden={!isOpen}
  
  className={cls(
    "overflow-hidden rounded-2xl shadow-sm",
    "transition-all duration-300 ease-out",
    isOpen
      ? "inline-flex px-2.5 py-1.5"
      : "w-0 px-0 py-0"
  )}
>
        <ul
          className={cls(
            "flex items-center gap-1.5 flex-nowrap overflow-x-auto",
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {navItems.map((item) => {
            const active = "href" in item ? isActive(item.href) : false

            const Content = (
              <div
                className={cls(
                  "inline-flex items-center gap-2 rounded-xl border bg-background/70 backdrop-blur-xl transition-colors",
                  active
                    ? "border-black/30 text-black bg-white/80 dark:bg-black dark:text-white dark:border-white/30"
                    : "border-border/60 hover:border-primary/50",
                  "h-9 px-3"
                )}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className={cls("text-xs", active ? "font-semibold" : "text-foreground")}>
                  {"label" in item ? item.label : ""}
                </span>
              </div>
            )

            return (
              <li key={item.key} className="flex-shrink-0">
                {"href" in item ? (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="outline-none"
                  >
                    {Content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="outline-none"
                    aria-haspopup="dialog"
                    aria-label={item.label}
                  >
                    {Content}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Icon-only Theme / Language (outside the collapsible box) */}
      <div
        className={cls(
          "flex items-center gap-1.5 rounded-2xl border-border/60 "        )}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-background/70 backdrop-blur-xl hover:border-primary/50 transition-colors"
          aria-label={t("Toggle theme", "تبديل المظهر")}
          title={t("Toggle theme", "تبديل المظهر")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={switchLang}
          className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-background/70 backdrop-blur-xl hover:border-primary/50 transition-colors"
          aria-label={t("Switch language", "تبديل اللغة")}
          title={t("Switch language", "تبديل اللغة")}
        >
          <Languages className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
