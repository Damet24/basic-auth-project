import { describe, it, expect } from 'vitest'
import { Uuid } from '../src/value-boject/Uuid'

describe('Uuid value object', () => {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000'

  it('accepts a valid uuid', () => {
    const id = new Uuid(validUuid)
    expect(id.value).toBe(validUuid)
  })

  it('throws when constructed with invalid uuid', () => {
    expect(() => new Uuid('not-a-uuid')).toThrow()
    expect(() => new Uuid('')).toThrow()
  })

  it('random() returns a new valid Uuid', () => {
    const a = Uuid.random()
    const b = Uuid.random()
    expect(a.value).toBeDefined()
    expect(b.value).toBeDefined()
    expect(a.value).not.toBe(b.value)
  })

  it('equals same value', () => {
    const a = new Uuid(validUuid)
    const b = new Uuid(validUuid)
    expect(a.equals(b)).toBe(true)
  })
})
