"use client"

import dynamic from "next/dynamic"
import { Mail, Phone } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import { Button } from "@/components/ui/button"
import { SITE_EMAIL } from "@/lib/site"

const BadgeScene = dynamic(() => import("./badge-scene"), { ssr: false })

export function BadgePage({ lang }: { lang: "en" | "ar" }) {
  const arabic = lang === "ar"
  return (
    <main aria-label="Anas Hamad interactive card" className="flex h-[100svh] w-full flex-col overflow-hidden bg-white" dir="ltr">
      <div className="min-h-0 flex-1"><BadgeScene /></div>
      <nav
        aria-label={arabic ? "تواصل مع أنس" : "Contact Anas"}
        dir={arabic ? "rtl" : "ltr"}
        className="flex shrink-0 flex-wrap items-center justify-center gap-2 px-3 pt-3 pb-[max(24px,env(safe-area-inset-bottom))]"
      >
        <Button asChild className="h-10 rounded-[99px] border-0 bg-[#25D366] px-3 py-1 text-[13px] font-medium text-white hover:bg-[#25D366]/90 sm:h-[32px]">
          <a href="https://wa.me/962795874662" target="_blank" rel="noopener noreferrer"><SiWhatsapp className="h-3.5 w-3.5" />{arabic ? "واتساب" : "WhatsApp"}</a>
        </Button>
        <Button asChild className="h-10 rounded-[99px] border-0 bg-black px-3 py-1 text-[13px] font-medium text-white hover:bg-black/90 sm:h-[32px]">
          <a href={`mailto:${SITE_EMAIL}`}><Mail className="h-3.5 w-3.5" />{arabic ? "إرسال بريد" : "Send Email"}</a>
        </Button>
        <Button asChild variant="outline" className="h-10 rounded-[99px] border-gray-200 bg-white px-3 py-1 text-[13px] font-medium text-black hover:bg-gray-100 hover:text-black sm:h-[32px]">
          <a href="tel:+962795874662"><Phone className="h-3.5 w-3.5" />{arabic ? "اتصال" : "Call"}</a>
        </Button>
      </nav>
    </main>
  )
}
