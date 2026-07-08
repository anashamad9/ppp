import type { Metadata } from "next"

import type { Locale } from "@/i18n-config"
import { DashboardShell } from "../dashboard-shell"

export const metadata: Metadata = {
  title: "Links | Anas Hamad",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function RepositoriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  return (
    <DashboardShell lang={langParam as Locale} activePage="repositories">
      <div className="min-h-svh" />
    </DashboardShell>
  )
}
