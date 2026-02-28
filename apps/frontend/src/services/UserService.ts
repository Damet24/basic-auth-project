import type { UpdateUserRequest } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import type { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'
import { apiFetch } from './ApiClient'

export const getUserInfoRequest = () => apiFetch<UserInfoResponse>('/api/users/me')

export const getUsersRequest = () => apiFetch<UserInfoResponse[]>('/api/users')

export const editUserInfoRequest = (updateUserRequest: UpdateUserRequest) =>
  apiFetch<void>('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify(updateUserRequest),
  })

  export const editUserRequest = ({id, payload}:{id: string, payload: UpdateUserRequest}) =>
  apiFetch<void>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteUserInfoRequest = ({ id }: { id: string }) =>
  apiFetch<void>(`/api/users/${id}`, {
    method: 'DELETE',
  })

export default {
  getUserInfoRequest,
  getUsersRequest,
  editUserRequest,
  editUserInfoRequest,
  deleteUserInfoRequest,
}
