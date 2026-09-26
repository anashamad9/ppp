"use client"

import { useRouter } from "next/navigation"
import type { Locale } from "@/i18n-config"

export function ArticleFooter({ lang, homeHref }: { lang: Locale; homeHref?: string }) {
  const router = useRouter()
  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(homeHref ?? `/${lang}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        type="button"
        onClick={goBack}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="border-b border-border pb-[2px]">
          {lang === "ar" ? "العودة للصفحة السابقة" : "Back to previous page"}
        </span>
      </button>
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
