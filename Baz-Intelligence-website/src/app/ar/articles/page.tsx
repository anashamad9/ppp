import type { Metadata } from 'next'
import ArticlesPage from '../../(marketing)/articles/articles-page'

const siteName = 'أتمت تيكنولوجيس'
const title = 'دراسات حالة | أتمت تيكنولوجيس'
const description =
  'اطلع على دراسات حالة من أتمت تيكنولوجيس حول وكلاء الذكاء الاصطناعي وأنظمة المعرفة والتكاملات وأتمتة سير العمل التشغيلي.'
const previewImage = '/Preview arab.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/articles',
    languages: {
      en: '/articles',
      ar: '/ar/articles',
      'x-default': '/articles',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/articles',
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
        alt: 'معاينة مقالات أتمت تيكنولوجيس',
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

export default function ArabicArticlesPage() {
  return <ArticlesPage initialLanguage="ar" />
}
