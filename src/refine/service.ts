import type { RefinementRequest, RefinementResponse } from './types'
import { isSensitiveField } from './types'
import type { NanoAdapter } from '../nano/adapter'
import type { Language } from '../i18n/types'

function buildRefinementPrompt(request: RefinementRequest): string {
  const { fieldLabel, currentValue, language } = request
  const lang = language === 'ar' ? 'Arabic' : 'English'

  return `Refine the following text for the "${fieldLabel}" field in a ${lang} form.
Current value: "${currentValue}"

Provide a clearer, more professional version of this text.
Do not change the meaning. Keep it concise.
Respond in JSON format: { "refinedValue": "..." }`
}

function getFallbackRefinement(request: RefinementRequest): RefinementResponse {
  return {
    refinedValue: request.currentValue,
    source: 'fallback',
  }
}

export async function refineInput(
  request: RefinementRequest,
  adapter: NanoAdapter
): Promise<RefinementResponse> {
  if (isSensitiveField(request.fieldId)) {
    return {
      refinedValue: request.currentValue,
      source: 'fallback',
    }
  }

  if (!adapter.isAvailable()) {
    return getFallbackRefinement(request)
  }

  try {
    const prompt = buildRefinementPrompt(request)
    const response = await adapter.promptJson<{ refinedValue: string }>(prompt)

    return {
      refinedValue: response.refinedValue,
      source: 'nano',
    }
  } catch {
    return getFallbackRefinement(request)
  }
}

export function createRefinementRequest(
  fieldId: string,
  fieldLabel: string,
  currentValue: string,
  fieldType: string,
  language: Language
): RefinementRequest {
  return {
    fieldId,
    fieldLabel,
    currentValue,
    fieldType,
    language,
  }
}
