import { describe, it, expect } from 'vitest'
import { PERMISSIONS } from '../../src/constants/permissions'

describe('PERMISSIONS', () => {
  it('has expected permission keys', () => {
    expect(PERMISSIONS.USERS_READ).toBe('users.read')
    expect(PERMISSIONS.USERS_WRITE).toBe('users.write')
    expect(PERMISSIONS.PROFILE_EDIT).toBe('profile.edit')
    expect(PERMISSIONS.ADMIN_DASHBOARD_ACCESS).toBe('admin.dashboard.access')
    expect(PERMISSIONS.STATS_DASHBOARD_ACCESS).toBe('stats.dashboard.access')
  })
})
