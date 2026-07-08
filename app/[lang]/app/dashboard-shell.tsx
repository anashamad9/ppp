"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  FolderOpen,
  LayoutGrid,
  Link as LinkIcon,
  LogOut,
  Settings,
  TableProperties,
} from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n-config"
import { cn } from "@/lib/utils"

type DashboardPageKey =
  | "dashboard"
  | "financial"
  | "leads"
  | "resources"
  | "repositories"
  | "pages"
  | "settings"

const navItems: Array<{
  key: DashboardPageKey
  label: string
  path: string
  icon: ComponentType<{ className?: string }>
}> = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { key: "financial", label: "Financial", path: "/financial", icon: BarChart3 },
  { key: "leads", label: "Leads", path: "/leads", icon: TableProperties },
  { key: "resources", label: "Resources", path: "/resources", icon: FolderOpen },
  { key: "repositories", label: "Links", path: "/repositories", icon: LinkIcon },
  { key: "pages", label: "Pages", path: "/pages", icon: FileText },
  { key: "settings", label: "Settings", path: "/settings", icon: Settings },
]

export function DashboardShell({
  lang,
  activePage,
  children,
}: {
  lang: Locale
  activePage: DashboardPageKey
  children: ReactNode
}) {
  const pathname = usePathname()
  const isLocalRoute = pathname?.startsWith(`/${lang}/app`)
  const hrefFor = (path: string) => (isLocalRoute ? `/${lang}/app${path}` : path)
  const loginHref = isLocalRoute ? `/${lang}/app` : "/"

  return (
    <main className="grid min-h-svh grid-cols-[180px_minmax(0,1fr)] bg-background text-foreground">
      <aside className="flex min-h-svh flex-col border-r border-border px-2.5 py-3">
        <Link href={hrefFor("/dashboard")} aria-label="Dashboard home" className="mb-4 flex w-fit items-center">
          <Image
            src="/Anas%20Hamad.png"
            alt="Anas Hamad"
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-md border border-border object-cover"
          />
        </Link>

        <nav className="flex min-w-0 flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.key === activePage

            return (
              <Button
                key={item.key}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-full justify-start gap-2 rounded-md px-2 text-xs text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )}
              >
                <Link href={hrefFor(item.path)} aria-label={item.label} title={item.label}>
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            )
          })}
        </nav>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mt-4 h-8 w-full justify-start gap-2 rounded-md px-2 text-xs text-muted-foreground/70 hover:bg-red-500/10 hover:text-red-500"
        >
          <Link href={loginHref} aria-label="Logout" title="Logout">
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </Link>
        </Button>
      </aside>

      <div className="min-w-0">
        {children}
      </div>
    </main>
  )
}
