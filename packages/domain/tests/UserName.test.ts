import { describe, it, expect } from 'vitest'
import { UserName } from '../src/entities/UserName'

describe('UserName', () => {
  it('accepts a valid name (min length 4, max 100)', () => {
    const name = new UserName('John')
    expect(name.value).toBe('John')
    const long = new UserName('a'.repeat(100))
    expect(long.value).toHaveLength(100)
  })

  it('throws when shorter than 4 characters', () => {
    expect(() => new UserName('Jo')).toThrow(/between 4 and 100/)
  })

  it('throws when longer than 100 characters', () => {
    expect(() => new UserName('a'.repeat(101))).toThrow(/between 4 and 100/)
  })
})
