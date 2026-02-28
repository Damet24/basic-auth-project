import { InvalidArgumentError } from '../errors/InvalidArgumentError'
import { type Result, ok, err } from '../shared/Result'
import { StringValueObject } from '../value-boject/StringValueObject'

export class PlainPassword extends StringValueObject {
  static readonly MIN_LENGTH = 12
  static readonly MAX_LENGTH = 128

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): Result<PlainPassword, InvalidArgumentError> {
    const validationError = PlainPassword.validate(value)

    if (validationError) {
      return err(validationError)
    }

    return ok(new PlainPassword(value))
  }

  private static validate(password: string): InvalidArgumentError | null {
    if (password.length < PlainPassword.MIN_LENGTH) {
      return new InvalidArgumentError(`Password must be at least ${PlainPassword.MIN_LENGTH} characters long`)
    }

    if (password.length > PlainPassword.MAX_LENGTH) {
      return new InvalidArgumentError(`Password must be less than ${PlainPassword.MAX_LENGTH} characters`)
    }

    if (!/[A-Z]/.test(password)) {
      return new InvalidArgumentError('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      return new InvalidArgumentError('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      return new InvalidArgumentError('Password must contain at least one number')
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return new InvalidArgumentError('Password must contain at least one special character')
    }

    if (/^([a-zA-Z0-9])\1+$/.test(password)) {
      return new InvalidArgumentError('Password cannot be repeated characters only')
    }

    return null
  }
}
