import { i18n } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { createArticleHeader } from "@/lib/article-header.server"

export const runtime = "nodejs"
export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  const params = await Promise.all(i18n.locales.map(async (lang) => {
    const dict = await getDictionary(lang)
    return dict.articles.filter((article) => article.enabled).flatMap((article) =>
      ["header.svg", "header.png"].map((image) => ({ lang, articleId: String(article.id), image })),
    )
  }))
  return params.flat()
}

export async function GET(_request: Request, { params }: {
  params: Promise<{ lang: string; articleId: string; image: string }>
}) {
  const { lang, articleId, image } = await params
  if (!i18n.locales.includes(lang as (typeof i18n.locales)[number]) || !["header.svg", "header.png"].includes(image)) {
    return new Response("Not found", { status: 404 })
  }
  const dict = await getDictionary(lang as (typeof i18n.locales)[number])
  const article = dict.articles.find((item) => item.enabled && String(item.id) === articleId)
  if (!article) return new Response("Not found", { status: 404 })

  const header = createArticleHeader(article, lang as (typeof i18n.locales)[number])
  const isSvg = image === "header.svg"
  return new Response(isSvg ? header.svg : new Uint8Array(header.png()), {
    headers: {
      "Content-Type": isSvg ? "image/svg+xml; charset=utf-8" : "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=86400, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
