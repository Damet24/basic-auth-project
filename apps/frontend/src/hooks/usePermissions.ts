import { ROLE_PERMISSIONS } from '../constants'
import type { Permission } from '../types'
import { useCurrentUser } from './useUser'

export function usePermissions() {
  const { data: user } = useCurrentUser()

  const permissions = user ? (ROLE_PERMISSIONS[user.role] ?? []) : []

  function can(permission: Permission) {
    return permissions.includes(permission)
  }

  return { can, permissions }
}
