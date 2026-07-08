import type { FormSchema } from '../schema'
import { individualProfileForm } from './individual-profile'
import { businessRegistrationForm } from './business-registration'
import { serviceRequestForm } from './service-request'

export const formCatalog: FormSchema[] = [
  individualProfileForm,
  businessRegistrationForm,
  serviceRequestForm,
]

export function getFormById(id: string): FormSchema | undefined {
  return formCatalog.find((form) => form.id === id)
}
