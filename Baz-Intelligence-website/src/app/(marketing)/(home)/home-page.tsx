'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode, type TouchEvent } from 'react'
import ButtonDemo from '@/components/button-demo'
import { HugeiconsIcon } from '@hugeicons/react'
import { AccessIcon, CloudServerIcon, DatabaseSyncIcon, RefreshDotIcon, SaveMoneyDollarIcon, ShieldKeyIcon, TimeManagementIcon, TokenCircleIcon, WorkflowSquare10Icon } from '@hugeicons/core-free-icons'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react'
import { Badge } from '@/components/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { TopNav } from '@/components/top-nav'
import { MarketingFooter } from '@/components/marketing-footer'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import TailarkIntegrationsSection from '@/components/integrations-11'
import StackIcon, { type IconName } from 'tech-stack-icons'
import AvatarGroupTooltipTransitionDemo, { type Avatar18Item } from '@/components/shadcn-studio/avatar/avatar-18'
import { usePathname, useRouter } from 'next/navigation'
import { ModelTrainingIllustration } from '@/components/illustrations/model-training'
import { ModelsIllustration } from '@/components/illustrations/models'
import { Flow10Illustration } from '@/components/illustrations/flow-10'
import CodeBlockIllustration from '@/components/ui/illustrations/code-block-illustration'
import { MessageIllustration } from '@/components/ui/illustrations/message-illustration'
import { Models3Illustration } from '@/components/ui/illustrations/models-3-illustration'
import { ServerIllustration } from '@/components/ui/illustrations/server-illustration'
import { VisualizationIllustration } from '@/components/illustrations/visualization-illustration'
import { WorkflowIllustration } from '@/components/ui/illustrations/workflow-illustration'

type Language = 'en' | 'ar'
type ShowcaseProjectCard = {
    badge: string
    title: string
    subtitle: string
    features: string[]
    betweenParagraph?: string
    images: Array<{
        src: string
        alt: string
    }>
}
type ImageBoxSection = {
    title: string
    description: string
    rotatingTitles?: string[]
    items: Array<{
        title?: string
        description: string
    }>
}
type BentoSection = {
    title: string
    description: string
    items: Array<{
        title: string
        description: string
    }>
}
type UseCasesSection = {
    title: string
    description: string
    useCases: Array<{
        title: string
        description: string
    }>
}
type IntegrationsSection = {
    title: string
    description: string
}
type CtaBoxSection = {
    title: string
    description: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel?: string
    secondaryHref?: string
}
type CustomNavItem = {
    label: string
    href: string
}

const STORAGE_KEY = 'baz-language'
const ibmArabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
})
const thmanyahSerifDisplay = localFont({
    src: '../../../../public/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2',
    display: 'swap',
})
const redaction50Italic = localFont({
    src: '../../../../public/redaction/Redaction_50-Italic.woff2',
    display: 'swap',
})
const redaction50Regular = localFont({
    src: '../../../../public/redaction/Redaction_50-Regular.woff2',
    display: 'swap',
})
const thmanyahOpenTypeStyles: CSSProperties = {
    // Enable stylistic alternates and contextual Arabic shaping when available in the font.
    fontFeatureSettings: '"salt" 1, "calt" 1, "liga" 1, "kern" 1, "ss01" 1, "ss02" 1',
    fontKerning: 'normal',
}

const renderBoldText = (text: string) => {
    const parts: ReactNode[] = []
    const pattern = /\*\*(.*?)\*\*/g
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > cursor) {
            parts.push(text.slice(cursor, match.index))
        }

        parts.push(
            <strong key={`${match.index}-${match[1]}`} className="font-medium text-black dark:text-white">
                {match[1]}
            </strong>,
        )
        cursor = match.index + match[0].length
    }

    if (cursor < text.length) {
        parts.push(text.slice(cursor))
    }

    return parts
}

const renderBentoIllustration = (itemIndex: number) => {
    const bentoIllustrationClasses = [
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
        'h-56 sm:h-64 lg:h-72',
    ]
    const illustrationClass = `flex w-full items-center justify-center overflow-hidden rounded-md bg-white/70 dark:bg-white/5 ${bentoIllustrationClasses[itemIndex] ?? 'h-52 sm:h-60'}`

    switch (itemIndex) {
        case 0:
            return (
                <div className={illustrationClass}>
                    <div className="scale-[0.76] sm:scale-[0.88] lg:scale-100">
                        <Models3Illustration />
                    </div>
                </div>
            )
        case 1:
            return (
                <div className={illustrationClass}>
                    <div className="scale-[0.68] sm:scale-[0.78]">
                        <ModelTrainingIllustration />
                    </div>
                </div>
            )
        case 2:
            return (
                <div className={illustrationClass}>
                    <div className="scale-[0.86] sm:scale-[0.94]">
                        <MessageIllustration />
                    </div>
                </div>
            )
        case 3:
            return (
                <div className={illustrationClass}>
                    <ServerIllustration
                        isActive
                        className="w-32 sm:w-40"
                    />
                </div>
            )
        case 4:
            return (
                <div className={illustrationClass}>
                    <div className="w-full max-w-md px-2">
                        <CodeBlockIllustration />
                    </div>
                </div>
            )
        case 5:
            return (
                <div className={illustrationClass}>
                    <div className="scale-[0.94] sm:scale-105">
                        <WorkflowIllustration />
                    </div>
                </div>
            )
        case 6:
            return (
                <div className={illustrationClass}>
                    <div className="scale-[0.68] sm:scale-[0.78]">
                        <VisualizationIllustration />
                    </div>
                </div>
            )
        default:
            return <div className={illustrationClass} />
    }
}

const content = {
    en: {
        nav: {
            logo: 'Atmet Technologies',
            services: 'Services',
            ourWork: 'Our Work',
            aiTechnologies: 'Atmet Technologies: for AI Technologies',
            appsWebsites: 'Atmet Technologies: for Apps & Websites',
            articles: 'Cases',
            sayHi: 'Say Hi',
        },
        brandTitle: 'Atmet Technologies',
        brandSubtitle: 'AI Research & Technologies Lab',
        heading: {
            beforeHighlight: 'We build secure',
            highlight: 'AI agents',
            afterHighlight: 'that understand how your company works, connect to your existing tools, and automate workflows.',
        },
        subheading: 'For founders, startups, businesses, and individuals.',
        introParagraphs: [
            'Most companies today do not need another AI tool as much as they need a system that truly understands how they operate. The problem is rarely the absence of powerful models. It is usually scattered knowledge, repetitive manual work, disconnected systems, and the difficulty of turning AI from something that answers questions into something that can actually complete work. We begin inside the operation itself: meeting the teams, understanding the steps, decisions, approvals, and exceptions, then redesigning those processes and turning them into intelligent systems built around the company’s real needs. From AI agents that carry out complete workflows, to knowledge bases and knowledge graphs that organise company information, specialised models, and integrations that connect email, files, CRM, ERP, and internal tools within one secure and controlled environment.',
            'Our goal is not to add another LLM. It is to build an intelligent operational layer that becomes part of the company’s core infrastructure. Systems that can read information, search organisational knowledge, make decisions within clear permissions, update records, prepare documents and reports, request approval when necessary, and keep every action traceable and reviewable. These solutions can run locally inside the company, in a private cloud, or through a hybrid architecture depending on data sensitivity and security requirements. We usually begin with one high-impact workflow, prove its value, then expand into an entire department and later across multiple connected departments. The aim is for AI to stop being a side tool and become an operational system that understands how the company works, helping its teams achieve more with less time, fewer errors, and greater control.',
            'With Atmet, **you own your agent**. It is **trained around your knowledge base**, your workflows, and the way your departments operate, which means **less token waste and better results** than a generic setup. If your workflow changes, the agent can be **trained again** and updated with the new process. You can **assign permissions** by role, team, or department, so **finance, operations, sales, engineering, marketing**, and any other category can each use AI within the right boundaries.',
        ],
        buttons: {
            talkTo: 'Talk to',
            founders: 'Founders',
            ourWork: 'Services',
        },
        valueCards: [
            {
                icon: 'costs',
                title: 'Save more than 50% of your costs',
                description: 'Replace repetitive tool spend and manual execution with a focused agent built around your real workflows.',
            },
            {
                icon: 'agent',
                title: 'Own your agent model',
                description: 'Your agent is designed for your company knowledge, permissions, departments, and operational rules.',
            },
            {
                icon: 'deployment',
                title: 'Run it locally or in the cloud',
                description: 'Deploy inside your company environment, private cloud, or hybrid setup based on your data sensitivity.',
            },
            {
                icon: 'trained',
                title: 'Ready-trained model',
                description: 'Start with a model trained on your knowledge base, workflows, documents, and team processes.',
            },
            {
                icon: 'time',
                title: 'Save your team time',
                description: 'Automate follow-ups, documents, updates, approvals, and repeated work so teams can focus on decisions.',
            },
            {
                icon: 'tokens',
                title: 'Better token usage than current LLM tools',
                description: 'Use context more efficiently with workflow-specific retrieval, fewer repeated prompts, and cleaner execution.',
            },
            {
                icon: 'learning',
                title: 'Continuous model learning',
                description: 'Keep the agent aligned as your workflows, documents, policies, and team processes change.',
            },
            {
                icon: 'security',
                title: 'Security',
                description: 'Run agents with controlled access, traceable actions, and deployment options that match your data sensitivity.',
            },
            {
                icon: 'roles',
                title: 'Control roles and permissions',
                description: 'Define what each team, role, or department can see, use, approve, and automate.',
            },
        ],
        articlesDescription: 'Intelligent systems designed to simplify complex workflows and deliver practical, measurable outcomes.',
        foundersTitle: 'Founders',
        foundersTagline: '- We just love AI',
        contact: {
            x: 'X',
            instagram: 'Instagram',
            linkedIn: 'LinkedIn',
        },
        testimonials: {
            title: 'Testimonials',
            items: [
                {
                    clientName: 'Randa Mitwalli',
                    company: 'Randa Academy',
                    quote: 'I did not share my feedback yet but I will do soon : )',
                    avatarFallback: 'RM',
                    avatarSrc: '/new%20clients/Randa%20mitwalli.webp',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'Execution quality was exceptional. Their system gave our team better visibility, faster decisions, and a much clearer way to scale internal processes.',
                    avatarFallback: 'EM',
                    avatarSrc: '/new%20clients/Ehab%20Mousa.jpg',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'From strategy to rollout, every step was practical and measurable. The final product matched our business goals and improved our day-to-day operations.',
                    avatarFallback: 'YB',
                    avatarSrc: '/new%20clients/Yazan%20Al%20billeh.jpeg',
                },
            ],
        },
        ctaPanel: {
            headline: 'Ready to build your AI system?',
            description: 'We design and ship practical AI products tailored to your operations, with clear execution and measurable outcomes.',
        },
    },
    ar: {
        nav: {
            logo: 'أتمت تيكنولوجيس',
            services: 'الخدمات',
            ourWork: 'أعمالنا',
            aiTechnologies: 'أتمت تيكنولوجيس: لتقنيات الذكاء الاصطناعي',
            appsWebsites: 'أتمت تيكنولوجيس: للتطبيقات والمواقع',
            articles: 'الحالات',
            sayHi: 'تواصل',
        },
        brandTitle: 'أتمت تيكنولوجيس',
        brandSubtitle: 'مختبر أبحاث تقنيات ذكاء إصطناعي',
        heading: {
            beforeHighlight: 'نبني وكلاء',
            highlight: 'ذكاء اصطناعي',
            afterHighlight: 'آمنين يتكاملون مع أنظمة شركتك، ويتولّون تنفيذ المهام والعمليات اليومية بكفاءة.',
        },
        subheading: 'للمؤسسين، للشركات الناشئة، للأعمال، وللأفراد.',
        introParagraphs: [
            'معظم الشركات اليوم لا تحتاج إلى أداة ذكاء اصطناعي جديدة بقدر ما تحتاج إلى نظام يفهم كيف تعمل فعليًا. فالمشكلة غالبًا ليست في غياب النماذج، بل في تشتّت المعرفة، واعتماد الفرق على أعمال يدوية متكررة، وانفصال الأنظمة عن بعضها، وصعوبة تحويل الذكاء الاصطناعي من أداة تجيب عن الأسئلة إلى نظام قادر على إنجاز العمل. نحن نبدأ من داخل العملية نفسها: نلتقي بالفرق، نفهم خطوات العمل والقرارات والموافقات والاستثناءات، ثم نعيد تصميمها ونحوّلها إلى أنظمة ذكية مبنية حول احتياجات الشركة. من وكلاء ذكاء اصطناعي ينفّذون مهام متكاملة، إلى قواعد معرفة ورسوم معرفية تنظّم معلومات المؤسسة، ونماذج متخصصة، وتكاملات تربط البريد والملفات وأنظمة الـCRM والـERP والأدوات الداخلية ضمن بيئة واحدة آمنة وقابلة للتحكم.',
            'غايتنا ليست إضافة روبوت محادثة آخر، بل بناء طبقة تشغيل ذكية تصبح جزءًا من البنية الأساسية للشركة. أنظمة تستطيع قراءة المعلومات، والبحث في معرفة المؤسسة، واتخاذ قرارات ضمن صلاحيات واضحة، وتحديث الأنظمة، وإعداد المستندات والتقارير، وطلب الموافقة عند الحاجة، مع بقاء كل إجراء قابلًا للتتبّع والمراجعة. ويمكن تشغيل هذه الحلول محليًا داخل الشركة، أو على سحابة خاصة، أو من خلال بنية هجينة بحسب حساسية البيانات ومتطلبات الأمان. نبدأ عادةً بعملية واحدة ذات أثر واضح، نثبت قيمتها، ثم نتوسع إلى قسم كامل، وبعدها إلى عدة أقسام مترابطة؛ حتى لا يبقى الذكاء الاصطناعي أداة جانبية، بل يصبح نظامًا تشغيليًا يفهم طريقة عمل الشركة ويساعد فرقها على إنجاز المزيد بوقت أقل، وأخطاء أقل، وتحكّم أكبر.',
            'مع أتمت، تحصل على **وكيل ذكاء اصطناعي مصمم خصيصاً لشركتك**، يتعلّم من **بياناتك ومعرفتك الداخلية** ويفهم إجراءات العمل وطريقة تعاون الفرق، ليقدّم **نتائج أدق** ويستخدم الموارد **بكفاءة أكبر** من الحلول العامة. ومع تطور عمليات شركتك، يمكنك **تحديثه ليتكيّف مع الإجراءات الجديدة**، والتحكم في صلاحياته وفقاً للدور أو الفريق أو القسم، بحيث تستفيد فرق **المالية والعمليات والمبيعات والهندسة والتسويق** وغيرها من الذكاء الاصطناعي ضمن حدود الوصول المسموح بها.',
        ],
        buttons: {
            talkTo: 'تحدث مع',
            founders: 'المؤسسين',
            ourWork: 'الخدمات',
        },
        valueCards: [
            {
                icon: 'costs',
                title: 'وفّر أكثر من 50% من التكاليف',
                description: 'استبدل الإنفاق المتكرر على الأدوات والتنفيذ اليدوي بوكيل مصمم حول سير العمل الحقيقي في شركتك.',
            },
            {
                icon: 'agent',
                title: 'امتلك نموذج الوكيل الخاص بك',
                description: 'يتم تصميم الوكيل وفق معرفة شركتك وصلاحياتها وأقسامها وقواعد التشغيل الداخلية.',
            },
            {
                icon: 'deployment',
                title: 'شغّله محلياً أو على السحابة',
                description: 'يمكن نشره داخل بيئة الشركة أو على سحابة خاصة أو ببنية هجينة حسب حساسية البيانات.',
            },
            {
                icon: 'trained',
                title: 'نموذج مدرّب وجاهز',
                description: 'ابدأ بنموذج مدرّب على قاعدة معرفتك وسير العمل والمستندات وطريقة عمل الفرق.',
            },
            {
                icon: 'time',
                title: 'وفّر وقت فريقك',
                description: 'أتمت المتابعات والمستندات والتحديثات والموافقات والعمل المتكرر ليركز الفريق على القرارات.',
            },
            {
                icon: 'tokens',
                title: 'استخدام أفضل للتوكنز من أدوات LLM الحالية',
                description: 'استفد من السياق بكفاءة أعلى عبر استرجاع متخصص، وتكرار أقل في الطلبات، وتنفيذ أوضح.',
            },
            {
                icon: 'learning',
                title: 'تعلّم مستمر للنموذج',
                description: 'حدّث الوكيل مع تغيّر سير العمل والمستندات والسياسات وطريقة عمل الفريق.',
            },
            {
                icon: 'security',
                title: 'الأمان',
                description: 'شغّل الوكلاء بصلاحيات واضحة، وإجراءات قابلة للتتبع، ونشر يناسب حساسية بياناتك.',
            },
            {
                icon: 'roles',
                title: 'تحكم بالأدوار والصلاحيات',
                description: 'حدد ما يمكن لكل فريق أو دور أو قسم الوصول إليه، استخدامه، اعتماده، وأتمتته.',
            },
        ],
        articlesDescription: 'أنظمة ذكية مُصممة لتبسيط سير العمل المعقّد وتقديم نتائج عملية قابلة للقياس.',
        foundersTitle: 'المؤسسون',
        foundersTagline: '- نحن نحب الذكاء الاصطناعي',
        contact: {
            x: 'إكس',
            instagram: 'إنستغرام',
            linkedIn: 'لينكدإن',
        },
        testimonials: {
            title: 'آراء العملاء',
            items: [
                {
                    clientName: 'Randa Mitwalli',
                    company: 'Randa Academy',
                    quote: 'لم أشارك تقييمي بعد، لكن سأفعل ذلك قريبًا :)',
                    avatarFallback: 'RM',
                    avatarSrc: '/new%20clients/Randa%20mitwalli.webp',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'جودة التنفيذ كانت ممتازة. النظام أعطى فريقنا وضوحًا أكبر، وقرارات أسرع، وخطة أوضح للتوسع في العمليات.',
                    avatarFallback: 'EM',
                    avatarSrc: '/new%20clients/Ehab%20Mousa.jpg',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'من الاستراتيجية إلى الإطلاق، كل خطوة كانت عملية وقابلة للقياس، والنتيجة النهائية انسجمت مع أهداف العمل بشكل واضح.',
                    avatarFallback: 'YB',
                    avatarSrc: '/new%20clients/Yazan%20Al%20billeh.jpeg',
                },
            ],
        },
        ctaPanel: {
            headline: 'جاهز لبناء نظام ذكاء اصطناعي لمشروعك؟',
            description: 'نصمم وننفذ منتجات ذكاء اصطناعي عملية تناسب عملياتك، بخطة تنفيذ واضحة ونتائج قابلة للقياس.',
        },
    },
} as const

type IntegrationIconName = IconName | 'google-sheets'
type ValueCardIconName = 'costs' | 'agent' | 'deployment' | 'trained' | 'time' | 'tokens' | 'learning' | 'security' | 'roles'

const valueCardIcons: Record<ValueCardIconName, typeof WorkflowSquare10Icon> = {
    costs: SaveMoneyDollarIcon,
    agent: WorkflowSquare10Icon,
    deployment: CloudServerIcon,
    trained: DatabaseSyncIcon,
    time: TimeManagementIcon,
    tokens: TokenCircleIcon,
    learning: RefreshDotIcon,
    security: ShieldKeyIcon,
    roles: AccessIcon,
}

const integrationIconNames: IntegrationIconName[] = [
    'google',
    'slack',
    'notion',
    'onedrive',
    'google-sheets',
    'salesforce',
    'github',
    'airtable',
    'zapier',
    'stripe',
    'openai',
    'supabase',
    'figma',
    'linear',
    'jira',
]

export default function Home({
    initialLanguage = 'en',
    showHeroImage = true,
    showHeroIntegrationStrip = true,
    showTestimonials = true,
    showServicesButton = true,
    techStackIcons = [],
    brandTitleOverride,
    brandSubtitleOverride,
    showHeroBrandBlock = true,
    showClientAvatarStrip = false,
    clientAvatarItems,
    logoPrimarySrc = '/Atmet%20Technologies%20logo.png',
    logoSecondarySrc = '/Atmet%20technogloes%20white.png',
    stackShowcaseContentTop = false,
    showTopNav = true,
    topNavLogoOverride,
    topNavLogoLightSrc,
    topNavLogoDarkSrc,
    topNavItems,
    topNavMaxWidthClass,
    topNavHomeHref,
    heroHeadingOverride,
    heroDescriptionOverride,
    heroHeadingClassName,
    heroDescriptionPlacement = 'inline',
    heroPrimaryButtonLabel,
    heroPrimaryButtonHref,
    heroSecondaryButtonLabel,
    heroSecondaryButtonHref,
    heroButtonsPlacement = 'afterIntro',
    showIntroSection = true,
    showValueCards = true,
    showShowcaseSection = true,
    imageBoxSection,
    bentoSection,
    useCasesSection,
    integrationsSection,
    ctaBoxSection,
    contentMaxWidthClass = 'max-w-2xl',
    introParagraphsOverride,
    showcaseProjectCardsOverride,
    ctaHeadlineOverride,
    ctaDescriptionOverride,
}: {
    initialLanguage?: Language
    showHeroImage?: boolean
    showHeroIntegrationStrip?: boolean
    showTestimonials?: boolean
    showServicesButton?: boolean
    techStackIcons?: IconName[]
    brandTitleOverride?: string
    brandSubtitleOverride?: string
    showHeroBrandBlock?: boolean
    showClientAvatarStrip?: boolean
    clientAvatarItems?: Avatar18Item[]
    logoPrimarySrc?: string
    logoSecondarySrc?: string
    stackShowcaseContentTop?: boolean
    showTopNav?: boolean
    topNavLogoOverride?: string
    topNavLogoLightSrc?: string
    topNavLogoDarkSrc?: string
    topNavItems?: CustomNavItem[]
    topNavMaxWidthClass?: string
    topNavHomeHref?: string
    heroHeadingOverride?: string
    heroDescriptionOverride?: string
    heroHeadingClassName?: string
    heroDescriptionPlacement?: 'inline' | 'below'
    heroPrimaryButtonLabel?: string
    heroPrimaryButtonHref?: string
    heroSecondaryButtonLabel?: string
    heroSecondaryButtonHref?: string
    heroButtonsPlacement?: 'afterHeading' | 'afterIntro'
    showIntroSection?: boolean
    showValueCards?: boolean
    showShowcaseSection?: boolean
    imageBoxSection?: ImageBoxSection
    bentoSection?: BentoSection
    useCasesSection?: UseCasesSection
    integrationsSection?: IntegrationsSection
    ctaBoxSection?: CtaBoxSection
    contentMaxWidthClass?: string
    introParagraphsOverride?: string[]
    showcaseProjectCardsOverride?: ShowcaseProjectCard[]
    ctaHeadlineOverride?: string
    ctaDescriptionOverride?: string
}) {
    void showTestimonials
    void stackShowcaseContentTop
    void ctaHeadlineOverride
    void ctaDescriptionOverride
    const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
    const [activeProjectImageIndexes, setActiveProjectImageIndexes] = useState<number[]>([])
    const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0)
    const [activeFeatureTitleIndex, setActiveFeatureTitleIndex] = useState(0)
    const [isAtmetTooltipOpen, setIsAtmetTooltipOpen] = useState(false)
    const atmetTooltipTimeoutRef = useRef<number | null>(null)
    const projectTouchStartXByCardRef = useRef<Record<number, number | null>>({})
    const router = useRouter()
    const pathname = usePathname()
    const isArabic = language === 'ar'
    const t = content[language]
    const textAlignClass = isArabic ? 'text-right' : 'text-left'
    const heroHeadingLineHeightClass = isArabic ? 'leading-7' : 'leading-6'
    const headlineHighlightFontClass = isArabic ? thmanyahSerifDisplay.className : redaction50Italic.className
    const brandTitleFontClass = isArabic ? '' : redaction50Regular.className
    const paragraphWeightClass = isArabic ? 'font-[300]' : 'font-light'
    const brandTitle = brandTitleOverride ?? t.brandTitle
    const brandSubtitle = brandSubtitleOverride ?? t.brandSubtitle
    const introParagraphs = introParagraphsOverride ?? t.introParagraphs
    const contactHref = isArabic ? '/ar/contact' : '/en/contact'
    const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
    const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
    const heroPrimaryHref = heroPrimaryButtonHref ?? contactHref
    const heroSecondaryHref = heroSecondaryButtonHref ?? servicesHref
    const heroHeadingClasses = heroHeadingClassName ?? `text-xl font-medium ${heroHeadingLineHeightClass}`
    const combinedServiceTags = isArabic
        ? [
            'أتمتة سير العمل',
            'وكلاء الذكاء الاصطناعي',
            'قواعد معرفة',
            'LLMs',
            'نماذج ML',
            'توفير التكاليف',
            'ملكية الوكيل',
            'تشغيل محلي/سحابي',
            'نموذج مدرّب',
            'توفير الوقت',
            'استخدام توكنز أفضل',
            'تعلّم مستمر',
            'أمان',
            'أدوار وصلاحيات',
        ]
        : [
            'Workflow Automation',
            'AI Agents',
            'Knowledge Bases',
            'LLMs',
            'ML Models',
            'Cost Savings',
            'Agent Ownership',
            'Local / Cloud',
            'Trained Model',
            'Team Time',
            'Better Tokens',
            'Continuous Learning',
            'Security',
            'Roles & Permissions',
        ]
    const showcaseProjectCards = showcaseProjectCardsOverride ?? []
    const heroButtons = (
        <div className={`mx-auto mt-4 flex ${contentMaxWidthClass} flex-wrap items-center justify-start gap-2 ${textAlignClass}`}>
            <ButtonDemo
                variant="default"
                size="default"
                className="h-7 rounded-md border-0 px-2 py-0 text-xs ring-0 shadow-none [text-shadow:none] [&_*]:text-inherit [&_*]:[text-shadow:none] dark:bg-white dark:text-black dark:hover:bg-white"
                onClick={() => {
                    window.location.href = heroPrimaryHref
                }}
                label={
                    heroPrimaryButtonLabel ?? (
                        <span>
                            {t.buttons.talkTo}{' '}
                            <span
                                className={`${headlineHighlightFontClass} ${isArabic ? '' : 'font-semibold'}`}
                                style={isArabic ? thmanyahOpenTypeStyles : undefined}
                            >
                                {t.buttons.founders}
                            </span>
                        </span>
                    )
                }
            />
            {showServicesButton ? (
                <ButtonDemo
                    variant="outline"
                    size="default"
                    className="h-7 rounded-md border-0 bg-site-gray-ui px-2 py-0 text-xs ring-0 shadow-none hover:bg-site-gray-ui"
                    onClick={() => {
                        window.location.href = heroSecondaryHref
                    }}
                    label={
                        <span>{heroSecondaryButtonLabel ?? t.buttons.ourWork}</span>
                    }
                />
            ) : null}
            {techStackIcons.length ? (
                <>
                    <span className="text-xs text-black/45" aria-hidden>-</span>
                    {techStackIcons.map((iconName, iconIndex) => (
                        <span key={`${iconName}-${iconIndex}`} className="inline-flex h-5 w-5 items-center justify-center" aria-hidden>
                            <StackIcon name={iconName} className="h-full w-full" />
                        </span>
                    ))}
                </>
            ) : null}
        </div>
    )

    const switchLanguage = (nextLanguage: Language) => {
        setLanguage(nextLanguage)

        if (!pathname) return

        const normalizedPath = pathname === '/' ? '' : pathname
        let nextPath = normalizedPath

        if (normalizedPath === '' || normalizedPath === '/en' || normalizedPath === '/ar') {
            nextPath = nextLanguage === 'ar' ? '/ar' : '/en'
        } else if (normalizedPath.startsWith('/ar/')) {
            nextPath = nextLanguage === 'en' ? `/en/${normalizedPath.slice(4)}` : normalizedPath
        } else if (normalizedPath.startsWith('/en/')) {
            nextPath = nextLanguage === 'ar' ? `/ar/${normalizedPath.slice(4)}` : normalizedPath
        } else if (nextLanguage === 'ar') {
            nextPath = `/ar${normalizedPath}`
        } else if (nextLanguage === 'en') {
            nextPath = `/en${normalizedPath}`
        }

        if (nextPath !== pathname) {
            router.push(nextPath)
        }
    }

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [isArabic, language])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const applyTheme = () => {
            document.documentElement.classList.toggle('dark', mediaQuery.matches)
        }

        applyTheme()
        mediaQuery.addEventListener('change', applyTheme)
        return () => mediaQuery.removeEventListener('change', applyTheme)
    }, [])

    useEffect(() => {
        return () => {
            if (atmetTooltipTimeoutRef.current) {
                window.clearTimeout(atmetTooltipTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!imageBoxSection?.rotatingTitles?.length) return

        const interval = window.setInterval(() => {
            setActiveFeatureTitleIndex((current) => (current + 1) % imageBoxSection.rotatingTitles!.length)
        }, 3400)

        return () => window.clearInterval(interval)
    }, [imageBoxSection?.rotatingTitles])

    const handleAtmetClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setIsAtmetTooltipOpen(true)

        if (atmetTooltipTimeoutRef.current) {
            window.clearTimeout(atmetTooltipTimeoutRef.current)
        }

        atmetTooltipTimeoutRef.current = window.setTimeout(() => {
            setIsAtmetTooltipOpen(false)
        }, 1400)
    }

    const goToNextProjectImage = (cardIndex: number) => {
        const totalImages = showcaseProjectCards[cardIndex]?.images.length ?? 0
        if (totalImages <= 1) return
        setActiveProjectImageIndexes((current) => {
            const next = [...current]
            next[cardIndex] = ((next[cardIndex] ?? 0) + 1) % totalImages
            return next
        })
    }

    const goToPreviousProjectImage = (cardIndex: number) => {
        const totalImages = showcaseProjectCards[cardIndex]?.images.length ?? 0
        if (totalImages <= 1) return
        setActiveProjectImageIndexes((current) => {
            const next = [...current]
            next[cardIndex] = ((next[cardIndex] ?? 0) - 1 + totalImages) % totalImages
            return next
        })
    }

    const handleProjectTouchStart = (cardIndex: number, event: TouchEvent<HTMLDivElement>) => {
        projectTouchStartXByCardRef.current[cardIndex] = event.touches[0]?.clientX ?? null
    }

    const handleProjectTouchEnd = (cardIndex: number, event: TouchEvent<HTMLDivElement>) => {
        const startX = projectTouchStartXByCardRef.current[cardIndex]
        const endX = event.changedTouches[0]?.clientX
        projectTouchStartXByCardRef.current[cardIndex] = null

        if (startX == null || endX == null) {
            return
        }

        const swipeDistance = startX - endX
        const minSwipeDistance = 45

        if (Math.abs(swipeDistance) < minSwipeDistance) {
            return
        }

        if (swipeDistance > 0) {
            goToNextProjectImage(cardIndex)
            return
        }

        goToPreviousProjectImage(cardIndex)
    }

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className={`flex min-h-screen flex-col bg-white px-6 pt-16 pb-40 sm:px-8 sm:pb-32 dark:bg-[#181615] ${isArabic ? ibmArabic.className : ''}`}
        >
            {showTopNav ? (
                <TopNav
                    isArabic={isArabic}
                    logo={topNavLogoOverride ?? t.nav.logo}
                    logoLightSrc={topNavLogoLightSrc}
                    logoDarkSrc={topNavLogoDarkSrc}
                    services={t.nav.services}
                    articles={t.nav.articles}
                    sayHi={t.nav.sayHi}
                    navItems={topNavItems}
                    language={topNavItems ? undefined : language}
                    onLanguageToggle={topNavItems ? undefined : () => {
                        switchLanguage(language === 'en' ? 'ar' : 'en')
                    }}
                    homeHref={topNavHomeHref ?? (isArabic ? '/ar' : '/en')}
                    servicesHref={servicesHref}
                    articlesHref={articlesHref}
                    contactHref={contactHref}
                    navMaxWidthClass={topNavMaxWidthClass}
                />
            ) : null}
            <div className="pt-2 text-black">
                {showHeroBrandBlock ? (
                    <div className={`mx-auto mb-3 flex ${contentMaxWidthClass} justify-start`}>
                        <div className="w-full">
                            <div className="inline-flex max-w-full items-start gap-2.5">
                                <div className="group relative aspect-square w-12 shrink-0 overflow-hidden rounded-md bg-white transition-colors duration-500 ease-out group-hover:bg-black dark:border-white/10 dark:bg-black dark:group-hover:bg-white">
                                    <Image
                                        src={logoPrimarySrc}
                                        alt="Atmet Technologies logo primary"
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-95 group-hover:opacity-0 dark:opacity-0 dark:group-hover:scale-100 dark:group-hover:opacity-100"
                                        priority
                                    />
                                    <Image
                                        src={logoSecondarySrc}
                                        alt="Atmet Technologies logo secondary"
                                        width={96}
                                        height={96}
                                        className="absolute inset-0 h-full w-full scale-105 object-contain opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 dark:scale-100 dark:opacity-100 dark:group-hover:scale-95 dark:group-hover:opacity-0"
                                        aria-hidden
                                    />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex h-12 flex-col justify-center">
                                        <p className={`text-[16px] leading-5 font-normal text-black ${brandTitleFontClass}`}>{brandTitle}</p>
                                        <p className="mt-0.5 text-[12px] leading-4 font-light text-black/60">{brandSubtitle}</p>
                                    </div>
                                </div>
                                {showClientAvatarStrip ? (
                                    <div className="inline-flex items-center gap-2">
                                        <span className="h-7 w-px bg-black/12" aria-hidden />
                                        <AvatarGroupTooltipTransitionDemo avatars={clientAvatarItems} />
                                    </div>
                                ) : null}
                            </div>
                            <div className="mt-3 flex flex-wrap justify-start gap-1.5">
                                {combinedServiceTags.map(item => (
                                    <p key={item} className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
                <h1 className={`mx-auto mt-4 ${contentMaxWidthClass} ${heroHeadingClasses} tracking-normal ${textAlignClass}`}>
                    <span>
                        {heroHeadingOverride ? (
                            heroHeadingOverride
                        ) : (
                            <>
                                {t.heading.beforeHighlight}{' '}
                                <span
                                    className={`${headlineHighlightFontClass} text-[#3b9eff] ${isArabic ? '' : 'font-semibold'}`}
                                    style={isArabic ? thmanyahOpenTypeStyles : undefined}
                                >
                                    {t.heading.highlight}
                                </span>{' '}
                                {t.heading.afterHighlight}
                            </>
                        )}
                    </span>
                    {heroDescriptionOverride && heroDescriptionPlacement === 'inline' ? (
                        <>
                            {' '}
                            <span className="text-black/55 dark:text-white/55">{heroDescriptionOverride}</span>
                        </>
                    ) : null}
                </h1>
                {heroDescriptionOverride && heroDescriptionPlacement === 'below' ? (
                    <p className={`mx-auto mt-2 ${contentMaxWidthClass} text-xl leading-6 font-medium tracking-normal text-black/55 dark:text-white/55 ${textAlignClass}`}>
                        {heroDescriptionOverride}
                    </p>
                ) : null}
                {heroButtonsPlacement === 'afterHeading' ? heroButtons : null}
                {showHeroImage ? (
                    <>
                        <div
                            className={`mx-auto mt-3 aspect-[3/2] w-full ${contentMaxWidthClass} overflow-hidden rounded-md`}
                            onContextMenu={(event) => event.preventDefault()}
                        >
                            <Image
                                src="/atmet-hero.jpg"
                                alt={isArabic ? 'صورة واجهة أتمت تيكنولوجيس' : 'Atmet Technologies hero image'}
                                width={1800}
                                height={1200}
                                className="h-full w-full object-cover"
                                draggable={false}
                                onDragStart={(event) => event.preventDefault()}
                                priority
                            />
                        </div>
                        {showHeroIntegrationStrip ? (
                            <div className={`mx-auto mt-2 flex w-full ${contentMaxWidthClass} flex-wrap items-center justify-start gap-x-2.5 gap-y-1.5`}>
                                <p className={`text-[11px] leading-4 text-black/45 ${isArabic ? 'font-[300] tracking-normal' : 'font-medium tracking-[0.12em] uppercase'}`}>
                                    {isArabic ? 'نشتغل مع أدواتك الحالية' : 'Works with your current stack'}
                                </p>
                                <div className="flex min-w-0 items-center" dir={isArabic ? 'rtl' : 'ltr'}>
                                    <div className="flex items-center gap-1">
                                        {integrationIconNames.map((iconName) => (
                                            <span
                                                key={iconName}
                                                className="relative inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-out hover:z-10 hover:scale-110"
                                                aria-hidden
                                            >
                                                {iconName === 'google-sheets' ? (
                                                    <span className="inline-flex h-full w-full items-center justify-center text-emerald-500">
                                                        <FileSpreadsheet className="size-3.5" strokeWidth={2.25} />
                                                    </span>
                                                ) : (
                                                    <StackIcon name={iconName} className="h-full w-full" />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <span className={`${isArabic ? 'mr-1' : 'ml-1'} inline-flex shrink-0 items-center text-[11px] leading-none font-medium tabular-nums text-black/50`}>
                                        +5000
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null}
                {showIntroSection ? (
                    <div className={`mx-auto mt-4 ${contentMaxWidthClass} space-y-5 text-base leading-5 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                        {introParagraphs.map(paragraph => {
                            const atmetText = 'Atmet AI'

                            if (!paragraph.includes(atmetText)) {
                                return <p key={paragraph}>{renderBoldText(paragraph)}</p>
                            }

                            const [beforeAtmet, afterAtmet] = paragraph.split(atmetText)

                            return (
                                <p key={paragraph}>
                                    {renderBoldText(beforeAtmet)}
                                    <Tooltip
                                        open={isAtmetTooltipOpen}
                                        onOpenChange={(open) => {
                                            if (!open) {
                                                setIsAtmetTooltipOpen(false)
                                            }
                                        }}
                                    >
                                        <TooltipTrigger asChild>
                                            <a
                                                href="#"
                                                onClick={handleAtmetClick}
                                                className="underline decoration-current underline-offset-2"
                                                aria-label="Atmet AI (coming soon)"
                                            >
                                                {atmetText}
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">soon</TooltipContent>
                                    </Tooltip>
                                    {renderBoldText(afterAtmet)}
                                </p>
                            )
                        })}
                    </div>
                ) : null}
                {heroButtonsPlacement === 'afterIntro' ? heroButtons : null}
                {showValueCards ? (
                    <div className={`mx-auto mt-5 grid w-full ${contentMaxWidthClass} grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3`}>
                        {t.valueCards.map((card) => {
                            const Icon = valueCardIcons[card.icon]

                            return (
                                <article
                                    key={card.title}
                                    className={`rounded-md bg-site-gray-surface p-3.5 ${textAlignClass}`}
                                >
                                    <div className={`flex items-start gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                                        <HugeiconsIcon icon={Icon} size={22} strokeWidth={1.8} className="mt-0.5 shrink-0 text-black" />
                                        <div className="min-w-0">
                                            <h2 className="text-sm leading-5 font-medium text-black text-balance">{card.title}</h2>
                                            <p className={`mt-1 text-xs leading-4 ${paragraphWeightClass} text-black/60`}>
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                ) : null}

            </div>

            {imageBoxSection ? (
                <section id="features" className={`mx-auto mt-12 w-full ${contentMaxWidthClass}`}>
                    {imageBoxSection.rotatingTitles?.length ? (
                        <div className={`space-y-1 ${textAlignClass}`}>
                            {imageBoxSection.rotatingTitles.map((title, titleIndex) => {
                                const isActive = activeFeatureTitleIndex === titleIndex
                                const importantPhrase =
                                    title.includes('knowledge base') ? 'knowledge base' :
                                    title.includes('agents') ? 'agents' :
                                    title.includes('apps') ? 'apps' :
                                    title.split(' ')[0] ?? ''
                                const [beforeImportant, afterImportant = ''] = title.split(importantPhrase)

                                return (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() => setActiveFeatureTitleIndex(titleIndex)}
                                        aria-pressed={isActive}
                                        className={`flex w-full flex-wrap items-center gap-2 text-left text-xl leading-6 font-medium tracking-normal outline-none transition-[color,opacity,transform] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-[#3b9eff]/50 ${isActive ? 'translate-y-0 text-black opacity-100 dark:text-white' : 'translate-y-0.5 text-black/40 opacity-70 hover:text-black/62 dark:text-white/38 dark:hover:text-white/62'}`}
                                    >
                                        {beforeImportant ? <span>{beforeImportant.trimEnd()}</span> : null}
                                        <span className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-base leading-5 font-medium transition-colors duration-700 ${isActive ? 'bg-[#3b9eff]/10 text-[#3b9eff] dark:bg-[#3b9eff]/14' : 'bg-black/6 text-black/35 dark:bg-white/8 dark:text-white/35'}`}>
                                            {importantPhrase}
                                        </span>
                                        {afterImportant ? <span>{afterImportant}</span> : null}
                                        <span className={`mt-0.5 shrink-0 text-[11px] leading-4 font-medium tabular-nums transition-colors duration-700 ${isActive ? 'text-[#3b9eff]' : 'text-black/35 dark:text-white/35'}`}>
                                            {String(titleIndex + 1).padStart(2, '0')}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                            <span>{imageBoxSection.title}</span>{' '}
                            <span className="text-black/55 dark:text-white/55">{imageBoxSection.description}</span>
                        </h2>
                    )}
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {imageBoxSection.items.map((item, itemIndex) => (
                            <article key={`${item.description}-${itemIndex}`} className={textAlignClass}>
                                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md bg-site-gray-surface">
                                    {itemIndex === 0 ? (
                                        <div className="scale-[0.86] sm:scale-100">
                                            <ModelsIllustration />
                                        </div>
                                    ) : null}
                                    {itemIndex === 1 ? (
                                        <div className="scale-[0.72] sm:scale-[0.78]">
                                            <ModelTrainingIllustration />
                                        </div>
                                    ) : null}
                                    {itemIndex === 2 ? (
                                        <div className="scale-[0.46] sm:scale-[0.52]">
                                            <Flow10Illustration />
                                        </div>
                                    ) : null}
                                </div>
                                {item.title ? (
                                    <h3 className={`mt-3 inline-flex items-start gap-1.5 text-sm leading-5 font-medium transition-colors duration-700 ${activeFeatureTitleIndex === itemIndex ? 'text-black dark:text-white' : 'text-black/42 dark:text-white/38'}`}>
                                        <span>{item.title}</span>
                                        <span className={`mt-0.5 text-[10px] leading-3 font-medium tabular-nums transition-colors duration-700 ${activeFeatureTitleIndex === itemIndex ? 'text-[#3b9eff]' : 'text-black/35 dark:text-white/35'}`}>
                                            {String(itemIndex + 1).padStart(2, '0')}
                                        </span>
                                    </h3>
                                ) : null}
                                <p className={`mt-2 text-sm leading-5 font-light transition-colors duration-700 ${activeFeatureTitleIndex === itemIndex ? 'text-black/62 dark:text-white/60' : 'text-black/42 dark:text-white/38'}`}>
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            {bentoSection ? (
                <section className={`mx-auto mt-12 w-full ${contentMaxWidthClass}`}>
                    <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                        <span>{bentoSection.title}</span>{' '}
                        <span className="text-black/55 dark:text-white/55">{bentoSection.description}</span>
                    </h2>
                    <div className="mt-5 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-12">
                        {bentoSection.items.map((item, itemIndex) => {
                            const bentoSizeClasses = ['sm:col-span-7', 'sm:col-span-5', 'sm:col-span-4', 'sm:col-span-4', 'sm:col-span-4', 'sm:col-span-8', 'sm:col-span-4']
                            const sizeClass = bentoSizeClasses[itemIndex] ?? 'sm:col-span-3'

                            return (
                                <article
                                    key={`${item.title}-${itemIndex}`}
                                    className={`flex h-[23rem] flex-col rounded-md bg-site-gray-surface p-3 sm:h-[24rem] lg:h-[25.5rem] ${sizeClass} ${textAlignClass}`}
                                >
                                    {renderBentoIllustration(itemIndex)}
                                    <h3 className="mt-3 text-sm leading-5 font-medium text-black text-balance">{item.title}</h3>
                                    <p className="mt-1 text-xs leading-4 font-light text-black/60">
                                        {item.description}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </section>
            ) : null}

            {useCasesSection ? (
                <section id="usecases" className={`mx-auto mt-12 w-full ${contentMaxWidthClass}`}>
                    <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                        <span>{useCasesSection.title}</span>{' '}
                        <span className="text-black/55 dark:text-white/55">{useCasesSection.description}</span>
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5">
                        <div className="sm:col-span-2">
                            {useCasesSection.useCases.map((useCase, useCaseIndex) => {
                                const isActive = activeUseCaseIndex === useCaseIndex

                                return (
                                    <button
                                        key={`${useCase.title}-${useCaseIndex}`}
                                        type="button"
                                        onClick={() => setActiveUseCaseIndex(useCaseIndex)}
                                        className={`block w-full border-b border-black/10 py-2.5 text-left transition-colors duration-200 last:border-b-0 dark:border-white/10 ${isArabic ? 'text-right' : 'text-left'}`}
                                    >
                                        <span className={`block text-sm leading-5 font-medium transition-colors duration-200 ${isActive ? 'text-black dark:text-white' : 'text-black/55 dark:text-white/55'}`}>
                                            {useCase.title}
                                        </span>
                                        <span
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <span className="overflow-hidden">
                                                <span className="block pt-1 text-xs leading-4 font-light text-black/60 dark:text-white/60">
                                                    {useCase.description}
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="min-h-[320px] rounded-md bg-site-gray-surface sm:col-span-3">
                            <div className="flex h-full min-h-[320px] items-center justify-center text-sm font-light text-black/45 dark:text-white/40">
                                {useCasesSection.useCases[activeUseCaseIndex]?.title}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {integrationsSection ? (
                <section id="integrations" className={`mx-auto mt-12 w-full ${contentMaxWidthClass}`}>
                    <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                        <span>{integrationsSection.title}</span>{' '}
                        <span className="text-black/55 dark:text-white/55">{integrationsSection.description}</span>
                    </h2>
                    <TailarkIntegrationsSection />
                </section>
            ) : null}

            {showShowcaseSection && showcaseProjectCards.length ? (
            <section id="articles" className={`mx-auto mt-10 w-full ${contentMaxWidthClass}`}>
                    <div className="space-y-7">
                        {showcaseProjectCards.map((card, cardIndex) => {
                            const activeImageIndex = activeProjectImageIndexes[cardIndex] ?? 0
                            return (
                                <div key={`${card.badge}-${cardIndex}`} className="space-y-4">
                                    <article className="overflow-hidden rounded-xl bg-site-gray-surface p-0.5 sm:p-1">
                                        <div className="overflow-hidden rounded-lg">
                                            <div className="grid gap-1 grid-cols-1">
                                                <div className={`min-w-0 p-4 sm:p-5 flex h-full flex-col ${textAlignClass}`}>
                                                    <div>
                                                        <div className="flex justify-start">
                                                            <Badge variant="blue" className="bg-[#ff2c48] text-white dark:bg-[#ff2c48] dark:text-white">
                                                                {card.badge}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="mt-3 text-xl leading-6 font-medium tracking-normal text-black">{card.title}</h3>
                                                        <p className={`mt-2 text-base leading-5 ${paragraphWeightClass} text-black/65`}>{card.subtitle}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex flex-wrap justify-start gap-1.5">
                                                            {card.features.map((item) => (
                                                                <span
                                                                    key={item}
                                                                    className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70"
                                                                >
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    dir="ltr"
                                                    className="relative min-h-[240px] overflow-hidden rounded-lg md:min-h-[360px]"
                                                    onTouchStart={(event) => handleProjectTouchStart(cardIndex, event)}
                                                    onTouchEnd={(event) => handleProjectTouchEnd(cardIndex, event)}
                                                >
                                                    <div
                                                        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                                        style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                                                    >
                                                        {card.images.map((image, imageIndex) => (
                                                            <div key={`${card.badge}-image-${imageIndex}`} className="relative h-full min-h-[240px] w-full shrink-0 md:min-h-[360px]">
                                                                <Image
                                                                    src={image.src}
                                                                    alt={image.alt}
                                                                    fill
                                                                    unoptimized
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {card.images.length > 1 ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => goToPreviousProjectImage(cardIndex)}
                                                                aria-label={isArabic ? 'الصورة السابقة' : 'Previous image'}
                                                                className="absolute left-2 top-1/2 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:inline-flex"
                                                            >
                                                                <ChevronLeft className="size-4" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => goToNextProjectImage(cardIndex)}
                                                                aria-label={isArabic ? 'الصورة التالية' : 'Next image'}
                                                                className="absolute right-2 top-1/2 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:inline-flex"
                                                            >
                                                                <ChevronRight className="size-4" />
                                                            </button>
                                                        </>
                                                    ) : null}
                                                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2 py-1 backdrop-blur-sm dark:bg-white/10">
                                                        {card.images.map((image, imageIndex) => (
                                                            <button
                                                                key={`${card.badge}-dot-${imageIndex}`}
                                                                type="button"
                                                                onClick={() => {
                                                                    setActiveProjectImageIndexes((current) => {
                                                                        const next = [...current]
                                                                        next[cardIndex] = imageIndex
                                                                        return next
                                                                    })
                                                                }}
                                                                aria-label={isArabic ? `الانتقال للصورة ${imageIndex + 1}` : `Go to image ${imageIndex + 1}`}
                                                                className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/65 hover:bg-white/90'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    {card.betweenParagraph ? (
                                        <p className={`whitespace-pre-line px-1 text-base leading-6 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                                            {card.betweenParagraph}
                                        </p>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
            </section>
            ) : null}

            {ctaBoxSection ? (
                <section className={`mx-auto mt-12 w-full ${contentMaxWidthClass}`}>
                    <div className={`relative min-h-[280px] overflow-hidden rounded-md bg-site-gray-surface px-4 py-6 sm:px-6 sm:py-8 ${textAlignClass}`}>
                        <div className="pointer-events-none absolute -bottom-3 -top-3 -right-3 w-full opacity-95 sm:w-[58%]">
                            <FlickeringGrid
                                className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)]"
                                squareSize={4}
                                gridGap={4}
                                color="#1063ff"
                                maxOpacity={0.42}
                                flickerChance={0.22}
                            />
                            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-site-gray-surface to-transparent sm:w-28" />
                        </div>
                        <div className="relative z-10 flex min-h-[216px] max-w-xl flex-col justify-between">
                            <div>
                                <h2 className="text-2xl leading-7 font-medium tracking-normal text-black text-balance dark:text-white">
                                    {ctaBoxSection.title}
                                </h2>
                                <p className="mt-2 max-w-lg text-base leading-6 font-light text-black/60 dark:text-white/60">
                                    {ctaBoxSection.description}
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-2">
                                <ButtonDemo
                                    variant="default"
                                    size="default"
                                    className="h-7 rounded-md border-0 px-2 py-0 text-xs ring-0 shadow-none [text-shadow:none] [&_*]:text-inherit [&_*]:[text-shadow:none] dark:bg-white dark:text-black dark:hover:bg-white"
                                    onClick={() => {
                                        window.location.href = ctaBoxSection.primaryHref
                                    }}
                                    label={ctaBoxSection.primaryLabel}
                                />
                                {ctaBoxSection.secondaryLabel && ctaBoxSection.secondaryHref ? (
                                    <ButtonDemo
                                        variant="outline"
                                        size="default"
                                        className="h-7 rounded-md border-0 bg-white/70 px-2 py-0 text-xs ring-0 shadow-none hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                                        onClick={() => {
                                            window.location.href = ctaBoxSection.secondaryHref as string
                                        }}
                                        label={ctaBoxSection.secondaryLabel}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
            <MarketingFooter
                isArabic={isArabic}
                textAlignClass={textAlignClass}
                contact={t.contact}
                language={language}
                onLanguageToggle={() => {
                    switchLanguage(language === 'en' ? 'ar' : 'en')
                }}
            />

        </main>
    )
}
