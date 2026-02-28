import { describe, it, expect } from 'vitest'
import { nameInitials } from '../../src/lib/initials'

describe('nameInitials', () => {
  it('returns first letter of each word uppercased', () => {
    expect(nameInitials('John Doe')).toBe('JD')
  })

  it('returns single initial for one word', () => {
    expect(nameInitials('Alice')).toBe('A')
  })

  it('returns empty string for empty input', () => {
    expect(nameInitials('')).toBe('')
  })

  it('handles multiple words', () => {
    expect(nameInitials('John Paul Smith')).toBe('JPS')
  })

  it('uppercases lowercase names', () => {
    expect(nameInitials('jane doe')).toBe('JD')
  })
})
