import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Anas Hamad - AI & Machine Learning Engineer",
  description: "Portfolio of Anas Hamad, an AI & Machine Learning Engineer based in Amman, Jordan.",
  generator: "v0.dev",
  icons: {
    icon: "/Anos.png",
    shortcut: "/Anos.png",
    apple: "/Anos.png",
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
        <link rel="icon" href="/Anos.png" sizes="any" />
        <link rel="icon" href="/Anos.png" type="image/png" />
        <link rel="shortcut icon" href="/Anos.png" />
        <link rel="apple-touch-icon" href="/Anos.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
