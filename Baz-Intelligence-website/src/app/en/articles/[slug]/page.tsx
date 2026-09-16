import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetailPage } from '../../../(marketing)/articles/article-detail-page'
import { articles, getArticle } from '@/lib/articles'

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

  return {
    title: `${article.title} | Atmet Technologies`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
      languages: {
        en: `/articles/${article.slug}`,
        ar: `/ar/articles/${article.slug}`,
        'x-default': `/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: `/articles/${article.slug}`,
      siteName: 'Atmet Technologies',
      title: article.title,
      description: article.excerpt,
      locale: 'en_US',
      alternateLocale: ['ar_JO'],
      images: [{ url: '/Preview Eng.png', width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ['/Preview Eng.png'],
    },
  }
}

export default async function EnglishArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetailPage article={article} initialLanguage="en" />
}
