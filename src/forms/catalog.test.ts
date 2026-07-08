import { describe, it, expect } from 'vitest'
import { formSchemaSchema } from '../schema'
import { formCatalog, getFormById } from './catalog'

describe('form catalog', () => {
  it('contains three forms', () => {
    expect(formCatalog).toHaveLength(3)
  })

  it('all forms validate against schema', () => {
    for (const form of formCatalog) {
      const result = formSchemaSchema.safeParse(form)
      expect(result.success).toBe(true)
    }
  })

  it('getFormById returns correct form', () => {
    const form = getFormById('individual-profile')
    expect(form).toBeDefined()
    expect(form?.id).toBe('individual-profile')
  })

  it('getFormById returns undefined for unknown id', () => {
    const form = getFormById('unknown-form')
    expect(form).toBeUndefined()
  })

  it('all forms have bilingual labels', () => {
    for (const form of formCatalog) {
      expect(form.title.en).toBeDefined()
      expect(form.title.ar).toBeDefined()
      expect(form.description.en).toBeDefined()
      expect(form.description.ar).toBeDefined()
    }
  })
})
