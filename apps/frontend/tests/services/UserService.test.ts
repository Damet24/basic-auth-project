import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as ApiClient from '../../src/services/ApiClient'
import UserService from '../../src/services/UserService'

vi.mock('../../src/services/ApiClient', () => ({
  apiFetch: vi.fn(),
}))

describe('UserService', () => {
  beforeEach(() => {
    vi.mocked(ApiClient.apiFetch).mockReset()
  })

  it('getUserInfoRequest calls GET /api/users/me', async () => {
    vi.mocked(ApiClient.apiFetch).mockResolvedValue({ id: '1', name: 'U', email: 'u@x.com', role: 'USER' })
    await UserService.getUserInfoRequest()
    expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/users/me')
  })

  it('getUsersRequest calls GET /api/users', async () => {
    vi.mocked(ApiClient.apiFetch).mockResolvedValue([])
    await UserService.getUsersRequest()
    expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/users')
  })

  it('editUserInfoRequest calls PUT /api/users/me with body', async () => {
    vi.mocked(ApiClient.apiFetch).mockResolvedValue(undefined)
    await UserService.editUserInfoRequest({ name: 'New' })
    expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({ name: 'New' }),
    })
  })

  it('editUserRequest calls PUT /api/users/:id with payload', async () => {
    vi.mocked(ApiClient.apiFetch).mockResolvedValue(undefined)
    await UserService.editUserRequest({ id: 'user-1', payload: { email: 'e@x.com' } })
    expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/users/user-1', {
      method: 'PUT',
      body: JSON.stringify({ email: 'e@x.com' }),
    })
  })

  it('deleteUserInfoRequest calls DELETE /api/users/:id', async () => {
    vi.mocked(ApiClient.apiFetch).mockResolvedValue(undefined)
    await UserService.deleteUserInfoRequest({ id: 'user-1' })
    expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/users/user-1', { method: 'DELETE' })
  })
})
