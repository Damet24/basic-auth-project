import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as ApiClient from '../../src/services/ApiClient'
import AuthService from '../../src/services/AuthService'

vi.mock('../../src/services/ApiClient', () => ({
  apiFetch: vi.fn(),
}))

describe('AuthService', () => {
  beforeEach(() => {
    vi.mocked(ApiClient.apiFetch).mockReset()
  })

  describe('loginRequest', () => {
    it('calls apiFetch with POST /api/auth/login and body', async () => {
      vi.mocked(ApiClient.apiFetch).mockResolvedValue({
        access_token: 'token',
        expires_in: 3600,
      })
      await AuthService.loginRequest('user@example.com', 'password123')
      expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
      })
    })

    it('returns token from apiFetch', async () => {
      const token = { access_token: 'abc', expires_in: 3600 }
      vi.mocked(ApiClient.apiFetch).mockResolvedValue(token)
      const result = await AuthService.loginRequest('a@b.co', 'pass')
      expect(result).toEqual(token)
    })
  })

  describe('changePassword', () => {
    it('calls apiFetch with PUT /api/auth/password and payload', async () => {
      vi.mocked(ApiClient.apiFetch).mockResolvedValue(undefined)
      await AuthService.changePassword({
        currentPassword: 'old',
        newPassword: 'new',
        confirmPassword: 'new',
      })
      expect(ApiClient.apiFetch).toHaveBeenCalledWith('/api/auth/password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: 'old',
          confirmPassword: 'new',
          newPassword: 'new',
        }),
      })
    })
  })
})
