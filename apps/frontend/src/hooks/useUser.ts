import { useQuery } from '@tanstack/react-query'
import UserService from '../services/UserService'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: UserService.getUserInfoRequest,
  })
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: UserService.getUsersRequest,
  })
}
