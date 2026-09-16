import type { Metadata } from 'next'
import AITechnologiesSoonPage from '../../../(marketing)/our-work/ai-technologies/ai-technologies-soon-page'

const siteName = 'Atmet Technologies'
const title = 'Atmet Technologies for AI Technologies | Atmet Technologies'
const description =
  'Secure AI agents, knowledge systems, integrations, and deployment infrastructure for real business workflow automation.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/our-work/ai-technologies',
    languages: {
      en: '/our-work/ai-technologies',
      ar: '/ar/our-work/ai-technologies',
      'x-default': '/our-work/ai-technologies',
    },
  },
  openGraph: {
    type: 'website',
    url: '/our-work/ai-technologies',
    siteName,
    title,
    description,
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function EnglishAITechnologiesPage() {
  return <AITechnologiesSoonPage initialLanguage="en" />
}
