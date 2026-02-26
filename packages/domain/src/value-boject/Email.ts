import { InvalidArgumentError } from '../errors/InvalidArgumentError'
import { ValueObject } from './ValueObject'

export class Email extends ValueObject<string> {
  private static readonly MAX_LENGTH = 254

  constructor(value: string) {
    super(value.trim().toLowerCase())
    this.ensureIsValidEmail(this.value)
  }

  private ensureIsValidEmail(email: string): void {
    if (!email) {
      throw new InvalidArgumentError(`<${this.constructor.name}> cannot be empty`)
    }

    if (email.length > Email.MAX_LENGTH) {
      throw new InvalidArgumentError(`<${this.constructor.name}> exceeds max length of ${Email.MAX_LENGTH}`)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${email}>`)
    }
  }
}
