"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  const applyTheme = useCallback((nextTheme: ResolvedTheme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    document.documentElement.classList.toggle("light", nextTheme === "light")
    document.documentElement.style.colorScheme = nextTheme
    setResolvedTheme(nextTheme)
  }, [])

  useEffect(() => {
    // The inline script in app/layout.tsx sets the Amman-based theme before paint.
    const initialTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setThemeState(initialTheme)
    setResolvedTheme(initialTheme)
  }, [])

  useEffect(() => {
    if (theme !== "system") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => applyTheme(getSystemTheme())
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [theme, applyTheme])

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme === "system" ? getSystemTheme() : nextTheme)
    setThemeState(nextTheme)
  }, [applyTheme])

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
