import { useState } from 'react'
import type { Language } from '../i18n/types'

export interface SubmitResult {
  success: boolean
  referenceNumber?: string
}

interface SubmitSimulationProps {
  onSubmit: () => SubmitResult
  language: Language
}

export function SubmitSimulation({ onSubmit, language }: SubmitSimulationProps) {
  const [result, setResult] = useState<SubmitResult | null>(null)

  const handleSubmit = () => {
    const submitResult = onSubmit()
    setResult(submitResult)
  }

  if (result?.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <div className="mb-2 text-2xl text-green-600">&#10003;</div>
        <h3 className="mb-2 text-lg font-semibold text-green-800">
          {language === 'ar' ? 'تم الإرسال بنجاح' : 'Submitted Successfully'}
        </h3>
        <p className="mb-4 text-sm text-green-700">
          {language === 'ar'
            ? 'تم استلام استماراتك بنجاح'
            : 'Your form has been submitted successfully'}
        </p>
        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-500">
            {language === 'ar' ? 'رقم المرجع' : 'Reference Number'}
          </p>
          <p className="font-mono text-lg font-bold text-gray-900">{result.referenceNumber}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
      >
        {language === 'ar' ? 'إرسال' : 'Submit'}
      </button>
    </div>
  )
}

export function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CF-${timestamp}-${random}`
}
