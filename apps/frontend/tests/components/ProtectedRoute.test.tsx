import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProtectedRoute } from '../../src/components/auth/ProtectedRoute'
import * as AuthContext from '../../src/contexts/AuthContext'
import * as usePermissionsHook from '../../src/hooks/usePermissions'
import { MemoryRouter, Routes, Route } from 'react-router'

vi.mock('../../src/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))
vi.mock('../../src/hooks/usePermissions', () => ({
  usePermissions: vi.fn(),
}))

function renderProtectedRoute(isAuthenticated: boolean, canPermission = true) {
  vi.mocked(AuthContext.useAuth).mockReturnValue({
    isAuthenticated,
    session: null,
    setSession: vi.fn(),
    logout: vi.fn(),
  } as ReturnType<typeof AuthContext.useAuth>)
  vi.mocked(usePermissionsHook.usePermissions).mockReturnValue({
    can: () => canPermission,
    permissions: [],
  } as ReturnType<typeof usePermissionsHook.usePermissions>)

  return render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<div>Login page</div>} />
        <Route path="/home" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects to / when not authenticated', () => {
    renderProtectedRoute(false)
    expect(screen.getByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    renderProtectedRoute(true)
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('redirects to /home when authenticated but missing required permission', () => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({
      isAuthenticated: true,
      session: null,
      setSession: vi.fn(),
      logout: vi.fn(),
    } as ReturnType<typeof AuthContext.useAuth>)
    vi.mocked(usePermissionsHook.usePermissions).mockReturnValue({
      can: () => false,
      permissions: [],
    } as ReturnType<typeof usePermissionsHook.usePermissions>)
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute requiredPermission="users.read">
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })
})
