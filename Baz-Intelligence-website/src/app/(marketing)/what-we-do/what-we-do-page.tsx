'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { TopNav } from '@/components/top-nav'
import { MarketingFooter } from '@/components/marketing-footer'
import { usePathname, useRouter } from 'next/navigation'

type Language = 'en' | 'ar'

type Offer = {
  id: string
  title: string
  price?: string
  description?: string
  items?: string[]
}

type FaqItem = {
  question: string
  answer: string
}

type FeaturedUseCase = {
  slug: string
  badge: string
  title: string
  description: string
  cta: string
  features: string[]
  imageSrc: string
  imageAlt: string
}

type ServiceGroup = {
  title: string
  description: string
  items: string[]
}

type PageCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  heading: string
  intro: string
  offers: Offer[]
  cta: string
  appWebsiteCard: {
    title: string
    description: string
    ourWork: string
  }
  calculator: {
    oneTimeLabel: string
    monthlyCostsLabel: string
    savingsLabel: string
    rangeNote: string
    placeholder: string
  }
  featuredUseCases: FeaturedUseCase[]
  servicePortfolio: {
    title: string
    description: string
    groups: ServiceGroup[]
  }
  governance: {
    title: string
    description: string
    items: string[]
  }
  faq: {
    title: string
    items: FaqItem[]
  }
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

const STORAGE_KEY = 'baz-language'
const visibleFeaturedUseCaseSlugs = new Set(['social-media-agent-that-learned-the-client'])

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const content: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Atmet Technologies',
      whatWeDo: 'Services',
      articles: 'Cases',
      sayHi: 'Say Hi',
    },
    heading: 'What We Do',
    intro:
      'We build applied AI automation systems around how your company actually works: workflow discovery, secure agents, connected knowledge, systems integration, custom interfaces, and managed operations.',
    offers: [
      {
        id: 'meeting',
        title: 'AI Workflow Discovery',
        description: 'We identify what should be automated, what should stay human-controlled, and where a pilot can create measurable value.',
        items: [
          'Current workflow map',
          'Automation opportunity map',
          'Risk classification',
          'Recommended pilot',
          'Expected return analysis',
        ],
      },
      {
        id: 'needs',
        title: 'AI Agent Systems',
        description: 'We build bounded agents that retrieve knowledge, call tools, update systems, request approval, and complete real work.',
        items: [
          'Specialised agents',
          'Tool calling and workflow orchestration',
          'Human approval steps',
          'Model routing',
          'Testing and monitoring',
        ],
      },
      {
        id: 'for-who',
        title: 'Knowledge and Integrations',
        description: 'We organise company knowledge and connect agents to the systems your team already uses.',
        items: ['Enterprise knowledge bases', 'Knowledge graphs', 'CRM and ERP integrations', 'Databases and APIs'],
      },
      {
        id: 'calculator',
        title: 'Savings Calculator',
        description:
          'Estimate the operational savings that can justify a pilot or full implementation.',
      },
    ],
    cta: 'Talk to us',
    appWebsiteCard: {
      title: 'Looking for an App or website?',
      description: 'We also design and build full digital products with fast execution and high-quality delivery.',
      ourWork: 'Our Work',
    },
    calculator: {
      oneTimeLabel: 'One-time payment',
      monthlyCostsLabel: 'Enter your monthly costs (USD)',
      savingsLabel: 'Estimated monthly savings',
      rangeNote: 'Range based on 47% to 68% cost reduction.',
      placeholder: 'e.g. 20000',
    },
    featuredUseCases: [
      {
        slug: 'finance-team-copying-numbers',
        badge: 'Atmet Technologies Case 1',
        title: 'Finance Operations Agent',
        description: 'Turns purchase-order data entry into a controlled workflow with exceptions, approvals, and ERP preparation.',
        cta: 'Explore use case',
        features: ['ERP preparation', 'Approval control', 'Fewer manual checks'],
        imageSrc: '/Atmet%20Technologies.heic',
        imageAlt: 'Atmet Technologies finance operations case study',
      },
      {
        slug: 'online-store-customer-support',
        badge: 'Atmet Technologies Case 2',
        title: 'Customer Operations Agent',
        description: 'Investigates orders, shipping status, policies, and returns before preparing controlled responses.',
        cta: 'Explore use case',
        features: ['Faster responses', 'Policy checks', 'Human escalation'],
        imageSrc: '/Baz%20Intelligence%20Prev%20Eng.png',
        imageAlt: 'Atmet Technologies customer operations case study',
      },
      {
        slug: 'law-firm-knowledge-folders',
        badge: 'Atmet Technologies Case 3',
        title: 'Private Knowledge System',
        description: 'Helps lawyers search previous work safely by meaning, source, relationship, and permission.',
        cta: 'Explore use case',
        features: ['Source citations', 'Role permissions', 'Knowledge graph'],
        imageSrc: '/AI%20Labs%20%2B%20second.png',
        imageAlt: 'Atmet Technologies legal knowledge system case study',
      },
      {
        slug: 'marketing-team-brand-consistency',
        badge: 'Atmet Technologies Case 4',
        title: 'Marketing Operations System',
        description: 'Organises briefs, brand knowledge, approvals, publishing, and reporting without replacing creative direction.',
        cta: 'Explore use case',
        features: ['Brand memory', 'Approval tracking', 'Content flow'],
        imageSrc: '/art%20eng.png',
        imageAlt: 'Atmet Technologies marketing operations case study',
      },
      {
        slug: 'social-media-agent-that-learned-the-client',
        badge: 'Atmet Technologies Case 6',
        title: 'Graphic Design Agent',
        description: 'Generates social media post designs and images using the client’s layouts, product treatment, visual boundaries, and approval habits.',
        cta: 'Explore use case',
        features: ['Brand visuals', 'Post artwork', 'Review flow'],
        imageSrc: '/Article%206.png',
        imageAlt: 'Atmet Technologies graphic design agent case study',
      },
    ],
    servicePortfolio: {
      title: 'Service Portfolio',
      description: 'A complete system can include one or several of these layers, depending on the workflow and risk level.',
      groups: [
        {
          title: 'Discover',
          description: 'Find the workflows worth automating and define the right first system.',
          items: ['AI workflow discovery', 'Opportunity mapping', 'Risk and feasibility assessment'],
        },
        {
          title: 'Build',
          description: 'Design agents and models that have clear responsibilities and production boundaries.',
          items: ['AI agent development', 'Custom model development', 'Model routing'],
        },
        {
          title: 'Connect',
          description: 'Give the system access to the knowledge, tools, and interfaces it needs to perform work.',
          items: ['Enterprise knowledge base', 'Knowledge graph', 'Systems integration', 'Custom interface'],
        },
        {
          title: 'Operate',
          description: 'Deploy and maintain the system as long-term operational infrastructure.',
          items: ['Local, cloud, or hybrid deployment', 'Managed AI operations', 'Monitoring and improvements'],
        },
      ],
    },
    governance: {
      title: 'Controlled, traceable, and reviewable',
      description:
        'Important actions should not run as black boxes. We design AI systems with controls that make automation useful without making it reckless.',
      items: [
        'Role-based permissions',
        'Approval requirements',
        'Audit logs',
        'Source references',
        'Cost tracking',
        'Failure handling',
        'Human escalation',
        'Rollback or correction procedures',
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Who is this for?',
          answer: 'For companies and teams that want AI to perform real operational workflows across connected systems, not just answer questions.',
        },
        {
          question: 'How do we work?',
          answer: "If you don't know how this helps, we do a meeting to understand your business. If you already know what you want, then ignore this question :)",
        },
        {
          question: 'What are the prices?',
          answer: 'We are defintly less than your costs.',
        },
        {
          question: 'What services you are doing?',
          answer: 'Workflow discovery, AI agents, knowledge bases, knowledge graphs, integrations, custom interfaces, deployment, and managed AI operations.',
        },
        {
          question: 'What is the time for each project?',
          answer: 'Most projects start with a 1-2 week strategy phase, then execution time depends on scope.',
        },
        {
          question: 'Why us?',
          answer: 'Because we focus on operational outcomes, company-specific workflows, governance, and systems that can run in production.',
        },
        {
          question: 'Where we are located?',
          answer: 'We are based in Amman, Jordan, and we work remotely with clients globally.',
        },
      ],
    },
    contact: {
      x: 'X',
      instagram: 'Instagram',
      linkedIn: 'LinkedIn',
    },
  },
  ar: {
    nav: {
      logo: 'أتمت تيكنولوجيس',
      whatWeDo: 'الخدمات',
      articles: 'الحالات',
      sayHi: 'تواصل',
    },
    heading: 'ماذا نبني',
    intro:
      'نأتي إلى داخل العمل نفسه: نفهم كيف يشتغل الفريق، أين يضيع الوقت، وأي جزء ممكن يتحول إلى نظام ذكي يساعد الشركة بدون أن يفقدها السيطرة.',
    offers: [
      {
        id: 'meeting',
        title: 'نفهم شغلك من الداخل',
        description: 'نجلس مع الفريق ونمشي معه خطوة بخطوة. نعرف أين يتكرر العمل، أين تحصل الأخطاء، وأين يمكن للذكاء الاصطناعي أن يعطي أثرًا من أول تجربة.',
        items: [
          'نرسم طريقة العمل الحالية',
          'نحدد أكثر خطوة تستهلك وقتًا',
          'نوضح أين يجب أن يبقى القرار بشريًا',
          'نقترح بداية صغيرة',
          'نحسب الأثر المتوقع',
        ],
      },
      {
        id: 'needs',
        title: 'وكلاء يشتغلون مع الفريق',
        description: 'نبني وكلاء يعرفون شغل الشركة، يقرأون الملفات، يستخدمون الأدوات، يجهزون المطلوب، ويطلبون موافقة الإنسان عندما يكون القرار حساسًا.',
        items: [
          'وكيل لكل نوع عمل',
          'يربط بين الأدوات والملفات',
          'يتوقف عند القرارات الحساسة',
          'يستخدم النموذج الأنسب للمهمة',
          'نختبره ونحسّنه مع الوقت',
        ],
      },
      {
        id: 'for-who',
        title: 'نرتّب معرفة الشركة',
        description: 'بدل أن تبقى المعرفة موزعة بين ملفات ورسائل وأنظمة، نجمعها بطريقة يستطيع الوكيل فهمها والرجوع إليها وقت العمل.',
        items: ['معرفة داخلية مرتبة', 'ربط الملفات ببعضها', 'تكاملات CRM و ERP', 'قواعد بيانات وواجهات API'],
      },
      {
        id: 'calculator',
        title: 'حاسبة التوفير',
        description:
          'أدخل تكلفة التشغيل الحالية، وشاهد تقديرًا بسيطًا لما يمكن أن توفره الأتمتة.',
      },
    ],
    cta: 'تواصل معنا',
    appWebsiteCard: {
      title: 'تحتاج تطبيقًا أو موقعًا؟',
      description: 'نصمم ونبني منتجات رقمية كاملة بتجربة مرتبة وتنفيذ سريع وجودة عالية.',
      ourWork: 'أعمالنا',
    },
    calculator: {
      oneTimeLabel: 'تكلفة تنفيذ أولية',
      monthlyCostsLabel: 'أدخل تكاليفك الشهرية (دولار)',
      savingsLabel: 'التوفير الشهري المتوقع',
      rangeNote: 'تقدير تقريبي مبني على خفض بين 47٪ و 68٪.',
      placeholder: 'مثال: 20000',
    },
    featuredUseCases: [
      {
        slug: 'finance-team-copying-numbers',
        badge: 'حالة من أتمت تيكنولوجيس 1',
        title: 'وكيل للعمليات المالية',
        description: 'يساعد الفريق على إدخال أوامر الشراء بشكل منظم، مع توضيح الاستثناءات وتجهيز الموافقات والبيانات للـERP.',
        cta: 'اكتشف الحالة',
        features: ['تجهيز بيانات ERP', 'موافقات أوضح', 'فحص يدوي أقل'],
        imageSrc: '/Atmet%20Technologies.heic',
        imageAlt: 'دراسة حالة وكيل العمليات المالية من أتمت تيكنولوجيس',
      },
      {
        slug: 'online-store-customer-support',
        badge: 'حالة من أتمت تيكنولوجيس 2',
        title: 'وكيل لخدمة العملاء',
        description: 'يفحص الطلبات والشحن وسياسات الإرجاع قبل أن يجهّز ردًا واضحًا لفريق الدعم.',
        cta: 'اكتشف الحالة',
        features: ['ردود أسرع', 'فحص السياسات', 'تصعيد للموظف المسؤول'],
        imageSrc: '/Baz%20Intelligence%20Prev%20Eng.png',
        imageAlt: 'دراسة حالة وكيل عمليات العملاء من أتمت تيكنولوجيس',
      },
      {
        slug: 'law-firm-knowledge-folders',
        badge: 'حالة من أتمت تيكنولوجيس 3',
        title: 'نظام معرفة داخلي',
        description: 'يساعد المحامين على الوصول إلى الأعمال السابقة بأمان، مع مصادر واضحة وصلاحيات حسب العميل والقضية.',
        cta: 'اكتشف الحالة',
        features: ['مصادر واضحة', 'صلاحيات حسب الدور', 'ربط بين الملفات'],
        imageSrc: '/AI%20Labs%20%2B%20second.png',
        imageAlt: 'دراسة حالة نظام المعرفة القانوني من أتمت تيكنولوجيس',
      },
      {
        slug: 'marketing-team-brand-consistency',
        badge: 'حالة من أتمت تيكنولوجيس 4',
        title: 'نظام لفريق التسويق',
        description: 'ينظم الأفكار وهوية العلامة والموافقات والنشر والتقارير، مع بقاء القرار الإبداعي بيد الفريق.',
        cta: 'اكتشف الحالة',
        features: ['ذاكرة للعلامة', 'متابعة الموافقات', 'تنظيم المحتوى'],
        imageSrc: '/art%20eng.png',
        imageAlt: 'دراسة حالة نظام عمليات التسويق من أتمت تيكنولوجيس',
      },
      {
        slug: 'social-media-agent-that-learned-the-client',
        badge: 'حالة أتمت تيكنولوجيس 6',
        title: 'وكيل تصميم للسوشال ميديا',
        description: 'يتعلم ذوق العميل وطريقة عرض المنتج، ثم يجهز تصاميم منشورات أقرب لهوية العلامة بدل نتائج عامة.',
        cta: 'اقرأ الحالة',
        features: ['يفهم ذوق العميل', 'يجهز تصاميم منشورات', 'مراجعة قبل النشر'],
        imageSrc: '/Article%206.png',
        imageAlt: 'دراسة حالة وكيل التصميم الجرافيكي من أتمت تيكنولوجيس',
      },
    ],
    servicePortfolio: {
      title: 'كيف يتحول ذلك إلى نظام',
      description: 'نبدأ من نقطة واضحة، ثم نوسع الحل حسب ما يثبت قيمته داخل الشركة.',
      groups: [
        {
          title: 'نبدأ بالفهم',
          description: 'نفهم العمل الحقيقي قبل أن نكتب أي كود أو نبني أي وكيل.',
          items: ['مراجعة الخطوات', 'اختيار أول عملية', 'تحديد المخاطر'],
        },
        {
          title: 'نبني الوكيل',
          description: 'نحدد ما يعرفه، ما يستطيع فعله، ومتى يجب أن يرجع للإنسان.',
          items: ['وكلاء ذكاء اصطناعي', 'نماذج مخصصة', 'اختيار النموذج حسب المهمة'],
        },
        {
          title: 'نربطه بأدواتكم',
          description: 'الوكيل لا يعمل وحده. نربطه بالملفات والأنظمة التي يستخدمها الفريق بالفعل.',
          items: ['معرفة داخلية', 'ربط بين البيانات', 'تكاملات الأنظمة', 'واجهة للفريق'],
        },
        {
          title: 'نشغله ونطوره',
          description: 'بعد الإطلاق نراقب النتائج، نصلح ما يحتاج تعديلًا، ونوسع النظام عند الحاجة.',
          items: ['محلي أو سحابي أو هجين', 'متابعة مستمرة', 'تحسينات مع الاستخدام'],
        },
      ],
    },
    governance: {
      title: 'السيطرة تبقى معك',
      description:
        'الذكاء الاصطناعي لا يجب أن يعمل كصندوق مغلق. كل شيء مهم يكون له صلاحية، موافقة، وسجل واضح حتى يعرف الفريق ماذا حدث ولماذا.',
      items: [
        'صلاحيات لكل دور',
        'موافقة قبل أي خطوة حساسة',
        'سجل لكل إجراء',
        'مصادر واضحة',
        'تتبع التكلفة',
        'تنبيه عند الخطأ',
        'تحويل للموظف المسؤول',
        'إمكانية التصحيح',
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        {
          question: 'لمن هذه الخدمة؟',
          answer: 'للشركات التي لديها عمل متكرر، معرفة موزعة، أو فرق تقضي وقتًا طويلًا بين الملفات والأنظمة وتريد من الذكاء الاصطناعي أن يساعد فعليًا في التنفيذ.',
        },
        {
          question: 'كيف نعمل؟',
          answer: 'نبدأ بفهم العمل كما يحدث الآن. بعدها نختار عملية واحدة لها أثر واضح، نبني لها تجربة أولى، ثم نقرر معك كيف نوسعها.',
        },
        {
          question: 'ما هي الأسعار؟',
          answer: 'السعر يعتمد على حجم العمل والأنظمة التي سنربطها، لكن الفكرة دائمًا أن يكون العائد أوضح من التكلفة.',
        },
        {
          question: 'ما الخدمات التي تقدمونها؟',
          answer: 'نفهم طريقة العمل، نبني وكلاء ذكاء اصطناعي، نرتب معرفة الشركة، نربط الأنظمة، ونشغل الحل بطريقة واضحة يمكن تطويرها مع الوقت.',
        },
        {
          question: 'ما المدة الزمنية لكل مشروع؟',
          answer: 'عادة نحتاج أسبوعًا أو أسبوعين لفهم العمل وتحديد البداية، وبعدها تعتمد مدة التنفيذ على حجم النظام وعدد الأدوات المرتبطة.',
        },
        {
          question: 'لماذا نحن؟',
          answer: 'لأننا لا نضيف أداة ذكاء اصطناعي فوق الأدوات الموجودة فقط. نبني طبقة تفهم طريقة عمل شركتك وتساعد الفريق على إنجاز العمل.',
        },
        {
          question: 'أين نحن موجودون؟',
          answer: 'نحن مقرّنا في عمّان، الأردن، ونعمل عن بُعد مع عملاء حول العالم.',
        },
      ],
    },
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
}

export default function WhatWeDoPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null)
  const [monthlyCostsInput, setMonthlyCostsInput] = useState('')
  const [activeFeaturedUseCaseIndex, setActiveFeaturedUseCaseIndex] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', mediaQuery.matches)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [])

  const switchLanguage = (nextLanguage: Language) => {
    setActiveFeaturedUseCaseIndex(0)
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

  const isArabic = language === 'ar'
  const t = content[language]
  const featuredUseCases = t.featuredUseCases.filter((useCase) => visibleFeaturedUseCaseSlugs.has(useCase.slug))
  const activeFeaturedUseCase = featuredUseCases[activeFeaturedUseCaseIndex] ?? featuredUseCases[0]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'
  const monthlyCosts = Number(monthlyCostsInput.replace(/,/g, '').trim())
  const hasValidMonthlyCosts = Number.isFinite(monthlyCosts) && monthlyCosts > 0
  const minSavings = hasValidMonthlyCosts ? monthlyCosts * 0.47 : 0
  const maxSavings = hasValidMonthlyCosts ? monthlyCosts * 0.68 : 0
  const oneTimePayment = hasValidMonthlyCosts ? monthlyCosts * 0.5 : 0
  const currencyFormatter = new Intl.NumberFormat(isArabic ? 'ar-JO' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
  const offersById = Object.fromEntries(t.offers.map((offer) => [offer.id, offer])) as Record<string, Offer>
  const leftColumnOffers = [offersById.meeting, offersById['for-who']].filter(Boolean)
  const rightColumnOffers = [offersById.needs, offersById.calculator].filter(Boolean)

  useEffect(() => {
    if (!featuredUseCases.length) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveFeaturedUseCaseIndex((current) => (current + 1) % featuredUseCases.length)
    }, 4200)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [featuredUseCases.length])

  const renderOfferCard = (offer: Offer, variant: 'featured' | 'default' | 'compact' = 'default') => {
    const cardPaddingClass =
      variant === 'featured' ? 'p-6' : variant === 'compact' ? 'p-4' : 'p-5'
    const titleClass =
      variant === 'compact' ? 'text-lg leading-6' : 'text-xl leading-7'
    const isCalculatorCard = offer.id === 'calculator'

    return (
      <article
        key={offer.id}
        className={`flex h-full flex-col rounded-xl bg-site-gray-surface dark:bg-white/[0.045] ${cardPaddingClass} ${textAlignClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className={`${titleClass} font-medium text-black dark:text-white`}>{offer.title}</h2>
          {offer.price ? <p className="text-sm font-light text-black/50 dark:text-white/45">{offer.price}</p> : null}
        </div>

        {offer.description ? <p className="mt-3 text-base leading-6 font-light text-black/65 dark:text-white/62">{offer.description}</p> : null}

        {!isCalculatorCard && offer.items ? (
          <div className="mt-4 space-y-2">
            {offer.items.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm leading-5 font-light text-black/70 dark:text-white/66">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-md bg-[#3b9eff] text-[11px] text-white">
                  ✓
                </span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        ) : null}

        {isCalculatorCard ? (
          <div className="mt-4 space-y-3">
            <div className="text-sm leading-5 font-light text-black/65 dark:text-white/62">
              <p>{t.calculator.oneTimeLabel}: {hasValidMonthlyCosts ? currencyFormatter.format(oneTimePayment) : '-'}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black/75 dark:text-white/72">{t.calculator.monthlyCostsLabel}</label>
              <input
                type="number"
                min={0}
                step={100}
                value={monthlyCostsInput}
                onChange={(event) => setMonthlyCostsInput(event.target.value)}
                placeholder={t.calculator.placeholder}
                className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/35 dark:border-white/10 dark:bg-white/8 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/25"
                dir="ltr"
              />
            </div>
            <div className="rounded-md bg-site-gray-surface px-3 py-2 dark:bg-white/8">
              <p className="text-sm font-medium text-black/80 dark:text-white/78">{t.calculator.savingsLabel}</p>
              <p className="mt-1 text-base font-medium text-black dark:text-white">
                {hasValidMonthlyCosts
                  ? `${currencyFormatter.format(minSavings)} - ${currencyFormatter.format(maxSavings)}`
                  : '-'}
              </p>
              <p className="mt-1 text-xs font-light text-black/55 dark:text-white/45">{t.calculator.rangeNote}</p>
            </div>
          </div>
        ) : (
          <div className={`mt-5 flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
            <Link href={contactHref} className="inline-flex h-7 items-center rounded-md bg-black px-2 py-0 text-xs font-medium text-white transition-[background-color,transform] duration-200 hover:bg-black/85 active:scale-[0.96] dark:bg-white dark:text-black dark:hover:bg-white/90">
              {t.cta}
            </Link>
          </div>
        )}
      </article>
    )
  }

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`flex min-h-screen flex-col bg-white px-6 pt-16 pb-40 text-black sm:px-8 sm:pb-32 dark:bg-[#181615] dark:text-white ${isArabic ? ibmArabic.className : ''}`}
    >
      <TopNav
        isArabic={isArabic}
        logo={t.nav.logo}
        services={t.nav.whatWeDo}
        articles={t.nav.articles}
        sayHi={t.nav.sayHi}
        language={language}
        onLanguageToggle={() => {
          switchLanguage(language === 'en' ? 'ar' : 'en')
        }}
        homeHref={homeHref}
        servicesHref={servicesHref}
        articlesHref={articlesHref}
        contactHref={contactHref}
      />

      <section className="mx-auto mt-4 w-full max-w-2xl">
        <h1 className={`text-xl leading-6 font-medium tracking-normal text-black dark:text-white ${textAlignClass}`}>{t.heading}</h1>
        <p className={`mt-3 text-base leading-6 font-light text-black/65 dark:text-white/62 ${textAlignClass}`}>{t.intro}</p>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <article className="overflow-hidden rounded-xl bg-site-gray-surface p-0.5 sm:p-1 dark:bg-white/[0.045]">
          <div className="grid gap-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch">
            <div className={`flex min-w-0 flex-col p-4 sm:p-5 ${textAlignClass}`}>
              <div>
                <div className="flex justify-start">
                  <span className="inline-flex rounded-md bg-[#3b9eff] px-2 py-1 text-sm font-medium text-white">
                    {activeFeaturedUseCase.badge}
                  </span>
                </div>
                <h2 className="mt-3 text-xl leading-6 font-medium tracking-normal text-black text-balance dark:text-white">{activeFeaturedUseCase.title}</h2>
                <p className="mt-2 text-base leading-5 font-light text-black/65 text-pretty dark:text-white/62">{activeFeaturedUseCase.description}</p>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex justify-start">
                  <Link
                    href={`${articlesHref}/${activeFeaturedUseCase.slug}`}
                    className="inline-flex h-7 items-center rounded-md bg-black px-2 py-0 text-xs font-medium text-white transition-[background-color,transform] duration-200 hover:bg-black/85 active:scale-[0.96] dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    {activeFeaturedUseCase.cta}
                  </Link>
                </div>
                <div className="mt-4 flex flex-wrap justify-start gap-1.5">
                  {activeFeaturedUseCase.features.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70 dark:bg-white/10 dark:text-white/62"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div dir="ltr" className="relative min-h-[240px] overflow-hidden rounded-lg md:min-h-[360px]">
              <Image
                src={activeFeaturedUseCase.imageSrc}
                alt={activeFeaturedUseCase.imageAlt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </article>

        <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            {leftColumnOffers.map((offer) =>
              renderOfferCard(offer, offer.id === 'meeting' ? 'featured' : 'compact'),
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {rightColumnOffers.map((offer) =>
              renderOfferCard(offer, offer.id === 'needs' ? 'default' : 'compact'),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <div className={textAlignClass}>
          <h2 className="text-xl leading-6 font-medium tracking-normal text-black dark:text-white">{t.servicePortfolio.title}</h2>
          <p className="mt-2 text-base leading-6 font-light text-black/65 dark:text-white/62">{t.servicePortfolio.description}</p>
        </div>
        <div className="mt-3 grid gap-2.5 md:grid-cols-2">
          {t.servicePortfolio.groups.map((group) => (
            <article key={group.title} className={`rounded-xl bg-site-gray-surface p-4 dark:bg-white/[0.045] ${textAlignClass}`}>
              <h3 className="text-lg leading-6 font-medium text-black dark:text-white">{group.title}</h3>
              <p className="mt-2 text-sm leading-5 font-light text-black/65 dark:text-white/62">{group.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70 dark:bg-white/10 dark:text-white/62"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <article className={`rounded-xl bg-site-gray-surface p-5 dark:bg-white/[0.045] ${textAlignClass}`}>
          <h2 className="text-xl leading-6 font-medium tracking-normal text-black dark:text-white">{t.governance.title}</h2>
          <p className="mt-3 text-base leading-6 font-light text-black/65 dark:text-white/62">{t.governance.description}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.governance.items.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm leading-5 font-light text-black/70 dark:text-white/66">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-md bg-black text-[11px] text-white dark:bg-white dark:text-black">
                  ✓
                </span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <h2 className={`text-xl leading-6 font-medium tracking-normal text-black dark:text-white ${textAlignClass}`}>{t.faq.title}</h2>
        <div className="mt-2 grid gap-2">
          {t.faq.items.map((item, index) => {
            const faqId = `${language}-faq-${index}`
            const isOpen = openFaqItem === faqId

            return (
              <article key={item.question} className="rounded-xl bg-site-gray-surface dark:bg-white/[0.045]">
                <button
                  type="button"
                  onClick={() => setOpenFaqItem((current) => (current === faqId ? null : faqId))}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-base leading-5 font-medium text-black dark:text-white ${textAlignClass}`}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`size-4 shrink-0 text-black/60 transition-transform duration-300 dark:text-white/55 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={faqId}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden px-3 pb-2.5">
                    <p className={`text-sm leading-5 font-light text-black/65 dark:text-white/62 ${textAlignClass}`}>{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

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
