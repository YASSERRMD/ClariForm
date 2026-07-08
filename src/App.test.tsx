import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders ClariForm header', () => {
    render(<App />)
    expect(screen.getByText('ClariForm')).toBeInTheDocument()
  })

  it('renders privacy footer', () => {
    render(<App />)
    expect(screen.getByText(/Your data stays in your browser/)).toBeInTheDocument()
  })
})
