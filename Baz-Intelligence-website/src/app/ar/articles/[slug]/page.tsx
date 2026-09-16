import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetailPage } from '../../../(marketing)/articles/article-detail-page'
import { articles, getArticle, getLocalizedArticle } from '@/lib/articles'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    return {}
  }

  const localizedArticle = getLocalizedArticle(article, 'ar')

  return {
    title: `${localizedArticle.title} | أتمت تيكنولوجيس`,
    description: localizedArticle.excerpt,
    alternates: {
      canonical: `/ar/articles/${article.slug}`,
      languages: {
        en: `/articles/${article.slug}`,
        ar: `/ar/articles/${article.slug}`,
        'x-default': `/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: `/ar/articles/${article.slug}`,
      siteName: 'أتمت تيكنولوجيس',
      title: localizedArticle.title,
      description: localizedArticle.excerpt,
      locale: 'ar_JO',
      alternateLocale: ['en_US'],
      images: [{ url: '/Preview arab.png', width: 1200, height: 630, alt: localizedArticle.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedArticle.title,
      description: localizedArticle.excerpt,
      images: ['/Preview arab.png'],
    },
  }
}

export default async function ArabicArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetailPage article={article} initialLanguage="ar" />
}
