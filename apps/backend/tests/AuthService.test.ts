import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from '../src/services/AuthService'
import type { UserRepository } from '../src/repositories/UserRepository'
import type { PasswordHasher } from '../src/services/PasswordHasher'
import type { User } from '@packages/domain/entities/User'
import { UserId } from '@packages/domain/entities/UserId'
import { UserName } from '@packages/domain/entities/UserName'
import { UserEmail } from '@packages/domain/entities/UserEmail'
import { UserRole } from '@packages/domain/entities/UserRole'
import { PasswordHash } from '@packages/domain/entities/PasswordHash'

vi.mock('../src/config', () => ({
  config: {
    jwt: {
      secret: 'test-secret-min-32-chars!!!!!!!!!!!',
      expiresIn: 3600,
    },
  },
}))

function createMockUser(overrides?: Partial<{ id: string; email: string; passwordHash: string }>): User {
  const id = overrides?.id ?? '550e8400-e29b-41d4-a716-446655440000'
  const email = overrides?.email ?? 'user@example.com'
  const passwordHash = overrides?.passwordHash ?? '$2b$10$hashed'
  return {
    id: new UserId(id),
    name: new UserName('Test User'),
    email: new UserEmail(email),
    role: UserRole.USER,
    passwordHash: new PasswordHash(passwordHash),
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

describe('AuthService', () => {
  let mockUserRepository: { findByEmail: ReturnType<typeof vi.fn>; findByEmailIncludingDeleted: ReturnType<typeof vi.fn>; save: ReturnType<typeof vi.fn>; restore: ReturnType<typeof vi.fn>; updatePassword: ReturnType<typeof vi.fn>; findById: ReturnType<typeof vi.fn> }
  let mockPasswordHasher: { compare: ReturnType<typeof vi.fn>; hash: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn(),
      findByEmailIncludingDeleted: vi.fn(),
      save: vi.fn().mockResolvedValue(undefined),
      restore: vi.fn().mockResolvedValue({ isOk: () => true }),
      updatePassword: vi.fn().mockResolvedValue({ isOk: () => true, match: (handlers: { ok: (v: boolean) => unknown }) => handlers.ok(true) }),
      findById: vi.fn(),
    }
    mockPasswordHasher = {
      compare: vi.fn().mockResolvedValue(true),
      hash: vi.fn().mockResolvedValue('hashed-password'),
    }
  })

  describe('login', () => {
    it('returns err when user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.login({ email: 'nobody@example.com', password: 'password' })
      expect(result.isErr()).toBe(true)
      if (result.isErr()) expect(result.error.message).toBe('Invalid credentials')
    })

    it('returns err when password invalid', async () => {
      const user = createMockUser()
      mockUserRepository.findByEmail.mockResolvedValue(user)
      mockPasswordHasher.compare.mockResolvedValue(false)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.login({ email: user.email.value, password: 'wrong' })
      expect(result.isErr()).toBe(true)
      if (result.isErr()) expect(result.error.message).toBe('Invalid credentials')
    })

    it('returns ok with access_token when credentials valid', async () => {
      const user = createMockUser()
      mockUserRepository.findByEmail.mockResolvedValue(user)
      mockPasswordHasher.compare.mockResolvedValue(true)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.login({ email: user.email.value, password: 'correct' })
      expect(result.isOk()).toBe(true)
      if (result.isOk()) {
        expect(result.value.access_token).toBeDefined()
        expect(typeof result.value.access_token).toBe('string')
        expect(result.value.expires_in).toBe(3600)
      }
    })
  })

  describe('register', () => {
    it('returns err when password validation fails', async () => {
      mockUserRepository.findByEmailIncludingDeleted.mockResolvedValue(null)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.register({ email: 'new@example.com', name: 'New', password: 'short' })
      expect(result.isErr()).toBe(true)
    })

    it('returns err when email already registered (not deleted)', async () => {
      const existing = createMockUser()
      mockUserRepository.findByEmailIncludingDeleted.mockResolvedValue(existing)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.register({
        email: existing.email.value,
        name: 'Other',
        password: 'ValidP@ssword123',
      })
      expect(result.isErr()).toBe(true)
      if (result.isErr()) expect(result.error.message).toBe('Email already registered')
    })

    it('calls restore and updatePassword when existing user is deleted', async () => {
      const deletedUser = createMockUser()
      const deleted = { ...deletedUser, isDeleted: () => true }
      mockUserRepository.findByEmailIncludingDeleted.mockResolvedValue(deleted)
      mockUserRepository.restore.mockResolvedValue(undefined)
      mockUserRepository.updatePassword.mockResolvedValue({ match: (handlers: { ok: (v: boolean) => unknown }) => handlers.ok(true) })
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.register({
        email: deletedUser.email.value,
        name: 'Restored',
        password: 'ValidP@ssword123',
      })
      expect(result.isOk()).toBe(true)
      expect(mockUserRepository.restore).toHaveBeenCalledWith(deletedUser.id.value)
      expect(mockUserRepository.updatePassword).toHaveBeenCalled()
    })

    it('saves new user and returns ok when email not exists', async () => {
      mockUserRepository.findByEmailIncludingDeleted.mockResolvedValue(null)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.register({
        email: 'new@example.com',
        name: 'NewUser',
        password: 'ValidP@ssword123',
      })
      expect(result.isOk()).toBe(true)
      if (result.isOk()) {
        expect(result.value.email).toBe('new@example.com')
        expect(result.value.name).toBe('NewUser')
      }
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('updatePassword', () => {
    it('returns err when user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.updatePassword({
        id: '550e8400-e29b-41d4-a716-446655440000',
        payload: {
          currentPassword: 'OldP@ssword123',
          newPassword: 'NewP@ssword123',
          confirmPassword: 'NewP@ssword123',
        },
      })
      expect(result.isErr()).toBe(true)
    })

    it('returns err when newPassword !== confirmPassword', async () => {
      const user = createMockUser()
      mockUserRepository.findById.mockResolvedValue(user)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.updatePassword({
        id: user.id.value,
        payload: {
          currentPassword: 'OldP@ssword123',
          newPassword: 'NewP@ssword123',
          confirmPassword: 'Other',
        },
      })
      expect(result.isErr()).toBe(true)
    })

    it('returns err when current password invalid', async () => {
      const user = createMockUser()
      mockUserRepository.findById.mockResolvedValue(user)
      mockPasswordHasher.compare.mockResolvedValue(false)
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.updatePassword({
        id: user.id.value,
        payload: {
          currentPassword: 'Wrong',
          newPassword: 'NewP@ssword123',
          confirmPassword: 'NewP@ssword123',
        },
      })
      expect(result.isErr()).toBe(true)
    })

    it('returns ok and calls updatePassword when valid', async () => {
      const user = createMockUser()
      mockUserRepository.findById.mockResolvedValue(user)
      mockPasswordHasher.compare.mockResolvedValue(true)
      mockUserRepository.updatePassword.mockResolvedValue({
        match: (handlers: { ok: (v: boolean) => unknown }) => handlers.ok(true),
      })
      const service = new AuthService(mockUserRepository as unknown as UserRepository, mockPasswordHasher as unknown as PasswordHasher)
      const result = await service.updatePassword({
        id: user.id.value,
        payload: {
          currentPassword: 'OldP@ssword123',
          newPassword: 'NewP@ssword123',
          confirmPassword: 'NewP@ssword123',
        },
      })
      expect(result.isOk()).toBe(true)
      expect(mockUserRepository.updatePassword).toHaveBeenCalledWith(user.id.value, 'hashed-password')
    })
  })
})
