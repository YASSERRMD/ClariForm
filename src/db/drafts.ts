import Dexie, { type EntityTable } from 'dexie'

export interface Draft {
  id?: number
  formId: string
  values: Record<string, string | boolean | string[]>
  updatedAt: Date
}

const db = new Dexie('ClariFormDB') as Dexie & {
  drafts: EntityTable<Draft, 'id'>
}

db.version(1).stores({
  drafts: '++id, formId, updatedAt',
})

export async function saveDraft(formId: string, values: Record<string, string | boolean | string[]>): Promise<number> {
  const existing = await db.drafts.where('formId').equals(formId).first()
  if (existing && existing.id !== undefined) {
    await db.drafts.update(existing.id, { values, updatedAt: new Date() })
    return existing.id
  }
  return db.drafts.add({ formId, values, updatedAt: new Date() }) as Promise<number>
}

export async function loadDraft(formId: string): Promise<Draft | undefined> {
  return db.drafts.where('formId').equals(formId).first()
}

export async function clearDraft(formId: string): Promise<void> {
  await db.drafts.where('formId').equals(formId).delete()
}

export async function clearAllDrafts(): Promise<void> {
  await db.drafts.clear()
}

export { db }
