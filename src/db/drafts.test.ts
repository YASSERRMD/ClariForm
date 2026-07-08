import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { saveDraft, loadDraft, clearDraft, db } from './drafts'

describe('draft storage', () => {
  beforeEach(async () => {
    await db.drafts.clear()
  })

  afterEach(async () => {
    await db.drafts.clear()
  })

  it('saves and loads draft', async () => {
    const values = { name: 'John', email: 'john@example.com' }
    await saveDraft('test-form', values)
    const draft = await loadDraft('test-form')
    expect(draft).toBeDefined()
    expect(draft?.formId).toBe('test-form')
    expect(draft?.values).toEqual(values)
  })

  it('updates existing draft', async () => {
    await saveDraft('test-form', { name: 'John' })
    await saveDraft('test-form', { name: 'Jane' })
    const draft = await loadDraft('test-form')
    expect(draft?.values).toEqual({ name: 'Jane' })
  })

  it('clears draft', async () => {
    await saveDraft('test-form', { name: 'John' })
    await clearDraft('test-form')
    const draft = await loadDraft('test-form')
    expect(draft).toBeUndefined()
  })
})
