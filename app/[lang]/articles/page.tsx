import type { Locale } from "@/i18n-config"
import { redirect } from "next/navigation"

export default async function Articles({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  redirect(`/${lang}#articles`)
}
