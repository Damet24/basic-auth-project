import type { Token } from '@packages/contracts/index'
import { apiFetch } from './ApiClient'
import type {ChangePasswordRequest} from '@packages/contracts/dtos/requests/ChangePasswordRequest'

export const loginRequest = (email: string, password: string) =>
  apiFetch<Token>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const changePassword = (data: ChangePasswordRequest) =>
    apiFetch<void>('/api/auth/password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          confirmPassword: data.confirmPassword,
          newPassword: data.newPassword,
        }),
      })

export default { loginRequest, changePassword }
