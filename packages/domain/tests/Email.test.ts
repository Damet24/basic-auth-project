import { describe, it, expect } from 'vitest'
import { Email } from '../src/value-boject/Email'

describe('Email value object', () => {
  it('accepts a valid email', () => {
    const email = new Email('user@example.com')
    expect(email.value).toBe('user@example.com')
  })

  it('normalizes email (trim and lowercase)', () => {
    const email = new Email('  User@Example.COM  ')
    expect(email.value).toBe('user@example.com')
  })

  it('throws when constructed with invalid email', () => {
    expect(() => new Email('not-an-email')).toThrow(/email/i)
  })

  it('throws when empty', () => {
    expect(() => new Email('')).toThrow()
  })

  it('equals same value', () => {
    const a = new Email('a@b.co')
    const b = new Email('a@b.co')
    expect(a.equals(b)).toBe(true)
  })

  it('toString returns value', () => {
    const email = new Email('u@x.com')
    expect(email.toString()).toBe('u@x.com')
  })
})
