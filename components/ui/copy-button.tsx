"use client"

import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

type CopyButtonProps = {
  content: string
  onCopy?: () => void
} & React.ComponentProps<typeof Button>

export function CopyButton({ content, onCopy, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      onCopy?.()
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy", error)
    }
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95",
        className
      )}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy"}
      {...props}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
