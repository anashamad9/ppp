"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/i18n-config"

export function LoginForm({ lang }: { lang: Locale }) {
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const targetPath =
      typeof window !== "undefined" && window.location.hostname === "app.anashamad.com"
        ? "/dashboard"
        : `/${lang}/app/dashboard`

    router.push(targetPath)
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-10 text-foreground">
      <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col items-start gap-3">
        <Image
          src="/Anas%20Hamad.png"
          alt="Anas Hamad"
          width={34}
          height={34}
          priority
          className="h-[34px] w-[34px] rounded-full border border-border object-cover"
        />
        <div className="flex w-full flex-col gap-2">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            className="h-8 rounded-md border-0 bg-muted px-3 text-xs shadow-none ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            className="h-8 rounded-md border-0 bg-muted px-3 text-xs shadow-none ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>
        <Button type="submit" className="h-8 w-full rounded-md text-xs">
          <span>Log in</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </form>
    </main>
  )
}
