import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '../../src/components/forms/LoginForm'
import * as useLoginHook from '../../src/hooks/useLogin'
import { MemoryRouter } from 'react-router'

vi.mock('../../src/hooks/useLogin', () => ({
  useLogin: vi.fn(),
}))

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  )
}

describe('LoginForm', () => {
  it('renders email and password inputs and submit button', () => {
    vi.mocked(useLoginHook.useLogin).mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue(undefined),
      isPending: false,
    } as unknown as ReturnType<typeof useLoginHook.useLogin>)
    renderWithRouter()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty', async () => {
    vi.mocked(useLoginHook.useLogin).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useLoginHook.useLogin>)
    renderWithRouter()
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('calls mutateAsync with email and password on submit', async () => {
    const mutateAsync = vi.fn().mockResolvedValue(undefined)
    vi.mocked(useLoginHook.useLogin).mockReturnValue({
      mutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useLoginHook.useLogin>)
    renderWithRouter()
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password123' })
    })
  })
})
