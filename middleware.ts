import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n-config"

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/images/") ||
    pathname.includes(".")
  )
}

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
  return acceptLanguage.includes("ar") ? "ar" : i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname
  const pathname = request.nextUrl.pathname

  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  // Subdomain: build.anashamad.com → rewrite to /en/build
  if (hostname === "build.anashamad.com") {
    const pathSegments = pathname.split("/").filter(Boolean)
    const requestedLocale = i18n.locales.find((locale) => pathSegments[0] === locale)
    const locale = requestedLocale ?? getLocale(request)

    if (pathname === `/${locale}/build`) {
      return NextResponse.next()
    }

    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      return NextResponse.rewrite(new URL(`/${locale}/build`, request.url))
    }

    return NextResponse.rewrite(new URL(`/${locale}/build`, request.url))
  }

  // If it's the root path, redirect to /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url))
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
