import type { FormSchema, FieldSchema, SelectFieldSchema, FileChecklistFieldSchema } from '../schema'
import type { Language } from '../i18n/types'

function ReviewFieldValue({ field, value, language }: { field: FieldSchema; value: string | boolean | string[]; language: Language }) {
  if (field.type === 'select') {
    const selectField = field as SelectFieldSchema
    const option = selectField.options.find((o) => o.value === value)
    return <span>{option?.label[language] ?? String(value)}</span>
  }

  if (field.type === 'file-checklist') {
    const checklistField = field as FileChecklistFieldSchema
    const checkedItems = value as string[]
    return (
      <ul className="list-disc pl-4">
        {checklistField.items.map((item) => (
          <li key={item.id} className={checkedItems.includes(item.id) ? 'text-green-600' : 'text-gray-400'}>
            {item.label[language]} {checkedItems.includes(item.id) ? '(checked)' : '(unchecked)'}
          </li>
        ))}
      </ul>
    )
  }

  return <span>{String(value || '-')}</span>
}

export interface ReviewPageProps {
  schema: FormSchema
  values: Record<string, string | boolean | string[]>
  language: Language
  errors?: Record<string, string[]>
  onEdit: (fieldId: string) => void
  onSubmit: () => void
}

export function ReviewPage({ schema, values, language, errors, onEdit, onSubmit }: ReviewPageProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        {language === 'ar' ? 'مراجعة الاستمارة' : 'Review Form'}
      </h2>
      {schema.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">{section.title[language]}</h3>
          {section.fields.map((field) => {
            const value = values[field.id]
            const fieldErrors = errors?.[field.id]
            return (
              <div key={field.id} className="mb-3 flex items-start justify-between border-b border-gray-100 py-2">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{field.label[language]}</div>
                  <div className="mt-1 text-sm text-gray-900">
                    <ReviewFieldValue field={field} value={value} language={language} />
                  </div>
                  {fieldErrors?.map((error) => (
                    <p key={error} className="mt-1 text-xs text-red-500">{error}</p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(field.id)}
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                >
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
              </div>
            )
          })}
        </div>
      ))}
      <button
        type="button"
        onClick={onSubmit}
        className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        {language === 'ar' ? 'إرسال' : 'Submit'}
      </button>
    </div>
  )
}
