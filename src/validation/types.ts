export interface ValidationError {
  fieldId: string
  message: string
  type: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

export function createValidationError(fieldId: string, message: string, type: string): ValidationError {
  return { fieldId, message, type }
}

export function createValidationResult(errors: ValidationError[]): ValidationResult {
  return {
    valid: errors.length === 0,
    errors,
  }
}
