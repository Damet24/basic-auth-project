import { describe, it, expect } from 'vitest'
import { ROLE_PERMISSIONS } from '../../src/constants/rolePermissions'
import { PERMISSIONS } from '../../src/constants/permissions'
import { UserRole } from '@packages/domain/entities/UserRole'

describe('ROLE_PERMISSIONS', () => {
  it('ADMIN has users and profile and dashboard permissions', () => {
    const adminPerms = ROLE_PERMISSIONS[UserRole.ADMIN.value]
    expect(adminPerms).toContain(PERMISSIONS.USERS_READ)
    expect(adminPerms).toContain(PERMISSIONS.USERS_WRITE)
    expect(adminPerms).toContain(PERMISSIONS.PROFILE_EDIT)
    expect(adminPerms).toContain(PERMISSIONS.ADMIN_DASHBOARD_ACCESS)
    expect(adminPerms).toContain(PERMISSIONS.STATS_DASHBOARD_ACCESS)
  })

  it('USER has only profile edit', () => {
    const userPerms = ROLE_PERMISSIONS[UserRole.USER.value]
    expect(userPerms).toEqual([PERMISSIONS.PROFILE_EDIT])
  })
})
