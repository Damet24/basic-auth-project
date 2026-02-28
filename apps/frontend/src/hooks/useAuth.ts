import type { ChangePasswordRequest } from "@packages/contracts/dtos/requests/ChangePasswordRequest"
import { useMutation } from "@tanstack/react-query"
import AuthService from "../services/AuthService"


export const useChangePassword = () => {
  return useMutation<void, Error, ChangePasswordRequest>({
    mutationFn: AuthService.changePassword,
  })
}