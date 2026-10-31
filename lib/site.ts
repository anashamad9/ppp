const vercelPreviewUrl =
  process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""

const inferredSiteUrlRaw =
  vercelPreviewUrl ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? "https://anashamad.com" : "") ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://anashamad.com"

const normalizeSiteUrl = (value: string) => {
  const trimmed = value.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return withProtocol.replace(/\/$/, "")
}

export const SITE_URL = normalizeSiteUrl(inferredSiteUrlRaw)
export const SITE_EMAIL = "hi@anashamad.com"

export const SITE_NAME = "Anas Hamad"
export const SITE_TITLE_EN = "Anas Hamad | AI & Machine Learning Engineer"
export const SITE_TITLE_AR = "أنس حمد | مهندس ذكاء اصطناعي وتعلم آلة"
export const SITE_DESCRIPTION_EN =
  "Hey, I'm Anas. I build practical AI things, share what I learn, and write about real projects and experiments."
export const SITE_DESCRIPTION_AR =
  "هلا، أنا أنس. مهندس AI/ML ومطوّر منتجات تقنية. أعمل في ديجيزاج وأبني أتمت، وأكتب عن الذكاء الاصطناعي والمنتجات."

export const PERSON_NAME_EN = "Anas Hamad"
export const PERSON_NAME_AR = "أنس حمد"
export const PERSON_NAME_AR_STYLED = "انــــــس حمد"
export const PERSON_NAME_AR_DISPLAY = "أنـــس حمـــد"

export const absUrl = (path = "") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
