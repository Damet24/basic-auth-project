import { describe, it, expect } from 'vitest'
import { UserRole } from '../src/entities/UserRole'

describe('UserRole', () => {
  it('from("ADMIN") returns ADMIN', () => {
    const role = UserRole.from('ADMIN')
    expect(role.value).toBe('ADMIN')
    expect(role.isAdmin()).toBe(true)
    expect(role.isUser()).toBe(false)
  })

  it('from("USER") returns USER', () => {
    const role = UserRole.from('USER')
    expect(role.value).toBe('USER')
    expect(role.isUser()).toBe(true)
    expect(role.isAdmin()).toBe(false)
  })

  it('from() throws for invalid role', () => {
    expect(() => UserRole.from('INVALID')).toThrow(/Invalid role/)
  })

  it('values() returns allowed roles', () => {
    expect(UserRole.values()).toEqual(['ADMIN', 'USER'])
  })

  it('ADMIN and USER singletons are equal to from()', () => {
    expect(UserRole.ADMIN.equals(UserRole.from('ADMIN'))).toBe(true)
    expect(UserRole.USER.equals(UserRole.from('USER'))).toBe(true)
  })
})
