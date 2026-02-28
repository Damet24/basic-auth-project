import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from '../../../src/components/ui/Input'

describe('Input', () => {
  it('renders label and input with correct id', () => {
    render(<Input label="Email" inputId="email" error={undefined} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email')
  })

  it('shows error message when error is passed', () => {
    render(<Input label="Name" inputId="name" error="Name is required" />)
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('does not show error element when error is undefined', () => {
    render(<Input label="Name" inputId="name" error={undefined} />)
    expect(screen.queryByText(/required/)).not.toBeInTheDocument()
  })
})
