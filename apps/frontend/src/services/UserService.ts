import type { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'
import { apiFetch } from './ApiClient'

export const getUserInfoRequest = () => apiFetch<UserInfoResponse>('/api/users/me')

export const getUsersRequest = () => apiFetch<UserInfoResponse[]>('/api/users')

export default {
  getUserInfoRequest,
  getUsersRequest,
}
