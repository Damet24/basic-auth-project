import { describe, it, expect } from 'vitest'
import { NotFoundError } from '../src/errors/NotFoundError'

describe('NotFoundError', () => {
  it('extends Error', () => {
    const error = new NotFoundError('User not found')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(NotFoundError)
    expect(error.message).toBe('User not found')
  })
})
