"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/i18n-config"
import { Home, BookOpen, Mail, User as IdCard, Globe, Moon, Sun, Languages } from "lucide-react"
import React, { useEffect, useState } from "react"

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
  }

  const isActive = (href: string) => (href === `/${lang}` ? pathname === `/${lang}` : pathname?.startsWith(href))
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en)

  const switchLang = () => {
    const other = lang === "ar" ? "en" : "ar"
    const newPath = pathname?.replace(`/${lang}`, `/${other}`) || `/${other}`
    window.location.href = newPath
  }

  const items: Array<
    | { key: string; label: string; href: string; icon: React.ReactNode; onClick?: never }
    | { key: string; label: string; href?: never; icon: React.ReactNode; onClick: () => void }
  > = [
    { key: "home", label: t("Home", "الرئيسية"), href: `/${lang}`, icon: <Home className="h-3.5 w-3.5" /> },
    { key: "articles", label: t("Articles", "مقالاتي"), href: `/${lang}/articles`, icon: <BookOpen className="h-3.5 w-3.5" /> },
    { key: "card", label: t("Card", "كرت"), href: `/${lang}/card`, icon: <IdCard className="h-3.5 w-3.5" /> },
    { key: "contact", label: t("Contact", "تواصل"), onClick: onContactClick, icon: <Mail className="h-3.5 w-3.5" /> },
    { key: "theme", label: t("Theme", "المظهر"), onClick: toggleTheme, icon: theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" /> },
    { key: "lang", label: t("Language", "اللغة"), onClick: switchLang, icon: <Languages className="h-3.5 w-3.5" /> },
  ]

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 select-none">
      <div className="px-2.5 py-1.5 rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl">
        <ul className="flex items-center gap-2.5">
          {items.map((item) => {
            const active = "href" in item ? isActive(item.href) : false
            const Tile = (
              <div className="group flex flex-col items-center gap-0.5">
                <div
                  className={cls(
                    "grid place-items-center rounded-xl border transition-all h-8 w-8",
                    active
                      ? "border-white/30 bg-primary/10 text-white bg-black dark:bg-white dark:text-black dark:border-white/80"
                      : "border-border/60 hover:border-primary/50"
                  )}
                >
                  {item.icon}
                </div>
                <span className={cls("text-[9px]", active ? "text-primary font-medium" : "text-muted-foreground")}>{item.label}</span>
              </div>
            )

            return (
              <li key={item.key} className="min-w-[40px]">
                {"href" in item ? (
                  <Link href={item.href} aria-current={active ? "page" : undefined} className="outline-none">
                    {Tile}
                  </Link>
                ) : (
                  <button type="button" onClick={item.onClick} className="outline-none" aria-haspopup="dialog">
                    {Tile}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}