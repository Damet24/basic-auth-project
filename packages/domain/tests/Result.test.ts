import { describe, it, expect } from 'vitest'
import { ok, err } from '../src/shared/Result'

describe('Result', () => {
  describe('ok', () => {
    it('isOk() is true', () => {
      const result = ok(42)
      expect(result.isOk()).toBe(true)
      expect(result.isErr()).toBe(false)
    })

    it('unwrap() returns value', () => {
      const result = ok('hello')
      expect(result.unwrap()).toBe('hello')
    })

    it('match() calls ok handler', () => {
      const result = ok(10)
      const value = result.match({
        ok: (n) => n * 2,
        err: () => 0,
      })
      expect(value).toBe(20)
    })
  })

  describe('err', () => {
    it('isErr() is true', () => {
      const result = err(new Error('fail'))
      expect(result.isErr()).toBe(true)
      expect(result.isOk()).toBe(false)
    })

    it('unwrap() throws', () => {
      const result = err('error')
      expect(() => result.unwrap()).toThrow('Tried to unwrap an Err result')
    })

    it('match() calls err handler', () => {
      const result = err('oops')
      const value = result.match({
        ok: () => 'ok',
        err: (e) => String(e),
      })
      expect(value).toBe('oops')
    })
  })
})
