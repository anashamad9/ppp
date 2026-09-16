'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { BrainCircuit, LockKeyhole, Network, ServerCog, Workflow } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'
import { MarketingFooter } from '@/components/marketing-footer'
import { TopNav } from '@/components/top-nav'

type Language = 'en' | 'ar'

type PageCopy = {
  nav: {
    logo: string
    services: string
    articles: string
    sayHi: string
  }
  eyebrow: string
  heading: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  capabilitiesTitle: string
  capabilities: Array<{
    title: string
    description: string
  }>
  deploymentTitle: string
  deploymentDescription: string
  deploymentModels: string[]
  governanceTitle: string
  governanceDescription: string
  governanceItems: string[]
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

const STORAGE_KEY = 'baz-language'
const THEME_STORAGE_KEY = 'baz-theme'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const capabilityIcons = [BrainCircuit, Workflow, Network, ServerCog]

const copy: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Atmet Technologies',
      services: 'Services',
      articles: 'Cases',
      sayHi: 'Say Hi',
    },
    eyebrow: 'AI Technologies',
    heading: 'Private intelligence infrastructure for real business workflows.',
    subtitle:
      'We design and build secure AI systems that understand company knowledge, follow business rules, connect to existing tools, and help teams perform operational work across departments.',
    primaryCta: 'Talk to us',
    secondaryCta: 'View services',
    capabilitiesTitle: 'What the system can include',
    capabilities: [
      {
        title: 'AI agents',
        description: 'Bounded agents that retrieve information, make structured decisions, call tools, create records, and request approval.',
      },
      {
        title: 'Workflow orchestration',
        description: 'Clear automation flows that route tasks between agents, deterministic code, employees, and existing systems.',
      },
      {
        title: 'Knowledge architecture',
        description: 'Enterprise knowledge bases and knowledge graphs that make company information searchable, contextual, and governed.',
      },
      {
        title: 'Production deployment',
        description: 'Local, private cloud, or hybrid infrastructure with monitoring, updates, and operational support after launch.',
      },
    ],
    deploymentTitle: 'Flexible deployment',
    deploymentDescription:
      'Sensitive workloads can stay local, scalable workloads can run in private cloud, and many companies benefit from a hybrid model that balances privacy, speed, and cost.',
    deploymentModels: ['Local or on-premise', 'Private cloud', 'Hybrid'],
    governanceTitle: 'Built with controls',
    governanceDescription:
      'The goal is not unrestricted automation. The goal is useful, controlled, traceable, and reliable AI that can operate inside a serious business.',
    governanceItems: [
      'Permissions',
      'Approval requirements',
      'Audit logs',
      'Source references',
      'Cost tracking',
      'Failure handling',
      'Human escalation',
      'Rollback procedures',
    ],
    contact: {
      x: 'X',
      instagram: 'Instagram',
      linkedIn: 'LinkedIn',
    },
  },
  ar: {
    nav: {
      logo: 'أتمت تيكنولوجيس',
      services: 'الخدمات',
      articles: 'الحالات',
      sayHi: 'تواصل',
    },
    eyebrow: 'تقنيات الذكاء الاصطناعي',
    heading: 'بنية ذكاء خاصة لسير العمل الحقيقي داخل الشركات.',
    subtitle:
      'نصمم ونبني أنظمة ذكاء اصطناعي آمنة تفهم معرفة الشركة، وتتبع قواعد العمل، وتتصل بالأدوات الحالية، وتساعد الفرق على إنجاز العمل التشغيلي بين الأقسام.',
    primaryCta: 'تواصل معنا',
    secondaryCta: 'عرض الخدمات',
    capabilitiesTitle: 'ما الذي يمكن أن يتضمنه النظام',
    capabilities: [
      {
        title: 'وكلاء ذكاء اصطناعي',
        description: 'وكلاء بحدود واضحة يسترجعون المعلومات، يتخذون قرارات منظمة، يستخدمون الأدوات، ينشئون السجلات، ويطلبون الموافقة.',
      },
      {
        title: 'تنظيم سير العمل',
        description: 'مسارات أتمتة واضحة توزع المهام بين الوكلاء، والكود الحتمي، والموظفين، والأنظمة الحالية.',
      },
      {
        title: 'بنية المعرفة',
        description: 'قواعد معرفة وخرائط معرفة تجعل معلومات الشركة قابلة للبحث والفهم والحوكمة.',
      },
      {
        title: 'نشر إنتاجي',
        description: 'بنية محلية أو سحابية خاصة أو هجينة، مع مراقبة وتحديثات ودعم تشغيلي بعد الإطلاق.',
      },
    ],
    deploymentTitle: 'نشر مرن',
    deploymentDescription:
      'يمكن إبقاء الأعمال الحساسة محليًا، وتشغيل الأعمال القابلة للتوسع في سحابة خاصة، وغالبًا يناسب الشركات نموذج هجين يوازن بين الخصوصية والسرعة والتكلفة.',
    deploymentModels: ['محلي أو داخل الشركة', 'سحابة خاصة', 'هجين'],
    governanceTitle: 'مبني بضوابط',
    governanceDescription:
      'الهدف ليس أتمتة بلا حدود. الهدف هو ذكاء اصطناعي مفيد، قابل للتحكم، قابل للتتبع، وموثوق داخل شركة جادة.',
    governanceItems: [
      'الصلاحيات',
      'متطلبات الموافقة',
      'سجلات التدقيق',
      'مراجع المصادر',
      'تتبع التكلفة',
      'معالجة الفشل',
      'تصعيد بشري',
      'إجراءات التراجع',
    ],
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
}

export default function AITechnologiesSoonPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const [theme] = usePersistedTheme('system', THEME_STORAGE_KEY)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const shouldUseDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      document.documentElement.classList.toggle('dark', shouldUseDark)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  const isArabic = language === 'ar'
  const t = copy[language]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const aiTechnologiesHref = isArabic ? '/ar/our-work/ai-technologies' : '/en/our-work/ai-technologies'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`flex min-h-screen flex-col bg-white px-6 pt-16 pb-28 sm:px-8 dark:bg-[#181615] ${isArabic ? ibmArabic.className : ''}`}
    >
      <TopNav
        isArabic={isArabic}
        logo={t.nav.logo}
        services={t.nav.services}
        articles={t.nav.articles}
        sayHi={t.nav.sayHi}
        homeHref={homeHref}
        servicesHref={servicesHref}
        aiTechnologiesHref={aiTechnologiesHref}
        articlesHref={articlesHref}
        contactHref={contactHref}
      />

      <section className={`mx-auto mt-4 w-full max-w-2xl ${textAlignClass}`}>
        <p className="text-[11px] leading-4 font-medium tracking-[0.12em] text-black/45 uppercase">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl leading-9 font-medium tracking-normal text-black sm:text-4xl sm:leading-11">
          {t.heading}
        </h1>
        <p className="mt-4 text-base leading-7 font-light text-black/65">
          {t.subtitle}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={contactHref} className="inline-flex h-8 items-center rounded-md bg-black px-3 text-sm font-medium text-white transition-colors hover:bg-black/85">
            {t.primaryCta}
          </Link>
          <Link href={servicesHref} className="inline-flex h-8 items-center rounded-md bg-site-gray-ui px-3 text-sm font-light text-black/70 transition-colors hover:text-black">
            {t.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-2xl">
        <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>{t.capabilitiesTitle}</h2>
        <div className="mt-3 grid gap-2.5 md:grid-cols-2">
          {t.capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index] ?? BrainCircuit

            return (
              <article key={capability.title} className={`rounded-xl border border-black/10 bg-site-gray-surface p-4 ${textAlignClass}`}>
                <div className="inline-flex size-8 items-center justify-center rounded-md bg-site-gray-ui text-black/70">
                  <Icon className="size-4" />
                </div>
                <h3 className="mt-3 text-lg leading-6 font-medium text-black">{capability.title}</h3>
                <p className="mt-2 text-sm leading-5 font-light text-black/65">{capability.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-2xl gap-2.5 md:grid-cols-[0.9fr_1.1fr]">
        <article className={`rounded-xl border border-black/10 bg-site-gray-surface p-5 ${textAlignClass}`}>
          <h2 className="text-xl leading-6 font-medium tracking-normal text-black">{t.deploymentTitle}</h2>
          <p className="mt-3 text-base leading-6 font-light text-black/65">{t.deploymentDescription}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {t.deploymentModels.map((model) => (
              <span key={model} className="inline-flex rounded-md bg-site-gray-ui px-2 py-1 text-xs leading-4 font-light text-black/70">
                {model}
              </span>
            ))}
          </div>
        </article>

        <article className={`rounded-xl border border-black/10 bg-black p-5 text-white ${textAlignClass}`}>
          <div className="inline-flex size-8 items-center justify-center rounded-md bg-white/12 text-white">
            <LockKeyhole className="size-4" />
          </div>
          <h2 className="mt-3 text-xl leading-6 font-medium tracking-normal">{t.governanceTitle}</h2>
          <p className="mt-3 text-base leading-6 font-light text-white/70">{t.governanceDescription}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.governanceItems.map((item) => (
              <p key={item} className="text-sm leading-5 font-light text-white/72">
                {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <MarketingFooter
        isArabic={isArabic}
        textAlignClass={textAlignClass}
        contact={t.contact}
        language={language}
        onLanguageToggle={() => {
          setLanguage(language === 'en' ? 'ar' : 'en')
        }}
      />
    </main>
  )
}
