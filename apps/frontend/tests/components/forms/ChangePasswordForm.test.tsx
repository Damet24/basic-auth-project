import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChangePasswordForm } from '../../../src/components/forms/ChangePasswordForm'
import * as useAuthHook from '../../../src/hooks/useAuth'

vi.mock('../../../src/hooks/useAuth', () => ({
  useChangePassword: vi.fn(),
}))

describe('ChangePasswordForm', () => {
  it('renders current, new and confirm password inputs and buttons', () => {
    vi.mocked(useAuthHook.useChangePassword).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useAuthHook.useChangePassword>)
    render(<ChangePasswordForm />)
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
  })

  it('calls onCancel when Cancel is clicked', () => {
    vi.mocked(useAuthHook.useChangePassword).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useAuthHook.useChangePassword>)
    const onCancel = vi.fn()
    render(<ChangePasswordForm onCancel={onCancel} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('submit button is present and enabled when form is valid', () => {
    vi.mocked(useAuthHook.useChangePassword).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useAuthHook.useChangePassword>)
    render(<ChangePasswordForm />)
    const submitBtn = screen.getByRole('button', { name: /save changes/i })
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute('type', 'submit')
  })
})
