import type { Locale } from "@/i18n-config"
import { redirect } from "next/navigation"

export default function Articles({ params }: { params: { lang: Locale } }) {
  redirect(`/${params.lang}#articles`)
}
