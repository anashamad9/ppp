import type { Metadata } from "next"

import type { Locale } from "@/i18n-config"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Dashboard Login | Anas Hamad",
  description: "Private dashboard login for Anas Hamad.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/Anas%20Hamad.png",
    shortcut: "/Anas%20Hamad.png",
    apple: "/Anas%20Hamad.png",
  },
}

export default async function AppLoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  return <LoginForm lang={langParam as Locale} />
}
