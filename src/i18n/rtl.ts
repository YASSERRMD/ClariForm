import { useLanguage } from './LanguageProvider'

export function useRtlClass(baseClass: string): string {
  const { direction } = useLanguage()
  return direction === 'rtl' ? `${baseClass} rtl` : baseClass
}

export function rtlClass(ltrClass: string, rtlClass: string, direction: 'ltr' | 'rtl'): string {
  return direction === 'rtl' ? rtlClass : ltrClass
}
