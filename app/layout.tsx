import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SITE_DESCRIPTION_EN, SITE_TITLE_EN, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE_EN,
  description: SITE_DESCRIPTION_EN,
  generator: "v0.dev",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Anas%20Hamad.png",
    shortcut: "/Anas%20Hamad.png",
    apple: "/Anas%20Hamad.png",
  },
}

// Keep Safari and other mobile browsers on the device-width layout viewport.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

// Runs before next-themes so the first paint uses Amman's daytime when
// the visitor has not chosen a theme. An automatic choice is refreshed on reload.
const ammanThemeScript = `
  try {
    var savedTheme = localStorage.getItem('theme');
    var automatic = localStorage.getItem('amman-theme-auto') === 'true';
    if (!savedTheme || automatic) {
      var hour = Number(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Amman', hour: 'numeric', hourCycle: 'h23'
      }).format(new Date()));
      localStorage.setItem('theme', hour >= 6 && hour < 18 ? 'light' : 'dark');
      localStorage.setItem('amman-theme-auto', 'true');
    }
  } catch (_) {}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ammanThemeScript }} />
        <link rel="icon" href="/Anas%20Hamad.png" sizes="any" />
        <link rel="icon" href="/Anas%20Hamad.png" type="image/png" />
        <link rel="shortcut icon" href="/Anas%20Hamad.png" />
        <link rel="apple-touch-icon" href="/Anas%20Hamad.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
