import { z } from 'zod'

export const localizedLabelSchema = z.object({
  en: z.string(),
  ar: z.string(),
})

export const baseFieldSchema = z.object({
  id: z.string(),
  label: localizedLabelSchema,
  helpText: localizedLabelSchema.optional(),
  required: z.boolean(),
  placeholder: localizedLabelSchema.optional(),
})

export const textFieldSchema = baseFieldSchema.extend({
  type: z.literal('text'),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
})

export const numberFieldSchema = baseFieldSchema.extend({
  type: z.literal('number'),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
})

export const dateFieldSchema = baseFieldSchema.extend({
  type: z.literal('date'),
  minDate: z.string().optional(),
  maxDate: z.string().optional(),
})

export const selectOptionSchema = z.object({
  value: z.string(),
  label: localizedLabelSchema,
})

export const selectFieldSchema = baseFieldSchema.extend({
  type: z.literal('select'),
  options: z.array(selectOptionSchema),
})

export const fileChecklistItemSchema = z.object({
  id: z.string(),
  label: localizedLabelSchema,
})

export const fileChecklistFieldSchema = baseFieldSchema.extend({
  type: z.literal('file-checklist'),
  items: z.array(fileChecklistItemSchema),
})

export const fieldSchemaSchema = z.discriminatedUnion('type', [
  textFieldSchema,
  numberFieldSchema,
  dateFieldSchema,
  selectFieldSchema,
  fileChecklistFieldSchema,
])

export const formSectionSchema = z.object({
  id: z.string(),
  title: localizedLabelSchema,
  fields: z.array(fieldSchemaSchema),
})

export const formSchemaSchema = z.object({
  id: z.string(),
  title: localizedLabelSchema,
  description: localizedLabelSchema,
  sections: z.array(formSectionSchema),
})
