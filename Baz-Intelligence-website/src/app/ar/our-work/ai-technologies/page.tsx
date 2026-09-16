import type { Metadata } from 'next'
import AITechnologiesSoonPage from '../../../(marketing)/our-work/ai-technologies/ai-technologies-soon-page'

const siteName = 'أتمت تيكنولوجيس'
const title = 'أتمت تيكنولوجيس لتقنيات الذكاء الاصطناعي | أتمت تيكنولوجيس'
const description =
  'وكلاء ذكاء اصطناعي آمنون، وأنظمة معرفة، وتكاملات، وبنية نشر لأتمتة سير العمل الحقيقي داخل الشركات.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/our-work/ai-technologies',
    languages: {
      en: '/our-work/ai-technologies',
      ar: '/ar/our-work/ai-technologies',
      'x-default': '/our-work/ai-technologies',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/our-work/ai-technologies',
    siteName,
    title,
    description,
    locale: 'ar_JO',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function ArabicAITechnologiesPage() {
  return <AITechnologiesSoonPage initialLanguage="ar" />
}
