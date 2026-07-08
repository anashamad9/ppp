import type { Metadata } from "next"

import type { Locale } from "@/i18n-config"
import { DashboardShell } from "../dashboard-shell"

export const metadata: Metadata = {
  title: "Pages | Anas Hamad",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PagesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  return (
    <DashboardShell lang={langParam as Locale} activePage="pages">
      <div className="min-h-svh" />
    </DashboardShell>
  )
}
