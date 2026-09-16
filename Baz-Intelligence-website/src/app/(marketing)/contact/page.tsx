import type { Metadata } from 'next'
import ContactPage from './contact-page'

const siteName = 'Atmet Technologies'
const title = 'Contact | Atmet Technologies'
const description =
  'Contact Atmet Technologies to book a direct meeting or send your project details for a tailored AI implementation scope.'
const previewImage = '/Preview Eng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/contact',
    languages: {
      en: '/contact',
      ar: '/ar/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    type: 'website',
    url: '/contact',
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
        alt: 'Atmet Technologies contact preview',
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

export default function ContactRoute() {
  return <ContactPage initialLanguage="en" />
}
