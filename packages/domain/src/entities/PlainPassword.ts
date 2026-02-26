import { InvalidArgumentError } from '../errors/InvalidArgumentError'
import { StringValueObject } from '../value-boject/StringValueObject'

export class PlainPassword extends StringValueObject {
  private static readonly MIN_LENGTH = 12
  private static readonly MAX_LENGTH = 128

  constructor(value: string) {
    super(value)
    this.ensureIsValidPassword(value)
  }

  private ensureIsValidPassword(password: string): void {
    if (password.length < PlainPassword.MIN_LENGTH) {
      throw new InvalidArgumentError(`Password must be at least ${PlainPassword.MIN_LENGTH} characters long`)
    }

    if (password.length > PlainPassword.MAX_LENGTH) {
      throw new InvalidArgumentError(`Password must be less than ${PlainPassword.MAX_LENGTH} characters`)
    }

    if (!/[A-Z]/.test(password)) {
      throw new InvalidArgumentError('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      throw new InvalidArgumentError('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      throw new InvalidArgumentError('Password must contain at least one number')
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      throw new InvalidArgumentError('Password must contain at least one special character')
    }

    if (/^([a-zA-Z0-9])\1+$/.test(password)) {
      throw new InvalidArgumentError('Password cannot be repeated characters only')
    }
  }
}
