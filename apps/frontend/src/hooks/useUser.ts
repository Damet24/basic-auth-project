import type { UpdateUserRequest } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdateUserRequest>({
    mutationFn: UserService.editUserInfoRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; payload: UpdateUserRequest }>({
    mutationFn: UserService.editUserRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string }>({
    mutationFn: UserService.deleteUserInfoRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
