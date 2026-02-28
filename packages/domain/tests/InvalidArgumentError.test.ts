import { describe, it, expect } from 'vitest'
import { InvalidArgumentError } from '../src/errors/InvalidArgumentError'

describe('InvalidArgumentError', () => {
  it('extends Error', () => {
    const error = new InvalidArgumentError('test')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(InvalidArgumentError)
    expect(error.message).toBe('test')
  })
})
