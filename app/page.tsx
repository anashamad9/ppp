"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const userLang = navigator.language.startsWith("ar") ? "ar" : "en"
    router.replace(`/${userLang}`)
  }, [])

  return null
}