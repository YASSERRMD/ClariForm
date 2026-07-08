import type { Language } from '../i18n/types'

export interface FieldExplanationRequest {
  fieldId: string
  fieldLabel: string
  fieldType: string
  helpText?: string
  language: Language
}

export interface FieldExplanationResponse {
  explanation: string
  example?: string
  source: 'nano' | 'fallback'
}
