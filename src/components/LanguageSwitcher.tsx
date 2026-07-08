import { useLanguage } from '../i18n/LanguageProvider'
import type { Language } from '../i18n/types'

const languages: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}
