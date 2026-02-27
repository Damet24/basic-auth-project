import { useQuery } from '@tanstack/react-query'
import { apiFetch } from './ApiClient'
import type { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'

const getUserInfo = () => {
  return useQuery<UserInfoResponse>({
    queryKey: ['userInfo'],
    queryFn: () => apiFetch('/api/users/me'),
  })
}

const getUsers = () => {
  return useQuery<UserInfoResponse[]>({
    queryKey: ['users'],
    queryFn: () => apiFetch('/api/users'),
  })
}

export default {
  getUserInfo,
  getUsers,
}
