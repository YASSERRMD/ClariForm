import type { Language } from '../i18n/types'

export interface RefinementRequest {
  fieldId: string
  fieldLabel: string
  currentValue: string
  fieldType: string
  language: Language
}

export interface RefinementResponse {
  refinedValue: string
  source: 'nano' | 'fallback'
}

export const SENSITIVE_FIELDS = ['emirates-id', 'mobile', 'passport', 'trade-license']

export function isSensitiveField(fieldId: string): boolean {
  return SENSITIVE_FIELDS.some((sensitive) =>
    fieldId.toLowerCase().includes(sensitive.toLowerCase())
  )
}
