import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { Language, translations } from './i18n'

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (typeof translations)[Language]
}

const I18nContext = createContext<I18nContextValue | null>(null)

const LANGUAGE_STORAGE_KEY = 'overlay-kit-language'

const getDefaultLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null
  return stored && (stored === 'en' || stored === 'ko') ? stored : 'en'
}

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getDefaultLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null
    if (stored && (stored === 'en' || stored === 'ko')) {
      setLanguageState(stored)
    }
  }, [])

  const value: I18nContextValue = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
