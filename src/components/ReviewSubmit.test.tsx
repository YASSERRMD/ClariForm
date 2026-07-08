import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ReviewPage } from './ReviewPage'
import { SubmitSimulation, generateReferenceNumber } from './SubmitSimulation'
import type { FormSchema } from '../schema'

const mockSchema: FormSchema = {
  id: 'test-form',
  title: { en: 'Test Form', ar: 'استمارة اختبار' },
  description: { en: 'Test', ar: 'اختبار' },
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
        },
      ],
    },
  ],
}

describe('ReviewPage', () => {
  it('renders review page', () => {
    render(
      <ReviewPage
        schema={mockSchema}
        values={{ name: 'John' }}
        language="en"
        onEdit={vi.fn()}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByText('Review Form')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', () => {
    const onEdit = vi.fn()
    render(
      <ReviewPage
        schema={mockSchema}
        values={{ name: 'John' }}
        language="en"
        onEdit={onEdit}
        onSubmit={vi.fn()}
      />
    )
    fireEvent.click(screen.getByText('Edit'))
    expect(onEdit).toHaveBeenCalledWith('name')
  })
})

describe('SubmitSimulation', () => {
  it('generates reference number', () => {
    const ref = generateReferenceNumber()
    expect(ref).toMatch(/^CF-/)
  })

  it('shows success screen after submit', () => {
    const onSubmit = vi.fn().mockReturnValue({ success: true, referenceNumber: 'CF-123' })
    render(<SubmitSimulation onSubmit={onSubmit} language="en" />)
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByText('Submitted Successfully')).toBeInTheDocument()
    expect(screen.getByText('CF-123')).toBeInTheDocument()
  })
})
