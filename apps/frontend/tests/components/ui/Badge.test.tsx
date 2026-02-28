import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../../../src/components/ui/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Admin</Badge>)
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('applies variant class for danger', () => {
    render(<Badge variant="danger">Error</Badge>)
    const el = screen.getByText('Error')
    expect(el).toHaveClass('bg-red-100')
  })

  it('applies default variant when not specified', () => {
    render(<Badge>Default</Badge>)
    const el = screen.getByText('Default')
    expect(el).toHaveClass('bg-gray-200')
  })
})
