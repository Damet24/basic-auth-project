import { describe, it, expect } from 'vitest'
import { PlainPassword } from '../src/entities/PlainPassword'

describe('PlainPassword', () => {
  const validPassword = 'SecureP@ss123'

  it('create() returns ok with valid password', () => {
    const result = PlainPassword.create(validPassword)
    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value.value).toBe(validPassword)
    }
  })

  it('create() returns err when too short', () => {
    const result = PlainPassword.create('Short1!')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/at least 12/)
    }
  })

  it('create() returns err when too long', () => {
    const result = PlainPassword.create('A'.repeat(129) + 'a1!')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/less than 128/)
    }
  })

  it('create() returns err when no uppercase', () => {
    const result = PlainPassword.create('lowercase123!')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/uppercase/)
    }
  })

  it('create() returns err when no lowercase', () => {
    const result = PlainPassword.create('UPPERCASE123!')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/lowercase/)
    }
  })

  it('create() returns err when no number', () => {
    const result = PlainPassword.create('NoNumbers!!!!')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/number/)
    }
  })

  it('create() returns err when no special character', () => {
    const result = PlainPassword.create('NoSpecial123')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/special/)
    }
  })

  it('create() returns err when only repeated character (fails lowercase first)', () => {
    const result = PlainPassword.create('aaaaaaaaaaaa')
    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toMatch(/uppercase/)
    }
  })
})
