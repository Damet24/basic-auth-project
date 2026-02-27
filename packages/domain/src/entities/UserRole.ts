import { InvalidArgumentError } from '../errors/InvalidArgumentError'
import { StringValueObject } from '../value-boject/StringValueObject'

export class UserRole extends StringValueObject {
  private static readonly VALUES = ['ADMIN', 'USER'] as const

  static readonly ADMIN = new UserRole('ADMIN')
  static readonly USER = new UserRole('USER')

  private constructor(value: string) {
    super(value)
  }

  static from(value: string): UserRole {
    if (!UserRole.VALUES.includes(value as typeof UserRole.VALUES[number])) {
      throw new InvalidArgumentError('Invalid role')
    }

    return value === 'ADMIN' ? UserRole.ADMIN : UserRole.USER
  }

  static values(): readonly string[] {
    return UserRole.VALUES
  }

  isAdmin(): boolean {
    return this.equals(UserRole.ADMIN)
  }

  isUser(): boolean {
    return this.equals(UserRole.USER)
  }
}
