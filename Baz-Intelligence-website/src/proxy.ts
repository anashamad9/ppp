import { NextResponse, type NextRequest } from 'next/server'

const ATMET_AI_HOSTS = new Set(['atmet.pro', 'www.atmet.pro'])
const TECHNOLOGIES_HOSTS = new Set(['technologies.atmet.pro'])

function normalizeHost(host: string | null) {
  return (host ?? '').split(':')[0].toLowerCase()
}

export function proxy(request: NextRequest) {
  const host = normalizeHost(request.headers.get('host'))
  const { pathname } = request.nextUrl

  if (ATMET_AI_HOSTS.has(host)) {
    if (pathname === '/') {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = '/atmetai'

      return NextResponse.rewrite(rewriteUrl)
    }

    if (pathname === '/atmetai') {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'

      return NextResponse.redirect(redirectUrl)
    }
  }

  if (TECHNOLOGIES_HOSTS.has(host) && pathname === '/atmetai') {
    const redirectUrl = new URL('https://atmet.pro', request.url)

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
