'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import AvatarGroupTooltipDemo from '@/components/shadcn-studio/avatar/avatar-16'
import { TopNav } from '@/components/top-nav'
import { MarketingFooter } from '@/components/marketing-footer'
import { usePathname, useRouter } from 'next/navigation'

type Language = 'en' | 'ar'
type ContactIntent = 'learn' | 'know'
type SelectOption = {
  value: string
  label: string
}
type SelectSection = {
  label?: string
  options: SelectOption[]
}

type ContactCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  title: string
  subtitle: string
  introParagraphs: string[]
  actions: {
    directMeeting: string
    sendEmail: string
  }
  form: {
    title: string
    fullName: string
    companyName: string
    role: string
    roleElse: string
    employees: string
    email: string
    phoneCode: string
    phone: string
    country: string
    searchCountry: string
    intentQuestion: string
    intentLearn: string
    intentKnow: string
    tellUsMore: string
    arabCountriesSection: string
    otherCountriesSection: string
    arabPhoneCodesSection: string
    otherPhoneCodesSection: string
    selectRequired: string
    submit: string
    submitFailed: string
  }
  postSubmit: {
    title: string
    bookMeeting: string
    skip: string
    skippedMessage: string
    backHome: string
  }
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

const STORAGE_KEY = 'baz-language'
const EMAIL_ADDRESS = 'team@atmet.pro'
const CAL_BOOKING_URL = 'https://cal.com/anashamed/intelligence-lab-30-min-meeting'
const ARAB_COUNTRY_CODES = [
  'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MR',
  'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE',
]
const FALLBACK_COUNTRY_CODES = [
  'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BT',
  'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CR',
  'CI', 'HR', 'CU', 'CY', 'CZ', 'CD', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI',
  'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ',
  'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU',
  'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR',
  'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'KP', 'MK', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA',
  'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA',
  'KR', 'SS', 'ES', 'LK', 'SD', 'SR', 'SE', 'CH', 'SY', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'TV',
  'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'YE', 'ZM', 'ZW', 'PS',
]

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const content: Record<Language, ContactCopy> = {
  en: {
    nav: {
      logo: 'Atmet Technologies',
      whatWeDo: 'Services',
      articles: 'Cases',
      sayHi: 'Say Hi',
    },
    title: 'How would you like to continue?',
    subtitle: 'Choose a direct meeting, or send us an email and we will follow up with the right scope.',
    introParagraphs: [
      'We are a team that brings together research, engineering, and product design to build smarter systems and software capable of creating real impact. We do not treat technology as a set of ready-made tools, but as an open space for research, experimentation, and rethinking. We study problems from their roots, test hypotheses, and turn what we learn into products, models, and systems that can be used in the real world.',
      'We believe software deserves better than quick solutions that only work temporarily, and better than products built without a deep understanding of the user or the problem. That is why we care about what sits behind the interface as much as what appears on it: system engineering, experience quality, decision clarity, and the product ability to evolve over time. We do not only want to build more software; we want to help build a better standard for how technology is designed and developed.',
      'Research leads a fundamental part of our work. We explore how artificial intelligence, language models, machine learning, and agentic systems can change the way products are built and companies operate. But we do not stop at theoretical research. We work to turn ideas and experiments into practical applications, whether they are custom systems for companies, internal tools, or new products that can grow and serve more users.',
      'We do not see the future as more separate tools, but as systems that understand context more deeply and fit more naturally with the way people work. This is what we are trying to build: thoughtful, useful technology that can become better over time.',
    ],
    actions: {
      directMeeting: 'Book a direct meeting',
      sendEmail: 'Send email',
    },
    form: {
      title: 'Tell us about your company',
      fullName: 'Full name',
      companyName: 'Company name',
      role: 'Role',
      roleElse: 'Tell us your role',
      employees: 'Number of employees',
      email: 'Email',
      phoneCode: 'Country key',
      phone: 'Phone',
      country: 'Country',
      searchCountry: 'Search country...',
      intentQuestion: 'What best describes your need?',
      intentLearn: 'I want to know what you provide',
      intentKnow: 'I know what I want',
      tellUsMore: 'Tell us more',
      arabCountriesSection: 'Arabic Countries',
      otherCountriesSection: 'All Other Countries',
      arabPhoneCodesSection: 'Arabic Keys',
      otherPhoneCodesSection: 'International Keys',
      selectRequired: 'Please select an option.',
      submit: 'Submit',
      submitFailed: 'Something went wrong while saving your form. Please try again.',
    },
    postSubmit: {
      title: "Form submitted successfully, if you don't want to wait you can pick a meeting now.",
      bookMeeting: 'Book meeting',
      skip: 'Skip',
      skippedMessage: 'Great, we received your details and will contact you soon.',
      backHome: 'Back to home',
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
    title: 'كيف تفضّل المتابعة؟',
    subtitle: 'يمكنك حجز اجتماع مباشر، أو إرسال بريد إلكتروني وسنتواصل معك بالنطاق المناسب.',
    introParagraphs: [
      'نحن فريق يجمع بين البحث والهندسة وتصميم المنتجات لبناء أنظمة وبرمجيات أكثر ذكاءً وقدرةً على إحداث أثر حقيقي. لا نتعامل مع التقنية بوصفها مجموعة أدوات جاهزة، بل مجالًا مفتوحًا للبحث والتجربة وإعادة التفكير. ندرس المشكلات من جذورها، نختبر الفرضيات، ونحوّل ما نتعلّمه إلى منتجات ونماذج وأنظمة يمكن استخدامها في العالم الحقيقي.',
      'نؤمن أن صناعة البرمجيات تستحق أفضل من حلول سريعة تؤدي الغرض مؤقتًا، ومن منتجات تُبنى دون فهم عميق للمستخدم أو المشكلة. لذلك نهتم بما وراء الواجهة بقدر اهتمامنا بما يظهر عليها؛ بهندسة النظام، وجودة التجربة، ووضوح القرارات، وقدرة المنتج على التطور مع مرور الوقت. لا نريد أن نبني المزيد من البرمجيات فحسب، بل أن نشارك في بناء معيار أفضل للطريقة التي تُصمَّم وتُطوَّر بها التقنية.',
      'يقود الجانب البحثي جزءًا أساسيًا من عملنا. نستكشف كيف يمكن للذكاء الاصطناعي، والنماذج اللغوية، وتعلّم الآلة، والأنظمة الوكيلة أن تغيّر طريقة بناء المنتجات وتشغيل الشركات. لكننا لا نتوقف عند البحث النظري؛ بل نعمل على تحويل الأفكار والتجارب إلى تطبيقات عملية، سواء كانت أنظمة مخصصة للشركات، أو أدوات داخلية، أو منتجات جديدة يمكن أن تنمو وتخدم عددًا أكبر من المستخدمين.',
      'نحن لا نرى المستقبل على أنه مزيد من الأدوات المنفصلة، بل أنظمة أكثر فهمًا للسياق، وأكثر انسجامًا مع طريقة عمل الإنسان. وهذا هو ما نحاول بناءه: تقنية مدروسة، مفيدة، وقادرة على أن تصبح أفضل بمرور الوقت.',
    ],
    actions: {
      directMeeting: 'حجز اجتماع مباشر',
      sendEmail: 'إرسال بريد إلكتروني',
    },
    form: {
      title: 'أخبرنا أكثر عن شركتك',
      fullName: 'الاسم الكامل',
      companyName: 'اسم الشركة',
      role: 'الدور الوظيفي',
      roleElse: 'اكتب دورك الوظيفي',
      employees: 'عدد الموظفين',
      email: 'البريد الإلكتروني',
      phoneCode: 'مفتاح الدولة',
      phone: 'رقم الهاتف',
      country: 'الدولة',
      searchCountry: 'ابحث عن الدولة...',
      intentQuestion: 'ما الذي يصف احتياجك بشكل أدق؟',
      intentLearn: 'أريد معرفة ما الذي تقدمونه',
      intentKnow: 'أنا أعرف ما أريده',
      tellUsMore: 'أخبرنا أكثر',
      arabCountriesSection: 'الدول العربية',
      otherCountriesSection: 'باقي الدول',
      arabPhoneCodesSection: 'المفاتيح العربية',
      otherPhoneCodesSection: 'المفاتيح الدولية',
      selectRequired: 'يرجى اختيار قيمة.',
      submit: 'إرسال',
      submitFailed: 'حدث خطأ أثناء حفظ النموذج. يرجى المحاولة مرة أخرى.',
    },
    postSubmit: {
      title: 'تم إرسال النموذج بنجاح، وإذا كنت لا تريد الانتظار يمكنك حجز اجتماع الآن.',
      bookMeeting: 'حجز اجتماع',
      skip: 'تخطي',
      skippedMessage: 'ممتاز، استلمنا بياناتك وسنتواصل معك قريبًا.',
      backHome: 'العودة للرئيسية',
    },
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
}

type CustomSelectProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  sections: SelectSection[]
  isArabic: boolean
  hasError?: boolean
  rootClassName?: string
  triggerClassName?: string
  getTriggerLabel?: (selectedOption: SelectOption | undefined) => string
  searchable?: boolean
  searchPlaceholder?: string
  noResultsText?: string
}

function CustomSelect({
  value,
  onChange,
  placeholder,
  sections,
  isArabic,
  hasError = false,
  rootClassName = '',
  triggerClassName = '',
  getTriggerLabel,
  searchable = false,
  searchPlaceholder = 'Search...',
  noResultsText = 'No results',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = sections.flatMap((section) => section.options).find((option) => option.value === value)
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase(isArabic ? 'ar' : 'en')
  const filteredSections = sections
    .map((section) => ({
      ...section,
      options: section.options.filter((option) =>
        option.label.toLocaleLowerCase(isArabic ? 'ar' : 'en').includes(normalizedQuery),
      ),
    }))
    .filter((section) => section.options.length > 0)
  const visibleSections = searchable ? filteredSections : sections
  const hasVisibleOptions = visibleSections.some((section) => section.options.length > 0)

  const triggerText = selectedOption
    ? (getTriggerLabel ? getTriggerLabel(selectedOption) : selectedOption.label)
    : placeholder

  return (
    <div ref={rootRef} className={`relative ${rootClassName}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) {
            setIsOpen(true)
          }
        }}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget as Node | null
          if (!rootRef.current?.contains(nextTarget)) {
            setIsOpen(false)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false)
            return
          }
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`form-focus-input flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm outline-none transition-[border-color,background-color] duration-120 ease-out ${
          hasError
            ? 'border-red-400'
            : isOpen
              ? 'border-[#3b9eff]'
              : 'border-black/15 hover:border-black/25 focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]'
        } ${triggerClassName}`}
      >
        <span className={selectedOption ? 'text-black' : 'text-black/55'}>
          {triggerText}
        </span>
        <ChevronDown className={`size-4 shrink-0 text-black/55 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        role="listbox"
        aria-hidden={!isOpen}
        className={`absolute z-30 mt-1 w-full overflow-hidden rounded-md border border-black/15 bg-white shadow-sm transition-all duration-200 ${
          isOpen ? 'pointer-events-auto max-h-64 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className={`max-h-64 overflow-y-auto p-1 ${isArabic ? 'text-right' : 'text-left'}`}>
          {searchable ? (
            <div className="px-1 pb-2">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="form-focus-input w-full rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
              />
            </div>
          ) : null}
          {hasVisibleOptions ? visibleSections.map((section) => (
            <div key={section.label ?? 'default-section'} className="pb-1 last:pb-0">
              {section.label ? (
                <p className="px-2 py-1 text-xs font-medium text-black/45">{section.label}</p>
              ) : null}
              {section.options.map((option) => {
                const isSelected = option.value === value
                return (
                  <button
                    key={option.value}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      onChange(option.value)
                      setSearchQuery('')
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isSelected ? 'bg-site-gray-ui text-black' : 'text-black/80 hover:bg-site-gray-ui'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected ? <Check className="size-3.5 text-black/60" /> : null}
                  </button>
                )
              })}
            </div>
          )) : (
            <p className="px-2 py-1.5 text-sm text-black/55">{noResultsText}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const router = useRouter()
  const pathname = usePathname()
  const showForm = false
  const [submitted, setSubmitted] = useState(false)
  const [skippedMeeting, setSkippedMeeting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [intent, setIntent] = useState<ContactIntent>('learn')
  const [fieldErrors, setFieldErrors] = useState({
    role: false,
    employees: false,
    country: false,
  })
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    role: '',
    roleElse: '',
    employees: '',
    email: '',
    phone: '',
    country: '',
    details: '',
  })

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

  const isArabic = language === 'ar'
  const t = content[language]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const aiTechnologiesHref = isArabic ? '/ar/our-work/ai-technologies' : '/en/our-work/ai-technologies'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'
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
  const employeeSections: SelectSection[] = useMemo(
    () => [
      {
        options: [
          { value: '1-8', label: '1-8' },
          { value: '9-20', label: '9-20' },
          { value: '21-50', label: '21-50' },
          { value: '50+', label: '50+' },
        ],
      },
    ],
    [],
  )
  const roleSections: SelectSection[] = useMemo(
    () => [
      {
        options: isArabic
          ? [
              { value: 'founder', label: 'Founder (مؤسس)' },
              { value: 'management', label: 'Managment (الإدارة)' },
              { value: 'engineering', label: 'Eningeering (الهندسة)' },
              { value: 'marketing', label: 'Marketing (التسويق)' },
              { value: 'sales', label: 'Sales (المبيعات)' },
              { value: 'it', label: 'IT (تقنية المعلومات)' },
              { value: 'support', label: 'Support (الدعم)' },
              { value: 'else', label: 'Else (أخرى)' },
            ]
          : [
              { value: 'founder', label: 'Founder' },
              { value: 'management', label: 'Managment' },
              { value: 'engineering', label: 'Eningeering' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
              { value: 'it', label: 'IT' },
              { value: 'support', label: 'Support' },
              { value: 'else', label: 'Else' },
            ],
      },
    ],
    [isArabic],
  )
  const countrySections: SelectSection[] = useMemo(() => {
    let runtimeRegionCodes: string[] = []
    try {
      const supportedValuesOf = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
        .supportedValuesOf
      runtimeRegionCodes = (supportedValuesOf?.('region') ?? []).filter((code) =>
        /^[A-Z]{2}$/.test(code),
      )
    } catch {
      runtimeRegionCodes = []
    }
    const mergedCodes = Array.from(
      new Set([
        ...(runtimeRegionCodes.length > 0 ? runtimeRegionCodes : FALLBACK_COUNTRY_CODES),
        ...ARAB_COUNTRY_CODES,
      ]),
    )
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const toOption = (code: string): SelectOption => ({
      value: code,
      label: displayNames.of(code) ?? code,
    })
    const arabCodeSet = new Set(ARAB_COUNTRY_CODES)
    const arabOptions = ARAB_COUNTRY_CODES
      .filter((code) => mergedCodes.includes(code))
      .map(toOption)
      .sort((a, b) => a.label.localeCompare(b.label, 'en'))
    const otherOptions = mergedCodes
      .filter((code) => !arabCodeSet.has(code))
      .map(toOption)
      .sort((a, b) => a.label.localeCompare(b.label, 'en'))

    return [
      { label: t.form.arabCountriesSection, options: arabOptions },
      { label: t.form.otherCountriesSection, options: otherOptions },
    ]
  }, [t.form.arabCountriesSection, t.form.otherCountriesSection])
  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`flex min-h-screen flex-col bg-white px-6 pt-16 pb-40 sm:px-8 sm:pb-32 dark:bg-[#181615] ${isArabic ? ibmArabic.className : ''}`}
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
        aiTechnologiesHref={aiTechnologiesHref}
        articlesHref={articlesHref}
        contactHref={contactHref}
      />

      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-2xl items-center pt-10">
        <div className={`w-full ${textAlignClass}`}>
          <div className="mb-3 flex justify-start">
            <AvatarGroupTooltipDemo language={language} tooltipClassName={isArabic ? ibmArabic.className : undefined} />
          </div>
          <div className="mt-5 space-y-4 text-base leading-6 font-light text-black/65">
            {t.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center rounded-md bg-black px-2 py-0 text-xs font-medium text-white transition-colors hover:bg-black/85"
            >
              {t.actions.directMeeting}
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex h-7 items-center rounded-md bg-site-gray-ui px-2 py-0 text-xs font-medium text-black transition-colors hover:bg-site-gray-ui"
            >
              {t.actions.sendEmail}
            </a>
          </div>

          <div className={`grid transition-all duration-500 ease-out ${showForm ? 'mt-5 grid-rows-[1fr] overflow-visible opacity-100' : 'mt-0 grid-rows-[0fr] overflow-hidden opacity-0'}`}>
            <div className={showForm ? 'overflow-visible' : 'overflow-hidden'}>
              <form
                onSubmit={async (event) => {
                  event.preventDefault()
                  if (!event.currentTarget.reportValidity()) {
                    return
                  }
                  const nextErrors = {
                    role: formData.role.length === 0,
                    employees: formData.employees.length === 0,
                    country: formData.country.length === 0,
                  }
                  setFieldErrors(nextErrors)
                  if (nextErrors.role || nextErrors.employees || nextErrors.country) {
                    return
                  }
                  setSubmitError('')
                  setIsSubmitting(true)
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        language,
                        intent,
                        fullName: formData.fullName,
                        companyName: formData.companyName,
                        role: formData.role,
                        roleElse: formData.roleElse,
                        employees: formData.employees,
                        email: formData.email,
                        phone: formData.phone,
                        country: formData.country,
                        details: formData.details,
                      }),
                    })

                    if (!response.ok) {
                      const responseBody = (await response.json().catch(() => null)) as
                        | { error?: string }
                        | null
                      throw new Error(responseBody?.error || `Request failed with status ${response.status}`)
                    }

                    setSkippedMeeting(false)
                    setSubmitted(true)
                  } catch (error) {
                    console.error('Failed to submit contact form:', error)
                    setSubmitError(error instanceof Error ? error.message : t.form.submitFailed)
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="preserve-form-borders space-y-3"
              >
                <h2 className="text-base font-medium text-black">{t.form.title}</h2>

                <div className="grid gap-3">
                  <input
                    required
                    value={formData.fullName}
                    onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))}
                    placeholder={t.form.fullName}
                    className="form-focus-input rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
                  />
                  <input
                    required
                    value={formData.companyName}
                    onChange={(event) => setFormData((current) => ({ ...current, companyName: event.target.value }))}
                    placeholder={t.form.companyName}
                    className="form-focus-input rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
                  />
                  <div>
                    <CustomSelect
                      value={formData.role}
                      onChange={(value) => {
                        setFormData((current) => ({
                          ...current,
                          role: value,
                          roleElse: value === 'else' ? current.roleElse : '',
                        }))
                        setFieldErrors((current) => ({ ...current, role: false }))
                      }}
                      placeholder={t.form.role}
                      sections={roleSections}
                      isArabic={isArabic}
                      hasError={fieldErrors.role}
                    />
                    {fieldErrors.role ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                  <div className={`grid overflow-hidden transition-all duration-300 ease-out ${formData.role === 'else' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <input
                        required={formData.role === 'else'}
                        value={formData.roleElse}
                        onChange={(event) => setFormData((current) => ({ ...current, roleElse: event.target.value }))}
                        placeholder={t.form.roleElse}
                        className="form-focus-input w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
                      />
                    </div>
                  </div>
                  <div>
                    <CustomSelect
                      value={formData.employees}
                      onChange={(value) => {
                        setFormData((current) => ({ ...current, employees: value }))
                        setFieldErrors((current) => ({ ...current, employees: false }))
                      }}
                      placeholder={t.form.employees}
                      sections={employeeSections}
                      isArabic={isArabic}
                      hasError={fieldErrors.employees}
                    />
                    {fieldErrors.employees ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                  <input
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t.form.email}
                    type="email"
                    className="form-focus-input rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
                  />
                  <input
                    required
                    value={formData.phone}
                    onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="+962xxxxxxxxx"
                    type="tel"
                    inputMode="tel"
                    dir={isArabic ? 'rtl' : 'ltr'}
                    className={`form-focus-input rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff] ${isArabic ? 'text-right' : 'text-left'}`}
                  />
                  <div>
                    <CustomSelect
                      value={formData.country}
                      onChange={(value) => {
                        setFormData((current) => ({ ...current, country: value }))
                        setFieldErrors((current) => ({ ...current, country: false }))
                      }}
                      placeholder={t.form.country}
                      sections={countrySections}
                      isArabic={isArabic}
                      hasError={fieldErrors.country}
                      searchable
                      searchPlaceholder={t.form.searchCountry}
                      noResultsText={isArabic ? 'لا توجد نتائج' : 'No results found'}
                    />
                    {fieldErrors.country ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-black/75">{t.form.intentQuestion}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIntent('learn')}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${intent === 'learn' ? 'border-[#3b9eff] bg-[#3b9eff] text-white' : 'border-black/15 bg-white text-black hover:bg-white'}`}
                    >
                      {t.form.intentLearn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntent('know')}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${intent === 'know' ? 'border-[#3b9eff] bg-[#3b9eff] text-white' : 'border-black/15 bg-white text-black hover:bg-white'}`}
                    >
                      {t.form.intentKnow}
                    </button>
                  </div>
                </div>

                <div className={`grid overflow-hidden transition-all duration-300 ease-out ${intent === 'know' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <textarea
                      value={formData.details}
                      onChange={(event) => setFormData((current) => ({ ...current, details: event.target.value }))}
                      placeholder={t.form.tellUsMore}
                      className="form-focus-input min-h-24 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-[border-color] duration-120 ease-out focus:!border-[#3b9eff] focus-visible:!border-[#3b9eff]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
                >
                  {isSubmitting ? <Loader2 className="mr-1 size-3.5 animate-spin" /> : null}
                  {t.form.submit}
                </button>
                {submitError ? (
                  <p className="text-sm text-red-500">{submitError}</p>
                ) : null}
              </form>
            </div>
          </div>

          <div className={`grid overflow-hidden transition-all duration-500 ease-out ${submitted ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="rounded-md border border-black/10 bg-site-gray-surface p-3">
                <p className="text-sm font-medium text-black">{t.postSubmit.title}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
                  >
                    {t.postSubmit.bookMeeting}
                  </a>
                  <button
                    type="button"
                    onClick={() => setSkippedMeeting(true)}
                    className="inline-flex items-center rounded-md bg-site-gray-ui px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-site-gray-ui"
                  >
                    {t.postSubmit.skip}
                  </button>
                </div>
                <div className={`grid overflow-hidden transition-all duration-300 ease-out ${skippedMeeting ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-black/65">{t.postSubmit.skippedMessage}</p>
                    <div className="mt-2">
                      <Link
                        href={homeHref}
                        className="inline-flex items-center rounded-md bg-site-gray-ui px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-site-gray-ui"
                      >
                        {t.postSubmit.backHome}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
