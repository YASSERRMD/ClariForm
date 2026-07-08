import type { MissingField, MissingInfoResult } from './types'
import type { FormSchema, FieldSchema } from '../schema'
import type { Language } from '../i18n/types'
import { validateField } from '../validation'

function findMissingFields(
  schema: FormSchema,
  values: Record<string, string | boolean | string[]>,
  language: Language
): MissingField[] {
  const missing: MissingField[] = []

  for (const section of schema.sections) {
    for (const field of section.fields) {
      const value = values[field.id]
      const errors = validateField(field, value, language)

      if (errors.length > 0) {
        const isMissing = !value || (Array.isArray(value) && value.length === 0)
        missing.push({
          fieldId: field.id,
          fieldLabel: field.label[language],
          type: isMissing ? 'empty' : 'invalid',
          sectionId: section.id,
          sectionTitle: section.title[language],
        })
      }
    }
  }

  return missing
}

function buildSummary(missingFields: MissingField[], language: Language): string {
  if (missingFields.length === 0) {
    return language === 'ar'
      ? 'جميع الحقول مكتملة'
      : 'All fields are complete'
  }

  const emptyCount = missingFields.filter((f) => f.type === 'empty').length
  const invalidCount = missingFields.filter((f) => f.type === 'invalid').length

  if (language === 'ar') {
    let summary = `يوجد ${missingFields.length} حقول ناقصة`
    if (emptyCount > 0) summary += `: ${emptyCount} فارغة`
    if (invalidCount > 0) summary += `: ${invalidCount} غير صالحة`
    return summary
  }

  let summary = `${missingFields.length} missing fields`
  if (emptyCount > 0) summary += `: ${emptyCount} empty`
  if (invalidCount > 0) summary += `: ${invalidCount} invalid`
  return summary
}

export function detectMissingInfo(
  schema: FormSchema,
  values: Record<string, string | boolean | string[]>,
  language: Language
): MissingInfoResult {
  const missingFields = findMissingFields(schema, values, language)
  const summary = buildSummary(missingFields, language)

  return {
    missingFields,
    totalMissing: missingFields.length,
    summary,
  }
}

export function getNextQuestion(
  missingFields: MissingField[],
  language: Language
): string | null {
  if (missingFields.length === 0) return null

  const next = missingFields[0]
  return language === 'ar'
    ? `يرجى ملء حقل "${next.fieldLabel}"`
    : `Please fill in the "${next.fieldLabel}" field`
}
