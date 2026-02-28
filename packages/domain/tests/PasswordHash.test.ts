import { describe, it, expect } from 'vitest'
import { PasswordHash } from '../src/entities/PasswordHash'

describe('PasswordHash', () => {
  it('accepts any non-empty string', () => {
    const hash = new PasswordHash('$2b$10$hashedvalue')
    expect(hash.value).toBe('$2b$10$hashedvalue')
  })

  it('equals same value', () => {
    const a = new PasswordHash('same')
    const b = new PasswordHash('same')
    expect(a.equals(b)).toBe(true)
  })
})
