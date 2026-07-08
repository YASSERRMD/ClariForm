export type Language = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

export function getDirection(lang: Language): Direction {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
