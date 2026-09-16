'use client'

import { useCallback, useSyncExternalStore } from 'react'

type Language = 'en' | 'ar'
type LanguageUpdater = Language | ((currentLanguage: Language) => Language)

const LANGUAGE_CHANGE_EVENT = 'baz-language-change'

function readLanguage(storageKey: string, fallbackLanguage: Language): Language {
  if (typeof window === 'undefined') {
    return fallbackLanguage
  }

  const savedLanguage = window.localStorage.getItem(storageKey)
  if (savedLanguage === 'ar' || savedLanguage === 'en') {
    return savedLanguage
  }

  return fallbackLanguage
}

function subscribeToLanguage(storageKey: string, onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      onStoreChange()
    }
  }

  const handleLanguageChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ key?: string }>
    if (!customEvent.detail?.key || customEvent.detail.key === storageKey) {
      onStoreChange()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)
  }
}

export function usePersistedLanguage(initialLanguage: Language, storageKey: string) {
  const language = useSyncExternalStore(
    onStoreChange => subscribeToLanguage(storageKey, onStoreChange),
    () => readLanguage(storageKey, initialLanguage),
    () => initialLanguage
  )

  const setLanguage = useCallback(
    (nextLanguage: LanguageUpdater) => {
      const currentLanguage = readLanguage(storageKey, initialLanguage)
      const resolvedLanguage =
        typeof nextLanguage === 'function' ? nextLanguage(currentLanguage) : nextLanguage

      window.localStorage.setItem(storageKey, resolvedLanguage)
      window.dispatchEvent(new CustomEvent<{ key: string }>(LANGUAGE_CHANGE_EVENT, { detail: { key: storageKey } }))
    },
    [initialLanguage, storageKey]
  )

  return [language, setLanguage] as const
}
