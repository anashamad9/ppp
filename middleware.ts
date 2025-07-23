import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n-config"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const defaultLocale = i18n.defaultLocale

  return matchLocale(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip files in public folder and API routes
  if (
    [
      "/manifest.json",
      "/favicon.ico",
      "/placeholder.svg",
      "/images/business-card.png",
      "/images/card-background.jpeg",
      "/images/profile.jpeg",
      "/placeholder-logo.png",
      "/placeholder-logo.svg",
      "/placeholder-user.jpg",
      "/placeholder.jpg",
      "/placeholder.svg",
      // Add other public files here
    ].includes(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/")
  ) {
    return
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale (including root path)
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // Handle root path specifically
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    // Handle other paths without locale
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|placeholder).*)"],
}
