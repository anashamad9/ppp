import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import enDictionary from "@/dictionaries/en.json"
import arDictionary from "@/dictionaries/ar.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const articleUrls = [
    ...enDictionary.articles.filter((article) => article.enabled).map((article) => ({
      url: `${SITE_URL}/en/articles/${article.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...arDictionary.articles.filter((article) => article.enabled).map((article) => ({
      url: `${SITE_URL}/ar/articles/${article.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articleUrls,
    {
      url: `${SITE_URL}/en/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/ar/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]
}
