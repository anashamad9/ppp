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
// Without this, they can use a desktop-width viewport and activate the
// two-column build layout, leaving the visitor to pan sideways.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Anas%20Hamad.png" sizes="any" />
        <link rel="icon" href="/Anas%20Hamad.png" type="image/png" />
        <link rel="shortcut icon" href="/Anas%20Hamad.png" />
        <link rel="apple-touch-icon" href="/Anas%20Hamad.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
