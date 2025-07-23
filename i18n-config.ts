export const i18n = {
  defaultLocale: "en", // This will be the default when no language preference is detected
  locales: ["en", "ar"],
} as const

export type Locale = (typeof i18n)["locales"][number]