import type { Metadata } from 'next'
import WhatWeDoPage from '../../(marketing)/what-we-do/what-we-do-page'

const siteName = 'أتمت تيكنولوجيس'
const title = 'ماذا نفعل | أتمت تيكنولوجيس'
const description =
  'تعرّف على ما تقدمه أتمت تيكنولوجيس عبر الاستراتيجية وتنفيذ الأنظمة الذكية والتشغيل والنطاقات المخصصة.'
const previewImage = '/Preview arab.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/what-we-do',
    languages: {
      en: '/what-we-do',
      ar: '/ar/what-we-do',
      'x-default': '/what-we-do',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/what-we-do',
    siteName,
    title,
    description,
    locale: 'ar_JO',
    alternateLocale: ['en_US'],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'معاينة صفحة ماذا نفعل في أتمت تيكنولوجيس',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage],
  },
}

export default function ArabicWhatWeDoPage() {
  return <WhatWeDoPage initialLanguage="ar" />
}
