import type { FormSchema } from '../schema'
import type { Language } from '../i18n/types'
import { t } from '../i18n/t'

interface FormSelectorProps {
  forms: FormSchema[]
  selectedFormId: string | null
  onSelect: (formId: string) => void
  language: Language
}

export function FormSelector({ forms, selectedFormId, onSelect, language }: FormSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="form-select" className="mb-2 block text-sm font-medium text-gray-700">
        {t('form.select', language)}
      </label>
      <select
        id="form-select"
        value={selectedFormId ?? ''}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">{t('form.select', language)}</option>
        {forms.map((form) => (
          <option key={form.id} value={form.id}>
            {form.title[language]}
          </option>
        ))}
      </select>
    </div>
  )
}
