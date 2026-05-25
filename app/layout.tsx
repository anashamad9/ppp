import type React from "react"
import type { Metadata } from "next"
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
    icon: "/anas logo.png",
    shortcut: "/anas logo.png",
    apple: "/anas logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/anas logo.png" sizes="any" />
        <link rel="icon" href="/anas logo.png" type="image/png" />
        <link rel="shortcut icon" href="/anas logo.png" />
        <link rel="apple-touch-icon" href="/anas logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
