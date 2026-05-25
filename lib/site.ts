export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://anashamad.com").replace(/\/$/, "")

export const SITE_NAME = "Anas Hamad"
export const SITE_TITLE_EN = "Anas Hamad | AI & Machine Learning Engineer"
export const SITE_TITLE_AR = "أنس حمد | مهندس ذكاء اصطناعي وتعلم آلة"
export const SITE_DESCRIPTION_EN =
  "Official portfolio of Anas Hamad, AI & Machine Learning Engineer. Projects, experience, articles, and contact."
export const SITE_DESCRIPTION_AR =
  "الموقع الرسمي لأنس حمد، مهندس ذكاء اصطناعي وتعلم آلة. الخبرات، المشاريع، المقالات، وطرق التواصل."

export const PERSON_NAME_EN = "Anas Hamad"
export const PERSON_NAME_AR = "أنس حمد"
export const PERSON_NAME_AR_STYLED = "انــــــس حمد"

export const absUrl = (path = "") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
