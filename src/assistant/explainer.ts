import type { FieldExplanationRequest, FieldExplanationResponse } from './types'
import type { NanoAdapter } from '../nano/adapter'
import type { Language } from '../i18n/types'

function buildExplanationPrompt(request: FieldExplanationRequest): string {
  const { fieldLabel, fieldType, helpText, language } = request
  const lang = language === 'ar' ? 'Arabic' : 'English'

  return `Explain what the "${fieldLabel}" field means in a ${lang} form.
Field type: ${fieldType}
${helpText ? `Help text: ${helpText}` : ''}

Provide a clear, concise explanation in ${lang}. Include an example if relevant.
Respond in JSON format: { "explanation": "...", "example": "..." }`
}

function getFallbackExplanation(request: FieldExplanationRequest): FieldExplanationResponse {
  const { helpText, fieldLabel, language } = request

  const fallbackText = helpText ||
    (language === 'ar'
      ? `هذا الحقل مطلوب لـ ${fieldLabel}`
      : `This field is required for ${fieldLabel}`)

  return {
    explanation: fallbackText,
    source: 'fallback',
  }
}

export async function explainField(
  request: FieldExplanationRequest,
  adapter: NanoAdapter
): Promise<FieldExplanationResponse> {
  if (!adapter.isAvailable()) {
    return getFallbackExplanation(request)
  }

  try {
    const prompt = buildExplanationPrompt(request)
    const response = await adapter.promptJson<{ explanation: string; example?: string }>(prompt)

    return {
      explanation: response.explanation,
      example: response.example,
      source: 'nano',
    }
  } catch {
    return getFallbackExplanation(request)
  }
}

export function createExplanationRequest(
  fieldId: string,
  fieldLabel: string,
  fieldType: string,
  helpText: string | undefined,
  language: Language
): FieldExplanationRequest {
  return {
    fieldId,
    fieldLabel,
    fieldType,
    helpText,
    language,
  }
}
