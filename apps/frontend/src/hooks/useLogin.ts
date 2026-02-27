import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setSession } from '../services/ApiClient'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const token = await AuthService.loginRequest(email, password)

      const session = {
        access_token: token.access_token,
        expires_in: token.expires_in,
        expires_at: Date.now() + token.expires_in * 1000,
      }

      setSession(session)

      const user = await queryClient.fetchQuery({
        queryKey: ['userInfo'],
        queryFn: UserService.getUserInfoRequest,
      })

      return { token, user }
    },

    onSuccess: ({ user }) => {
      queryClient.setQueryData(['userInfo'], user)
    },
  })
}
