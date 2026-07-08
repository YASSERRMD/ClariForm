import { useState, useCallback } from 'react'
import { AppShell } from './components/AppShell'
import { FormSelector } from './components/FormSelector'
import { FormRenderer } from './components/FormRenderer'
import { useLanguage } from './i18n/LanguageProvider'
import { formCatalog } from './forms/catalog'

function AppContent() {
  const { language } = useLanguage()
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<Record<string, string | boolean | string[]>>({})

  const selectedForm = formCatalog.find((f) => f.id === selectedFormId)

  const handleFormChange = useCallback((fieldId: string, value: string | boolean | string[]) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }))
  }, [])

  const handleFormSelect = useCallback((formId: string) => {
    setSelectedFormId(formId)
    setFormValues({})
  }, [])

  return (
    <div className="py-4">
      <FormSelector
        forms={formCatalog}
        selectedFormId={selectedFormId}
        onSelect={handleFormSelect}
        language={language}
      />
      {selectedForm && (
        <FormRenderer
          schema={selectedForm}
          values={formValues}
          onChange={handleFormChange}
          language={language}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <AppShell>
      <AppContent />
    </AppShell>
  )
}

export default App
