import { UserRole } from '@packages/domain/index'
import type { Permission } from '../types'
import { PERMISSIONS } from '.'

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [UserRole.ADMIN.value]: [
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_WRITE,
    PERMISSIONS.PROFILE_EDIT,
    PERMISSIONS.ADMIN_DASHBOARD_ACCESS,
    PERMISSIONS.STATS_DASHBOARD_ACCESS,
  ],
  [UserRole.USER.value]: [PERMISSIONS.PROFILE_EDIT],
}
