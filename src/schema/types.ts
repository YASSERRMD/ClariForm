import type { Language } from '../i18n/types'

export type LocalizedLabel = Record<Language, string>

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'file-checklist'

export interface BaseFieldSchema {
  id: string
  type: FieldType
  label: LocalizedLabel
  helpText?: LocalizedLabel
  required: boolean
  placeholder?: LocalizedLabel
  validation?: ValidationRules
}

export interface TextFieldSchema extends BaseFieldSchema {
  type: 'text'
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface NumberFieldSchema extends BaseFieldSchema {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export interface DateFieldSchema extends BaseFieldSchema {
  type: 'date'
  minDate?: string
  maxDate?: string
}

export interface SelectFieldSchema extends BaseFieldSchema {
  type: 'select'
  options: { value: string; label: LocalizedLabel }[]
}

export interface FileChecklistFieldSchema extends BaseFieldSchema {
  type: 'file-checklist'
  items: { id: string; label: LocalizedLabel }[]
}

export type FieldSchema =
  | TextFieldSchema
  | NumberFieldSchema
  | DateFieldSchema
  | SelectFieldSchema
  | FileChecklistFieldSchema

export interface ValidationRules {
  required?: boolean
  pattern?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  custom?: string
}

export interface FormSection {
  id: string
  title: LocalizedLabel
  fields: FieldSchema[]
}

export interface FormSchema {
  id: string
  title: LocalizedLabel
  description: LocalizedLabel
  sections: FormSection[]
}
