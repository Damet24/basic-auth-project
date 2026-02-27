import type { Token } from '@packages/contracts/index'
import { apiFetch } from './ApiClient'

export const loginRequest = (email: string, password: string) =>
  apiFetch<Token>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export default { loginRequest }
