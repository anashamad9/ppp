import type { Metadata } from 'next'
import ArticlesPage from './articles-page'

const siteName = 'Atmet Technologies'
const title = 'Case Studies | Atmet Technologies'
const description =
  'Read Atmet Technologies case studies on AI agents, knowledge systems, integrations, and operational workflow automation.'
const previewImage = '/Preview Eng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/articles',
    languages: {
      en: '/articles',
      ar: '/ar/articles',
      'x-default': '/articles',
    },
  },
  openGraph: {
    type: 'website',
    url: '/articles',
    siteName,
    title,
    description,
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'Atmet Technologies articles preview',
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

export default function ArticlesRoute() {
  return <ArticlesPage initialLanguage="en" />
}
