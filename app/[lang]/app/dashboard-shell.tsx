"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BarChart3,
  ChevronRight,
  FileText,
  FolderOpen,
  LayoutGrid,
  Link as LinkIcon,
  MoreHorizontal,
  Moon,
  Settings,
  Sparkles,
  Sun,
  Users,
} from "lucide-react"
import { useEffect, useState, type ComponentType, type ReactNode } from "react"

import type { Locale } from "@/i18n-config"
import { cn } from "@/lib/utils"

type DashboardPageKey = "dashboard" | "financial" | "leads" | "resources" | "repositories" | "pages" | "settings"

const navItems: Array<{ key: DashboardPageKey; label: Record<Locale, string>; path: string; icon: ComponentType<{ className?: string }> }> = [
  { key: "dashboard", label: { en: "Overview", ar: "نظرة عامة" }, path: "/dashboard", icon: LayoutGrid },
  { key: "financial", label: { en: "Financial", ar: "المالية" }, path: "/financial", icon: BarChart3 },
  { key: "leads", label: { en: "Leads", ar: "العملاء" }, path: "/leads", icon: Users },
  { key: "resources", label: { en: "Resources", ar: "المصادر" }, path: "/resources", icon: FolderOpen },
  { key: "repositories", label: { en: "Links", ar: "الروابط" }, path: "/repositories", icon: LinkIcon },
  { key: "pages", label: { en: "Pages", ar: "الصفحات" }, path: "/pages", icon: FileText },
  { key: "settings", label: { en: "Settings", ar: "الإعدادات" }, path: "/settings", icon: Settings },
]

type PageCopy = { eyebrow: string; title: string; description: string; metric: string; metricLabel: string; secondary: string; secondaryLabel: string }

const pageCopy: Record<Locale, Record<DashboardPageKey, PageCopy>> = {
  en: {
  dashboard: { eyebrow: "Workspace overview", title: "Good morning, Anas", description: "A clear view of your work, performance, and recent activity across the entire workspace.", metric: "24", metricLabel: "active projects", secondary: "86%", secondaryLabel: "tasks completed" },
  financial: { eyebrow: "Financial summary", title: "Financial performance", description: "Track income, expenses, and the signals that matter to your monthly performance.", metric: "$12,480", metricLabel: "total revenue", secondary: "+18.4%", secondaryLabel: "from last month" },
  leads: { eyebrow: "Pipeline", title: "Leads and opportunities", description: "Review the people in your pipeline and keep the most valuable conversations moving.", metric: "128", metricLabel: "total leads", secondary: "32", secondaryLabel: "qualified leads" },
  resources: { eyebrow: "Library", title: "Resource collection", description: "Everything you have saved, organized into one calm and searchable workspace.", metric: "84", metricLabel: "saved resources", secondary: "12", secondaryLabel: "collections" },
  repositories: { eyebrow: "Bookmarks", title: "Links and repositories", description: "A focused home for the references, tools, and repositories you return to most.", metric: "46", metricLabel: "saved links", secondary: "8", secondaryLabel: "recently added" },
  pages: { eyebrow: "Publishing", title: "Pages and content", description: "Draft, review, and publish your content from a single editorial view.", metric: "18", metricLabel: "published pages", secondary: "6", secondaryLabel: "in draft" },
  settings: { eyebrow: "Workspace", title: "Settings", description: "Manage your workspace preferences, profile, access, and connected services.", metric: "7", metricLabel: "integrations", secondary: "3", secondaryLabel: "team members" },
  },
  ar: {
    dashboard: { eyebrow: "نظرة عامة على مساحة العمل", title: "صباح الخير، أنس", description: "نظرة واضحة على أعمالك وأدائك وآخر الأنشطة في مساحة العمل كاملة.", metric: "٢٤", metricLabel: "مشروعاً نشطاً", secondary: "٨٦٪", secondaryLabel: "من المهام مكتملة" },
    financial: { eyebrow: "الملخص المالي", title: "الأداء المالي", description: "تابع الإيرادات والمصروفات والمؤشرات المهمة لأدائك الشهري.", metric: "١٢٬٤٨٠ $", metricLabel: "إجمالي الإيرادات", secondary: "+١٨٫٤٪", secondaryLabel: "مقارنة بالشهر الماضي" },
    leads: { eyebrow: "مسار المبيعات", title: "العملاء والفرص", description: "راجع العملاء المحتملين وحافظ على تقدم المحادثات الأكثر قيمة.", metric: "١٢٨", metricLabel: "إجمالي العملاء", secondary: "٣٢", secondaryLabel: "عميلاً مؤهلاً" },
    resources: { eyebrow: "المكتبة", title: "مجموعة المصادر", description: "كل ما حفظته منظماً في مساحة عمل واحدة هادئة وسهلة البحث.", metric: "٨٤", metricLabel: "مصدراً محفوظاً", secondary: "١٢", secondaryLabel: "مجموعة" },
    repositories: { eyebrow: "المحفوظات", title: "الروابط والمستودعات", description: "مكان مركّز للمراجع والأدوات والمستودعات التي تعود إليها باستمرار.", metric: "٤٦", metricLabel: "رابطاً محفوظاً", secondary: "٨", secondaryLabel: "أضيفت مؤخراً" },
    pages: { eyebrow: "النشر", title: "الصفحات والمحتوى", description: "اكتب وراجع وانشر محتواك من واجهة تحرير واحدة.", metric: "١٨", metricLabel: "صفحة منشورة", secondary: "٦", secondaryLabel: "مسودات" },
    settings: { eyebrow: "مساحة العمل", title: "الإعدادات", description: "أدر تفضيلات مساحة العمل وملفك الشخصي والصلاحيات والخدمات المتصلة.", metric: "٧", metricLabel: "عمليات تكامل", secondary: "٣", secondaryLabel: "أعضاء الفريق" },
  },
}

const uiCopy = {
  en: { workspace: "Anas’s workspace", draft: "Draft", sections: "Workspace sections", themeLight: "Use light mode", themeDark: "Use dark mode", more: "More options", share: "Share", publish: "Publish", activity: "Activity", period: "Last 30 days", completed: "58 completed", progress: "20 in progress", upcoming: "22 upcoming", highlights: "Recent highlights", highlightsBody: "Your workspace is up to date. The latest changes, decisions, and saved items will appear here as your activity grows.", switchLanguage: "Switch to Arabic" },
  ar: { workspace: "مساحة عمل أنس", draft: "مسودة", sections: "أقسام مساحة العمل", themeLight: "استخدام الوضع الفاتح", themeDark: "استخدام الوضع الداكن", more: "المزيد من الخيارات", share: "مشاركة", publish: "نشر", activity: "النشاط", period: "آخر ٣٠ يوماً", completed: "٥٨ مكتملة", progress: "٢٠ قيد التنفيذ", upcoming: "٢٢ قادمة", highlights: "أبرز المستجدات", highlightsBody: "مساحة عملك محدّثة. ستظهر هنا آخر التغييرات والقرارات والعناصر المحفوظة مع استمرار نشاطك.", switchLanguage: "Switch to English" },
}

export function DashboardShell({ lang, activePage, children }: { lang: Locale; activePage: DashboardPageKey; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLocalRoute = pathname?.startsWith(`/${lang}/app`)
  const hrefFor = (path: string) => (isLocalRoute ? `/${lang}/app${path}` : `/${lang}${path}`)
  const copy = pageCopy[lang][activePage]
  const labels = uiCopy[lang]
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"
  const switchLanguage = () => {
    const nextLang: Locale = lang === "en" ? "ar" : "en"
    if (isLocalRoute) {
      router.push(pathname.replace(`/${lang}/app`, `/${nextLang}/app`))
      return
    }
    const cleanPath = pathname.replace(/^\/(en|ar)/, "") || "/dashboard"
    router.push(`/${nextLang}${cleanPath}`)
  }

  return (
    <main className="app-workspace min-h-svh bg-muted p-0 text-foreground sm:p-2 lg:p-3">
      <section className="mx-auto flex min-h-svh w-full flex-col overflow-hidden bg-background sm:min-h-[calc(100svh-1rem)] sm:rounded-2xl lg:min-h-[calc(100svh-1.5rem)]">
        <header className="shrink-0 border-b border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 px-3 lg:grid-cols-[1fr_auto_1fr] lg:px-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Link href={hrefFor("/dashboard")} className="relative h-8 w-8 shrink-0 rounded-lg transition-transform after:absolute after:-inset-1 active:scale-[0.96]" aria-label="Home">
                <Image src="/Anas%20Hamad.png" alt="Anas Hamad" fill priority sizes="32px" className="rounded-lg object-cover outline outline-1 outline-black/10 dark:outline-white/10" />
              </Link>
              <div className="hidden h-5 w-px bg-border sm:block" />
              <span className="hidden text-xs text-muted-foreground sm:inline">{labels.workspace}</span>
              <ChevronRight className={cn("hidden h-4 w-4 text-muted-foreground/50 sm:block", lang === "ar" && "rotate-180")} />
              <span className="truncate text-xs font-medium">{copy.title}</span>
              <span className="hidden rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline">{labels.draft}</span>
            </div>

            <nav className="hidden items-center gap-0.5 rounded-lg bg-muted p-0.5 lg:flex" aria-label={labels.sections}>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.key} href={hrefFor(item.path)} className={cn("relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-[color,background-color,box-shadow,transform] after:absolute after:-inset-y-1 hover:text-foreground active:scale-[0.96]", item.key === activePage && "bg-background text-foreground shadow-sm")}>
                    <Icon className="h-3 w-3 shrink-0" />
                    {item.label[lang]}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center justify-end gap-1.5">
              <button type="button" onClick={switchLanguage} className="relative grid h-8 min-w-8 place-items-center rounded-lg px-1.5 text-[10px] font-semibold text-muted-foreground transition-colors after:absolute after:-inset-1 hover:bg-muted hover:text-foreground active:scale-[0.96]" aria-label={labels.switchLanguage}>{lang === "en" ? "ع" : "EN"}</button>
              <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className="relative grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors after:absolute after:-inset-1 hover:bg-muted hover:text-foreground active:scale-[0.96]" aria-label={isDark ? labels.themeLight : labels.themeDark}>
                <Sun className={cn("absolute h-3.5 w-3.5 transition-[opacity,scale,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]", isDark ? "scale-100 opacity-100 blur-0" : "scale-25 opacity-0 blur-[4px]")} />
                <Moon className={cn("absolute h-3.5 w-3.5 transition-[opacity,scale,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]", isDark ? "scale-25 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0")} />
              </button>
              <button className="relative grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors after:absolute after:-inset-1 hover:bg-muted hover:text-foreground active:scale-[0.96]" aria-label={labels.more}><MoreHorizontal className="h-4 w-4" /></button>
              <button className="relative hidden h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors after:absolute after:-inset-y-1 hover:bg-muted hover:text-foreground sm:flex"><Users className="h-3.5 w-3.5" />{labels.share}</button>
              <button className="relative h-8 rounded-lg bg-[#165dfb] px-3 text-xs font-semibold text-white transition-[background-color,transform] after:absolute after:-inset-y-1 hover:bg-[#165dfb]/90 active:scale-[0.96]">{labels.publish}</button>
            </div>
          </div>

          <nav className="flex gap-0.5 overflow-x-auto border-t border-border/60 px-2 py-1.5 lg:hidden" aria-label={labels.sections}>
            {navItems.map((item) => { const Icon = item.icon; return <Link key={item.key} href={hrefFor(item.path)} className={cn("flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium text-muted-foreground", item.key === activePage && "bg-muted text-foreground")}><Icon className="h-3 w-3" />{item.label[lang]}</Link> })}
          </nav>
        </header>

        <div className="min-w-0 flex-1 overflow-y-auto bg-background">
          <div className="w-full px-4 py-8 sm:px-5 sm:py-10 lg:px-6 lg:py-12">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"><Sparkles className="h-3.5 w-3.5" />{copy.eyebrow}</div>
            <h1 className="text-balance text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.04em] text-foreground">{copy.title}</h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">{copy.description}</p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <MetricCard value={copy.metric} label={copy.metricLabel} />
              <MetricCard value={copy.secondary} label={copy.secondaryLabel} />
            </div>

            <section className="mt-2.5 rounded-xl bg-muted p-4">
              <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">{labels.activity}</h2><span className="text-xs text-muted-foreground">{labels.period}</span></div>
              <div className="mt-5 flex h-1.5 overflow-hidden rounded-full bg-background"><span className="w-[58%] bg-[#165dfb]" /><span className="w-[20%] bg-foreground" /></div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground"><Legend color="bg-[#165dfb]" label={labels.completed} /><Legend color="bg-foreground" label={labels.progress} /><Legend color="bg-muted-foreground/30" label={labels.upcoming} /></div>
            </section>

            <section className="mt-7"><h2 className="text-base font-semibold tracking-[-0.02em]">{labels.highlights}</h2><p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">{labels.highlightsBody}</p></section>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) { return <div className="rounded-xl bg-muted p-4"><div className="tabular-nums text-xl font-semibold tracking-[-0.03em]">{value}</div><div className="mt-5 text-xs text-muted-foreground">{label}</div></div> }
function Legend({ color, label }: { color: string; label: string }) { return <span className="flex items-center gap-2"><i className={cn("h-2 w-2 rounded-full", color)} />{label}</span> }
