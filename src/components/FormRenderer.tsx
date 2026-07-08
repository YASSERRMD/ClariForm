import type { FieldSchema, FormSchema, SelectFieldSchema, FileChecklistFieldSchema } from '../schema'
import type { Language } from '../i18n/types'
import { t } from '../i18n/t'

interface FieldRendererProps {
  field: FieldSchema
  value: string | boolean | string[]
  onChange: (fieldId: string, value: string | boolean | string[]) => void
  language: Language
  errors?: string[]
}

function TextField({ field, value, onChange, language, errors }: FieldRendererProps & { value: string }) {
  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="mb-1 block text-sm font-medium text-gray-700">
        {field.label[language]}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {field.helpText && (
        <p className="mb-1 text-xs text-gray-500">{field.helpText[language]}</p>
      )}
      <input
        id={field.id}
        type="text"
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder={field.placeholder?.[language]}
      />
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
      ))}
    </div>
  )
}

function NumberField({ field, value, onChange, language, errors }: FieldRendererProps & { value: string }) {
  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="mb-1 block text-sm font-medium text-gray-700">
        {field.label[language]}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {field.helpText && (
        <p className="mb-1 text-xs text-gray-500">{field.helpText[language]}</p>
      )}
      <input
        id={field.id}
        type="number"
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        min={field.min}
        max={field.max}
        step={field.step}
      />
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
      ))}
    </div>
  )
}

function DateField({ field, value, onChange, language, errors }: FieldRendererProps & { value: string }) {
  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="mb-1 block text-sm font-medium text-gray-700">
        {field.label[language]}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {field.helpText && (
        <p className="mb-1 text-xs text-gray-500">{field.helpText[language]}</p>
      )}
      <input
        id={field.id}
        type="date"
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        min={field.minDate}
        max={field.maxDate}
      />
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
      ))}
    </div>
  )
}

function SelectField({ field, value, onChange, language, errors }: FieldRendererProps & { value: string }) {
  const selectField = field as SelectFieldSchema
  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="mb-1 block text-sm font-medium text-gray-700">
        {field.label[language]}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {field.helpText && (
        <p className="mb-1 text-xs text-gray-500">{field.helpText[language]}</p>
      )}
      <select
        id={field.id}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">{t('form.select', language)}</option>
        {selectField.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label[language]}
          </option>
        ))}
      </select>
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
      ))}
    </div>
  )
}

function FileChecklistField({ field, value, onChange, language, errors }: FieldRendererProps & { value: string[] }) {
  const checklistField = field as FileChecklistFieldSchema
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {field.label[language]}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {field.helpText && (
        <p className="mb-1 text-xs text-gray-500">{field.helpText[language]}</p>
      )}
      <div className="space-y-2">
        {checklistField.items.map((item) => (
          <label key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.includes(item.id)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...value, item.id]
                  : value.filter((v) => v !== item.id)
                onChange(field.id, newValue)
              }}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{item.label[language]}</span>
          </label>
        ))}
      </div>
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
      ))}
    </div>
  )
}

export function FieldRenderer({ field, value, onChange, language, errors }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value as string} onChange={onChange} language={language} errors={errors} />
    case 'number':
      return <NumberField field={field} value={value as string} onChange={onChange} language={language} errors={errors} />
    case 'date':
      return <DateField field={field} value={value as string} onChange={onChange} language={language} errors={errors} />
    case 'select':
      return <SelectField field={field} value={value as string} onChange={onChange} language={language} errors={errors} />
    case 'file-checklist':
      return <FileChecklistField field={field} value={value as string[]} onChange={onChange} language={language} errors={errors} />
    default:
      return null
  }
}

interface FormRendererProps {
  schema: FormSchema
  values: Record<string, string | boolean | string[]>
  onChange: (fieldId: string, value: string | boolean | string[]) => void
  language: Language
  errors?: Record<string, string[]>
}

export function FormRenderer({ schema, values, onChange, language, errors }: FormRendererProps) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-gray-900">{schema.title[language]}</h2>
      <p className="mb-6 text-sm text-gray-600">{schema.description[language]}</p>
      {schema.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">{section.title[language]}</h3>
          {section.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={values[field.id] ?? (field.type === 'file-checklist' ? [] : '')}
              onChange={onChange}
              language={language}
              errors={errors?.[field.id]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
