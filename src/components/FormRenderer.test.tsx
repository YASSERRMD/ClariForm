import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FormRenderer } from './FormRenderer'
import type { FormSchema } from '../schema'

const mockSchema: FormSchema = {
  id: 'test-form',
  title: { en: 'Test Form', ar: 'استمارة اختبار' },
  description: { en: 'A test form', ar: 'استمارة اختبار' },
  sections: [
    {
      id: 'section-1',
      title: { en: 'Section 1', ar: 'القسم 1' },
      fields: [
        {
          id: 'name',
          type: 'text',
          label: { en: 'Name', ar: 'الاسم' },
          required: true,
          helpText: { en: 'Enter your name', ar: 'أدخل اسمك' },
        },
        {
          id: 'country',
          type: 'select',
          label: { en: 'Country', ar: 'الدولة' },
          required: true,
          options: [
            { value: 'uae', label: { en: 'UAE', ar: 'الإمارات' } },
            { value: 'ksa', label: { en: 'Saudi Arabia', ar: 'السعودية' } },
          ],
        },
      ],
    },
  ],
}

describe('FormRenderer', () => {
  it('renders form title', () => {
    render(
      <FormRenderer
        schema={mockSchema}
        values={{}}
        onChange={vi.fn()}
        language="en"
      />
    )
    expect(screen.getByText('Test Form')).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(
      <FormRenderer
        schema={mockSchema}
        values={{}}
        onChange={vi.fn()}
        language="en"
      />
    )
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Country/)).toBeInTheDocument()
  })

  it('calls onChange when field value changes', () => {
    const onChange = vi.fn()
    render(
      <FormRenderer
        schema={mockSchema}
        values={{}}
        onChange={onChange}
        language="en"
      />
    )
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John' } })
    expect(onChange).toHaveBeenCalledWith('name', 'John')
  })

  it('renders arabic labels in rtl mode', () => {
    render(
      <FormRenderer
        schema={mockSchema}
        values={{}}
        onChange={vi.fn()}
        language="ar"
      />
    )
    expect(screen.getAllByText('استمارة اختبار').length).toBeGreaterThan(0)
    expect(screen.getByLabelText(/الاسم/)).toBeInTheDocument()
  })
})
