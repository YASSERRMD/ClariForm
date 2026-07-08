import type { ValidationError } from './types'
import { createValidationError } from './types'
import type { FieldSchema, TextFieldSchema, DateFieldSchema } from '../schema'
import type { Language } from '../i18n/types'
import { t } from '../i18n/t'

export function validateRequired(
  fieldId: string,
  value: string | boolean | string[] | undefined,
  language: Language
): ValidationError | null {
  if (value === undefined || value === '' || value === false) {
    return createValidationError(fieldId, t('validation.required', language), 'required')
  }
  if (Array.isArray(value) && value.length === 0) {
    return createValidationError(fieldId, t('validation.required', language), 'required')
  }
  return null
}

export function validatePattern(
  fieldId: string,
  value: string,
  pattern: string,
  language: Language
): ValidationError | null {
  if (!value) return null
  const regex = new RegExp(pattern)
  if (!regex.test(value)) {
    return createValidationError(fieldId, t('validation.invalidFormat', language), 'pattern')
  }
  return null
}

export function validateMinLength(
  fieldId: string,
  value: string,
  minLength: number,
  language: Language
): ValidationError | null {
  if (!value) return null
  if (value.length < minLength) {
    return createValidationError(
      fieldId,
      t('validation.minLength', language, { min: minLength }),
      'minLength'
    )
  }
  return null
}

export function validateMaxLength(
  fieldId: string,
  value: string,
  maxLength: number,
  language: Language
): ValidationError | null {
  if (!value) return null
  if (value.length > maxLength) {
    return createValidationError(
      fieldId,
      t('validation.maxLength', language, { max: maxLength }),
      'maxLength'
    )
  }
  return null
}

export function validateEmiratesId(
  fieldId: string,
  value: string,
  language: Language
): ValidationError | null {
  if (!value) return null
  const pattern = '^784-[0-9]{4}-[0-9]{7}-[0-9]$'
  if (!new RegExp(pattern).test(value)) {
    return createValidationError(fieldId, t('validation.invalidEmiratesId', language), 'emiratesId')
  }
  return null
}

export function validateMobile(
  fieldId: string,
  value: string,
  language: Language
): ValidationError | null {
  if (!value) return null
  const pattern = '^\\+971[0-9]{9}$'
  if (!new RegExp(pattern).test(value)) {
    return createValidationError(fieldId, t('validation.invalidMobile', language), 'mobile')
  }
  return null
}

export function validateTradeLicense(
  fieldId: string,
  value: string,
  language: Language
): ValidationError | null {
  if (!value) return null
  const pattern = '^[A-Z0-9]{8}$'
  if (!new RegExp(pattern).test(value)) {
    return createValidationError(fieldId, t('validation.invalidTradeLicense', language), 'tradeLicense')
  }
  return null
}

export function validateDateRange(
  fieldId: string,
  value: string,
  minDate?: string,
  maxDate?: string,
  language: Language = 'en'
): ValidationError | null {
  if (!value) return null
  const date = new Date(value)
  if (minDate && date < new Date(minDate)) {
    return createValidationError(fieldId, t('validation.invalidFormat', language), 'dateRange')
  }
  if (maxDate && date > new Date(maxDate)) {
    return createValidationError(fieldId, t('validation.invalidFormat', language), 'dateRange')
  }
  return null
}

export function validateField(
  field: FieldSchema,
  value: string | boolean | string[] | undefined,
  language: Language
): ValidationError[] {
  const errors: ValidationError[] = []

  if (field.required) {
    const requiredError = validateRequired(field.id, value, language)
    if (requiredError) {
      errors.push(requiredError)
      return errors
    }
  }

  if (field.type === 'text' && typeof value === 'string' && value) {
    const textField = field as TextFieldSchema
    if (textField.pattern) {
      const patternError = validatePattern(field.id, value, textField.pattern, language)
      if (patternError) errors.push(patternError)
    }
    if (textField.minLength) {
      const minLengthError = validateMinLength(field.id, value, textField.minLength, language)
      if (minLengthError) errors.push(minLengthError)
    }
    if (textField.maxLength) {
      const maxLengthError = validateMaxLength(field.id, value, textField.maxLength, language)
      if (maxLengthError) errors.push(maxLengthError)
    }
    if (textField.pattern?.includes('784-')) {
      const emiratesIdError = validateEmiratesId(field.id, value, language)
      if (emiratesIdError) errors.push(emiratesIdError)
    }
    if (textField.pattern?.includes('\\+971')) {
      const mobileError = validateMobile(field.id, value, language)
      if (mobileError) errors.push(mobileError)
    }
    if (textField.pattern?.includes('[A-Z0-9]{8}')) {
      const tradeLicenseError = validateTradeLicense(field.id, value, language)
      if (tradeLicenseError) errors.push(tradeLicenseError)
    }
  }

  if (field.type === 'date' && typeof value === 'string' && value) {
    const dateField = field as DateFieldSchema
    const dateRangeError = validateDateRange(field.id, value, dateField.minDate, dateField.maxDate, language)
    if (dateRangeError) errors.push(dateRangeError)
  }

  return errors
}

export function validateForm(
  fields: FieldSchema[],
  values: Record<string, string | boolean | string[]>,
  language: Language
): ValidationError[] {
  const errors: ValidationError[] = []

  for (const field of fields) {
    const fieldErrors = validateField(field, values[field.id], language)
    errors.push(...fieldErrors)
  }

  return errors
}
