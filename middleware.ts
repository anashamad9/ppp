import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n-config"

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
  return acceptLanguage.includes("ar") ? "ar" : i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname
  const pathname = request.nextUrl.pathname

  // Subdomain: build.anashamad.com → rewrite to /en/build
  if (hostname === "build.anashamad.com") {
    const locale = getLocale(request)
    if (pathname === `/${locale}/build`) {
      return NextResponse.next()
    }
    return NextResponse.rewrite(new URL(`/${locale}/build`, request.url))
  }

  // Skip files in public folder and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".")
  ) {
    return
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
  // Match all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}
