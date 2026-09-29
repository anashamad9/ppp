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

// Set the first paint from Amman time. Theme changes stay in memory until reload.
const ammanThemeScript = `
  try {
    var hour = Number(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Amman', hour: 'numeric', hourCycle: 'h23'
    }).format(new Date()));
    var isDark = hour < 6 || hour >= 18;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (_) {}
  try {
    localStorage.removeItem('theme');
    localStorage.removeItem('amman-theme-auto');
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
