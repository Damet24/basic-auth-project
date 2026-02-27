export type Result<T, E> = Ok<T, E> | Err<T, E>

interface MatchHandlers<T, E, R> {
  ok: (value: T) => R
  err: (error: E) => R
}

class Ok<T, E> {
  readonly type = 'ok' as const

  constructor(public readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true
  }

  isErr(): this is Err<T, E> {
    return false
  }

  unwrap(): T {
    return this.value
  }

  match<R>(handlers: MatchHandlers<T, E, R>): R {
    return handlers.ok(this.value)
  }
}

class Err<T, E> {
  readonly type = 'err' as const

  constructor(public readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false
  }

  isErr(): this is Err<T, E> {
    return true
  }

  unwrap(): never {
    throw new Error('Tried to unwrap an Err result')
  }

  match<R>(handlers: MatchHandlers<T, E, R>): R {
    return handlers.err(this.error)
  }
}

export function ok<T, E = never>(value: T): Result<T, E> {
  return new Ok<T, E>(value)
}

export function err<T = never, E = unknown>(error: E): Result<T, E> {
  return new Err<T, E>(error)
}
