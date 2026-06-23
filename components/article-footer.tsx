"use client"

import Link from "next/link"
import type { Locale } from "@/i18n-config"

export function ArticleFooter({ lang, homeHref }: { lang: Locale; homeHref?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Link
        href={homeHref ?? `/${lang}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="border-b border-border pb-[2px]">
          {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
        </span>
      </Link>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="border-b border-border pb-[2px]">
          {lang === "ar" ? "العودة للأعلى" : "Back to top"}
        </span>
      </button>
    </div>
  )
}
