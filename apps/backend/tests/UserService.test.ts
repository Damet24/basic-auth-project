import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserService } from '../src/services/UserService'
import type { UserRepository } from '../src/repositories/UserRepository'
import type { User } from '@packages/domain/entities/User'
import { UserId } from '@packages/domain/entities/UserId'
import { UserName } from '@packages/domain/entities/UserName'
import { UserEmail } from '@packages/domain/entities/UserEmail'
import { UserRole } from '@packages/domain/entities/UserRole'
import { PasswordHash } from '@packages/domain/entities/PasswordHash'
import { NotFoundError } from '@packages/domain/errors/NotFoundError'
import { ok, err } from '@packages/domain/shared/Result'

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000'
const VALID_UUID_2 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

function createMockUser(overrides?: Partial<{ id: string; name: string; email: string; role: string }>): User {
  const id = overrides?.id ?? VALID_UUID
  const name = overrides?.name ?? 'Test User'
  const email = overrides?.email ?? 'user@example.com'
  const role = overrides?.role ?? 'USER'
  return {
    id: new UserId(id),
    name: new UserName(name),
    email: new UserEmail(email),
    role: role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER,
    passwordHash: new PasswordHash('hash'),
    deletedAt: undefined,
    isDeleted: () => false,
    delete: function () {
      return { ...this, deletedAt: new Date() }
    },
    restore: function () {
      return { ...this, deletedAt: undefined }
    },
    toPrimitives: () => ({}),
  } as unknown as User
}

describe('UserService', () => {
  let mockUserRepository: {
    findAll: ReturnType<typeof vi.fn>
    findById: ReturnType<typeof vi.fn>
    remove: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    mockUserRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      remove: vi.fn(),
      update: vi.fn(),
    }
  })

  describe('getAll', () => {
    it('returns mapped users from repository', async () => {
      const users = [
        createMockUser({ id: VALID_UUID, name: 'User A', email: 'a@x.com', role: 'USER' }),
        createMockUser({ id: VALID_UUID_2, name: 'User B', email: 'b@x.com', role: 'ADMIN' }),
      ]
      mockUserRepository.findAll.mockResolvedValue(users)
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.getAll()
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ id: VALID_UUID, name: 'User A', email: 'a@x.com', role: 'USER' })
      expect(result[1]).toEqual({ id: VALID_UUID_2, name: 'User B', email: 'b@x.com', role: 'ADMIN' })
    })

    it('returns empty array when no users', async () => {
      mockUserRepository.findAll.mockResolvedValue([])
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.getAll()
      expect(result).toEqual([])
    })
  })

  describe('getById', () => {
    it('returns err(NotFoundError) when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null)
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.getById(new UserId('550e8400-e29b-41d4-a716-446655440000'))
      expect(result.isErr()).toBe(true)
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(NotFoundError)
        expect(result.error.message).toBe('User not found')
      }
    })

    it('returns ok with user info when found', async () => {
      const user = createMockUser({ id: VALID_UUID, name: 'Jane', email: 'jane@x.com', role: 'USER' })
      mockUserRepository.findById.mockResolvedValue(user)
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.getById(new UserId(VALID_UUID))
      expect(result.isOk()).toBe(true)
      if (result.isOk()) {
        expect(result.value).toEqual({ id: VALID_UUID, name: 'Jane', email: 'jane@x.com', role: 'USER' })
      }
    })
  })

  describe('delete', () => {
    it('returns ok(true) when remove succeeds', async () => {
      mockUserRepository.remove.mockResolvedValue(ok(true))
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.delete(new UserId(VALID_UUID))
      expect(result.isOk()).toBe(true)
      if (result.isOk()) expect(result.value).toBe(true)
    })

    it('returns err when remove fails', async () => {
      const notFound = new NotFoundError('User not found')
      mockUserRepository.remove.mockResolvedValue(err(notFound))
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.delete(new UserId(VALID_UUID))
      expect(result.isErr()).toBe(true)
      if (result.isErr()) expect(result.error).toBe(notFound)
    })
  })

  describe('edit', () => {
    it('returns err(NotFoundError) when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null)
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.edit(VALID_UUID, { name: 'New Name' })
      expect(result.isErr()).toBe(true)
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(NotFoundError)
        expect(result.error.message).toBe('User not found')
      }
    })

    it('calls update with only defined payload fields and returns ok', async () => {
      const user = createMockUser()
      mockUserRepository.findById.mockResolvedValue(user)
      mockUserRepository.update.mockResolvedValue(ok(true))
      const service = new UserService(mockUserRepository as unknown as UserRepository)
      const result = await service.edit(VALID_UUID, { name: 'Updated' })
      expect(result.isOk()).toBe(true)
      expect(mockUserRepository.update).toHaveBeenCalledWith(VALID_UUID, { name: 'Updated' })
    })
  })
})
