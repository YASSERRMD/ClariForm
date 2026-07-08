import type { Language } from '../i18n/types'

export interface MissingField {
  fieldId: string
  fieldLabel: string
  type: 'empty' | 'invalid'
  sectionId: string
  sectionTitle: string
}

export interface MissingInfoResult {
  missingFields: MissingField[]
  totalMissing: number
  summary: string
}
