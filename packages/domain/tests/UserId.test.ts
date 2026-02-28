import { describe, it, expect } from 'vitest'
import { UserId } from '../src/entities/UserId'
import { Uuid } from '../src/value-boject/Uuid'

describe('UserId', () => {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000'

  it('accepts a valid uuid', () => {
    const id = new UserId(validUuid)
    expect(id.value).toBe(validUuid)
  })

  it('throws when constructed with invalid uuid', () => {
    expect(() => new UserId('invalid')).toThrow()
  })

  it('extends Uuid behavior', () => {
    const id = new UserId(validUuid)
    expect(id).toBeInstanceOf(Uuid)
  })
})
