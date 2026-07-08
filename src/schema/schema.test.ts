import { describe, it, expect } from 'vitest'
import { formSchemaSchema } from './validation'
import type { FormSchema } from './types'

const validSchema: FormSchema = {
  id: 'test-form',
  title: { en: 'Test Form', ar: 'استمارة اختبار' },
  description: { en: 'A test form', ar: 'استمارة اختبار' },
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
      ],
    },
  ],
}

describe('form schema validation', () => {
  it('validates correct schema', () => {
    const result = formSchemaSchema.safeParse(validSchema)
    expect(result.success).toBe(true)
  })

  it('rejects invalid schema', () => {
    const invalidSchema = {
      id: 123,
      title: { en: 'Test' },
    }
    const result = formSchemaSchema.safeParse(invalidSchema)
    expect(result.success).toBe(false)
  })

  it('validates text field schema', () => {
    const schema = {
      ...validSchema,
      sections: [
        {
          ...validSchema.sections[0],
          fields: [
            {
              id: 'email',
              type: 'text',
              label: { en: 'Email', ar: 'البريد الإلكتروني' },
              required: true,
              minLength: 5,
              maxLength: 100,
            },
          ],
        },
      ],
    }
    const result = formSchemaSchema.safeParse(schema)
    expect(result.success).toBe(true)
  })

  it('validates select field schema', () => {
    const schema = {
      ...validSchema,
      sections: [
        {
          ...validSchema.sections[0],
          fields: [
            {
              id: 'country',
              type: 'select',
              label: { en: 'Country', ar: 'الدولة' },
              required: true,
              options: [
                { value: 'uae', label: { en: 'UAE', ar: 'الإمارات' } },
                { value: 'ksa', label: { en: 'Saudi Arabia', ar: 'السعودية' } },
              ],
            },
          ],
        },
      ],
    }
    const result = formSchemaSchema.safeParse(schema)
    expect(result.success).toBe(true)
  })
})
