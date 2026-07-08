import { describe, it, expect } from 'vitest'
import { detectMissingInfo, getNextQuestion } from './service'
import type { FormSchema } from '../schema'

const testSchema: FormSchema = {
  id: 'test-form',
  title: { en: 'Test Form', ar: 'استمارة اختبار' },
  description: { en: 'Test', ar: 'اختبار' },
  sections: [
    {
      id: 'section-1',
      title: { en: 'Section 1', ar: 'القسم 1' },
      fields: [
        {
          id: 'name',
          type: 'text',
          label: { en: 'Name', ar: 'الاسم' },
          required: true,
        },
        {
          id: 'email',
          type: 'text',
          label: { en: 'Email', ar: 'البريد الإلكتروني' },
          required: true,
          pattern: '^[^@]+@[^@]+\\.[^@]+$',
        },
      ],
    },
  ],
}

describe('missing info service', () => {
  it('detects missing required fields', () => {
    const result = detectMissingInfo(testSchema, {}, 'en')
    expect(result.totalMissing).toBe(2)
    expect(result.missingFields[0].type).toBe('empty')
  })

  it('detects invalid required fields', () => {
    const result = detectMissingInfo(testSchema, { name: 'John', email: 'invalid' }, 'en')
    expect(result.totalMissing).toBe(1)
    expect(result.missingFields[0].type).toBe('invalid')
  })

  it('returns zero for complete form', () => {
    const result = detectMissingInfo(testSchema, { name: 'John', email: 'john@example.com' }, 'en')
    expect(result.totalMissing).toBe(0)
  })

  it('generates arabic summary', () => {
    const result = detectMissingInfo(testSchema, {}, 'ar')
    expect(result.summary).toContain('2')
  })

  it('gets next question', () => {
    const result = detectMissingInfo(testSchema, {}, 'en')
    const next = getNextQuestion(result.missingFields, 'en')
    expect(next).toContain('Name')
  })
})
