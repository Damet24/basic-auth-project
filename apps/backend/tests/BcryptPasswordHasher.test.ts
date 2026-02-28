import { describe, it, expect } from 'vitest'
import { BcryptPasswordHasher } from '../src/services/BcryptPasswordHasher'

describe('BcryptPasswordHasher', () => {
  const saltRounds = 4
  const hasher = new BcryptPasswordHasher(saltRounds)

  it('hash() returns a string different from plain value', async () => {
    const plain = 'myPassword123'
    const hash = await hasher.hash(plain)
    expect(hash).not.toBe(plain)
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('compare() returns true for matching password and hash', async () => {
    const plain = 'secret'
    const hash = await hasher.hash(plain)
    const match = await hasher.compare(plain, hash)
    expect(match).toBe(true)
  })

  it('compare() returns false for wrong password', async () => {
    const hash = await hasher.hash('correct')
    const match = await hasher.compare('wrong', hash)
    expect(match).toBe(false)
  })
})
