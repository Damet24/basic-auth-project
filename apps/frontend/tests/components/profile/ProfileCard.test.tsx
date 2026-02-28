import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileCard } from '../../../src/components/profile/ProfileCard'

describe('ProfileCard', () => {
  it('renders name, email, id and role', () => {
    render(
      <ProfileCard
        id="user-123"
        name="Jane Doe"
        email="jane@example.com"
        role="USER"
      />,
    )
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('user-123')).toBeInTheDocument()
    expect(screen.getAllByText('USER').length).toBeGreaterThanOrEqual(1)
  })

  it('shows initials from name', () => {
    render(
      <ProfileCard id="1" name="John Doe" email="j@x.com" role="USER" />,
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('shows UNKNOWN when role is empty', () => {
    render(<ProfileCard id="1" email="a@b.com" />)
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument()
  })

  it('uses danger variant for admin role', () => {
    render(
      <ProfileCard id="1" name="Admin" email="admin@x.com" role="admin" />,
    )
    const badge = screen.getByText('ADMIN')
    expect(badge).toHaveClass('bg-red-100')
  })
})
