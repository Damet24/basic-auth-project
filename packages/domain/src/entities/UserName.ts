import { StringValueObject } from '../value-boject/StringValueObject'

export class UserName extends StringValueObject {
  private static readonly MIN_LENGTH = 4
  private static readonly MAX_LENGTH = 100

  constructor(value: string) {
    super(value)
    this.ensureIsValidName(value)
  }

  private ensureIsValidName(name: string): void {
    if (name.length < UserName.MIN_LENGTH || name.length > UserName.MAX_LENGTH) {
      throw new Error(`UserName must be between ${UserName.MIN_LENGTH} and ${UserName.MAX_LENGTH} characters`)
    }
  }
}
