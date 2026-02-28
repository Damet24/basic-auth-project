import { describe, it, expect } from 'vitest'
import { UserEmail } from '../src/entities/UserEmail'
import { Email } from '../src/value-boject/Email'

describe('UserEmail', () => {
  it('accepts a valid email', () => {
    const email = new UserEmail('user@example.com')
    expect(email.value).toBe('user@example.com')
  })

  it('extends Email behavior', () => {
    const email = new UserEmail('a@b.co')
    expect(email).toBeInstanceOf(Email)
  })

  it('throws when invalid', () => {
    expect(() => new UserEmail('not-email')).toThrow()
  })
})
