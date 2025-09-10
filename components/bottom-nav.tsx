"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/i18n-config"
import {
  Home,
  BookOpen,
  Mail,
  Moon,
  Sun,
  Languages,
  Menu,
  X,
} from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"

const cls = (...s: (string | false | null | undefined)[]) =>
  s.filter(Boolean).join(" ")

export default function BottomNav({
  lang,
  onContactClick,
}: {
  lang: Locale
  onContactClick: () => void
}) {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isOpen, setIsOpen] = useState(false)

  const isRTL = lang === "ar"
  const t = (en: string, ar: string) => (isRTL ? ar : en)

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

  const navItems: Array<
    | { key: string; label: string; href: string; icon: React.ReactNode }
    | { key: string; label: string; onClick: () => void; icon: React.ReactNode }
  > = useMemo(
    () => [
      { key: "home", label: t("Home", "الرئيسية"), href: `/${lang}`, icon: <Home className="h-4 w-4" /> },
      { key: "articles", label: t("Articles", "مقالاتي"), href: `/${lang}/articles`, icon: <BookOpen className="h-4 w-4" /> },
      { key: "contact", label: t("Contact", "تواصل"), onClick: onContactClick, icon: <Mail className="h-4 w-4" /> },
    ],
    [lang] // eslint-disable-line
  )

  return (
    <>
      {/* Mobile toggle button (matches nav button height) */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cls(
          "fixed bottom-3 left-3 z-50 md:hidden",
          "grid h-9 w-9 place-items-center rounded-xl border border-border/60",
          "bg-background/80 backdrop-blur-xl shadow-sm transition",
          "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        )}
        aria-label={
          isOpen
            ? t("Close bottom navigation", "إغلاق شريط التنقل السفلي")
            : t("Open bottom navigation", "فتح شريط التنقل السفلي")
        }
        aria-expanded={isOpen}
        aria-controls="bottom-collapsible-nav"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Bottom bar container — DO NOT hide this on mobile */}
      <nav
        dir={isRTL ? "rtl" : "ltr"}
        className={cls(
          "fixed bottom-3 left-1/2 z-40 -translate-x-1/2 select-none",
          "flex" // <-- was `hidden md:flex`; keep it rendered so the inner wrapper can animate
        )}
      >
        {/* Animated wrapper controls mobile visibility */}
        <div
          id="bottom-collapsible-nav"
          role="group"
          aria-label={t("Primary navigation", "التنقل الرئيسي")}
          className={cls(
            "flex items-center gap-1",
            "transition-all duration-200 ease-out",
            isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-1 pointer-events-none",
            "md:opacity-100 md:scale-100 md:translate-y-0 md:pointer-events-auto"
          )}
        >
          {/* Main group (links) */}
          <div className="inline-flex px-2.5 py-1.5 rounded-2xl">
            <ul className="flex items-center gap-1.5 flex-nowrap overflow-x-auto">
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
                        onClick={() => setIsOpen(false)}
                      >
                        {Content}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          item.onClick()
                          setIsOpen(false)
                        }}
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

          {/* Theme / Language buttons */}
          <div className="flex items-center gap-1.5 rounded-2xl border-border/60">
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
        </div>
      </nav>
    </>
  )
}
