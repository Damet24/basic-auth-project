import { describe, it, expect } from 'vitest'
import { User } from '../src/entities/User'
import { UserId } from '../src/entities/UserId'
import { UserName } from '../src/entities/UserName'
import { UserEmail } from '../src/entities/UserEmail'
import { UserRole } from '../src/entities/UserRole'
import { PasswordHash } from '../src/entities/PasswordHash'

function createUser(overrides?: { deletedAt?: Date }) {
  const id = new UserId('550e8400-e29b-41d4-a716-446655440000')
  const name = new UserName('John Doe')
  const email = new UserEmail('john@example.com')
  const role = UserRole.USER
  const passwordHash = new PasswordHash('$2b$10$hash')
  return User.create(id, name, email, role, passwordHash)
}

describe('User', () => {
  it('create() builds a user', () => {
    const user = createUser()
    expect(user.id.value).toBe('550e8400-e29b-41d4-a716-446655440000')
    expect(user.name.value).toBe('John Doe')
    expect(user.email.value).toBe('john@example.com')
    expect(user.role.value).toBe('USER')
    expect(user.passwordHash.value).toBe('$2b$10$hash')
    expect(user.deletedAt).toBeUndefined()
  })

  it('isDeleted() is false when not deleted', () => {
    const user = createUser()
    expect(user.isDeleted()).toBe(false)
  })

  it('delete() returns new user with deletedAt set', () => {
    const user = createUser()
    const deleted = user.delete()
    expect(deleted.deletedAt).toBeDefined()
    expect(deleted.isDeleted()).toBe(true)
    expect(user.deletedAt).toBeUndefined()
  })

  it('restore() clears deletedAt', () => {
    const user = createUser().delete()
    const restored = user.restore()
    expect(restored.deletedAt).toBeUndefined()
    expect(restored.isDeleted()).toBe(false)
  })

  it('toPrimitives() returns plain object', () => {
    const user = createUser()
    const prim = user.toPrimitives()
    expect(prim).toEqual({
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      passwordHash: '$2b$10$hash',
      deletedAt: undefined,
    })
  })

  it('fromPrimitives() builds user from strings', () => {
    const user = User.fromPrimitives(
      '550e8400-e29b-41d4-a716-446655440000',
      'Jane',
      'jane@example.com',
      'ADMIN',
      'hash',
      undefined,
    )
    expect(user.id.value).toBe('550e8400-e29b-41d4-a716-446655440000')
    expect(user.name.value).toBe('Jane')
    expect(user.email.value).toBe('jane@example.com')
    expect(user.role.value).toBe('ADMIN')
    expect(user.passwordHash.value).toBe('hash')
    expect(user.deletedAt).toBeUndefined()
  })

  it('fromPrimitives() with deletedAt parses date', () => {
    const deletedAt = '2025-01-15T10:00:00.000Z'
    const user = User.fromPrimitives(
      '550e8400-e29b-41d4-a716-446655440000',
      'Jane',
      'jane@example.com',
      'USER',
      'hash',
      deletedAt,
    )
    expect(user.deletedAt).toEqual(new Date(deletedAt))
    expect(user.isDeleted()).toBe(true)
  })
})
