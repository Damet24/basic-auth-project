import { InvalidArgumentError } from '../errors/InvalidArgumentError'
import { StringValueObject } from '../value-boject/StringValueObject'

export class UserRole extends StringValueObject {

  static readonly ADMIN = new UserRole('ADMIN')
  static readonly USER = new UserRole('USER')

  private constructor(value: string) {
    super(value)
  }

  static from(value: string): UserRole {
    switch (value) {
      case 'ADMIN': return UserRole.ADMIN
      case 'USER': return UserRole.USER
      default: throw new InvalidArgumentError('Invalid role')
    }
  }
}
