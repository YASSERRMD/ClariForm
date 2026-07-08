import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AppShell } from './AppShell'
import { SkipToContent } from './SkipToContent'

describe('accessibility', () => {
  it('renders skip to content link', () => {
    render(<SkipToContent />)
    const link = screen.getByText('Skip to content')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('has semantic header', () => {
    render(<AppShell>Test</AppShell>)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('has semantic main', () => {
    render(<AppShell>Test</AppShell>)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('has semantic footer', () => {
    render(<AppShell>Test</AppShell>)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })
})
