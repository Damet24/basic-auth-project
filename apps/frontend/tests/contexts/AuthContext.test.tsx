import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../../src/contexts/AuthContext'
import { SESSION_KEY } from '../../src/constants/api'

function Consumer() {
  const { session, isAuthenticated, logout } = useAuth()
  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="token">{session?.access_token ?? 'none'}</span>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.removeItem(SESSION_KEY)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('useAuth throws when used outside AuthProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Consumer />)).toThrow('useAuth must be used within an AuthProvider')
  })

  it('provides isAuthenticated false when no session', () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    expect(screen.getByTestId('token')).toHaveTextContent('none')
  })

  it('restores session from localStorage when valid', () => {
    const session = {
      access_token: 'stored-token',
      expires_in: 3600,
      expires_at: Date.now() + 3600000,
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token')
  })

  it('logout clears session and isAuthenticated becomes false', () => {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        access_token: 't',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      }),
    )
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    act(() => {
      screen.getByRole('button', { name: /logout/i }).click()
    })
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    expect(localStorage.getItem(SESSION_KEY)).toBeNull()
  })
})
