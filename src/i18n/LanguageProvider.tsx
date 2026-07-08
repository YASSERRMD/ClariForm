import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Language, Direction } from './types'
import { getDirection } from './types'

interface LanguageContextValue {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.dir = getDirection(lang)
    document.documentElement.lang = lang
  }, [])

  const direction = getDirection(language)

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
