import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePermissions } from '../../src/hooks/usePermissions'
import * as useUser from '../../src/hooks/useUser'
import { PERMISSIONS } from '../../src/constants/permissions'

vi.mock('../../src/hooks/useUser', () => ({
  useCurrentUser: vi.fn(),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('usePermissions', () => {
  it('returns empty permissions when no user', () => {
    vi.mocked(useUser.useCurrentUser).mockReturnValue({ data: undefined } as ReturnType<typeof useUser.useCurrentUser>)
    const { result } = renderHook(() => usePermissions(), { wrapper })
    expect(result.current.permissions).toEqual([])
    expect(result.current.can(PERMISSIONS.PROFILE_EDIT)).toBe(false)
  })

  it('returns USER permissions when user has role USER', () => {
    vi.mocked(useUser.useCurrentUser).mockReturnValue({
      data: { id: '1', name: 'U', email: 'u@x.com', role: 'USER' },
    } as ReturnType<typeof useUser.useCurrentUser>)
    const { result } = renderHook(() => usePermissions(), { wrapper })
    expect(result.current.can(PERMISSIONS.PROFILE_EDIT)).toBe(true)
    expect(result.current.can(PERMISSIONS.USERS_READ)).toBe(false)
  })

  it('returns ADMIN permissions when user has role ADMIN', () => {
    vi.mocked(useUser.useCurrentUser).mockReturnValue({
      data: { id: '1', name: 'A', email: 'a@x.com', role: 'ADMIN' },
    } as ReturnType<typeof useUser.useCurrentUser>)
    const { result } = renderHook(() => usePermissions(), { wrapper })
    expect(result.current.can(PERMISSIONS.USERS_READ)).toBe(true)
    expect(result.current.can(PERMISSIONS.PROFILE_EDIT)).toBe(true)
  })
})
