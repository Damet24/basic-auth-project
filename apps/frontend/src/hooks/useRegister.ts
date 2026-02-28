import type { RegisterUserRequest } from '@packages/contracts/dtos/requests/RegisterUserRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { setSession } from '../services/ApiClient'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

export const useRegister = () => {
  const queryClient = useQueryClient()
  const { setSession: setAuthSession } = useAuth()

  return useMutation({
    mutationFn: async (data: RegisterUserRequest) => {
      const user = await AuthService.registerRequest(data)

      const token = await AuthService.loginRequest(data.email, data.password)
      const session = {
        access_token: token.access_token,
        expires_in: token.expires_in,
        expires_at: Date.now() + token.expires_in * 1000,
      }

      setSession(session)
      setAuthSession(session)

      await queryClient.fetchQuery({
        queryKey: ['userInfo'],
        queryFn: UserService.getUserInfoRequest,
      })

      queryClient.setQueryData(['userInfo'], user)
      return user
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['userInfo'], user)
    },
  })
}
