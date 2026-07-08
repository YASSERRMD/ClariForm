import { en } from './en'
import { ar } from './ar'
import type { Language } from './types'

type NestedRecord = { [key: string]: string | NestedRecord }

const dictionaries: Record<Language, NestedRecord> = { en, ar }

function getNestedValue(obj: NestedRecord, path: string): string | undefined {
  const keys = path.split('.')
  let current: string | NestedRecord = obj

  for (const key of keys) {
    if (typeof current === 'string') return undefined
    current = current[key]
    if (current === undefined) return undefined
  }

  return typeof current === 'string' ? current : undefined
}

export function t(key: string, lang: Language, params?: Record<string, string | number>): string {
  const value = getNestedValue(dictionaries[lang], key)
  if (value === undefined) return key

  if (params) {
    return Object.entries(params).reduce(
      (result, [paramKey, paramValue]) => result.replace(`{{${paramKey}}}`, String(paramValue)),
      value
    )
  }

  return value
}
