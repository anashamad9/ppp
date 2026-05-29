export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://anashamad.com").replace(/\/$/, "")

export const SITE_NAME = "Anas Hamad"
export const SITE_TITLE_EN = "Anas Hamad | AI & Machine Learning Engineer"
export const SITE_TITLE_AR = "أنس حمد | مهندس ذكاء اصطناعي وتعلم آلة"
export const SITE_DESCRIPTION_EN =
  "Hey, I'm Anas. I build practical AI things, share what I learn, and write about real projects and experiments."
export const SITE_DESCRIPTION_AR =
  "مرحباً، أنا أنس. أبني أشياء عملية بالذكاء الاصطناعي، وبشارك تجاربي ومشاريعي والمقالات اللي بتلخّص اللي بتعلّمته."

export const PERSON_NAME_EN = "Anas Hamad"
export const PERSON_NAME_AR = "أنس حمد"
export const PERSON_NAME_AR_STYLED = "انــــــس حمد"

export const absUrl = (path = "") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
