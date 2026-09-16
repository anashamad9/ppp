'use client'

import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'system'
type ThemeUpdater = Theme | ((currentTheme: Theme) => Theme)

const THEME_CHANGE_EVENT = 'baz-theme-change'

function readTheme(storageKey: string, fallbackTheme: Theme): Theme {
  if (typeof window === 'undefined') {
    return fallbackTheme
  }

  const savedTheme = window.localStorage.getItem(storageKey)
  if (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system') {
    return savedTheme
  }

  return fallbackTheme
}

function subscribeToTheme(storageKey: string, onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      onStoreChange()
    }
  }

  const handleThemeChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ key?: string }>
    if (!customEvent.detail?.key || customEvent.detail.key === storageKey) {
      onStoreChange()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  }
}

export function usePersistedTheme(initialTheme: Theme, storageKey: string) {
  const theme = useSyncExternalStore(
    (onStoreChange) => subscribeToTheme(storageKey, onStoreChange),
    () => readTheme(storageKey, initialTheme),
    () => initialTheme,
  )

  const setTheme = useCallback(
    (nextTheme: ThemeUpdater) => {
      const currentTheme = readTheme(storageKey, initialTheme)
      const resolvedTheme = typeof nextTheme === 'function' ? nextTheme(currentTheme) : nextTheme

      window.localStorage.setItem(storageKey, resolvedTheme)
      window.dispatchEvent(
        new CustomEvent<{ key: string }>(THEME_CHANGE_EVENT, { detail: { key: storageKey } }),
      )
    },
    [initialTheme, storageKey],
  )

  return [theme, setTheme] as const
}
