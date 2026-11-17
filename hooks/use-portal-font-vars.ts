"use client"

import { useCallback, useRef, useState, type CSSProperties } from "react"

const FONT_VARS = ["--font-inter", "--font-ibm-plex-sans-arabic"] as const

/**
 * Radix portals render outside the locale wrapper that defines the next/font
 * CSS variables, so `font-sans` / `font-arabic` would fall back to system
 * fonts inside menus and hover cards. Attach `ref` to the trigger and call
 * `capture()` when the popup opens; spread `style` onto the portaled content.
 */
export function usePortalFontVars<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  const capture = useCallback(() => {
    if (!ref.current) return
    const computed = getComputedStyle(ref.current)
    setStyle(Object.fromEntries(FONT_VARS.map((name) => [name, computed.getPropertyValue(name)])) as CSSProperties)
  }, [])

  return { ref, style, capture }
}
