import { PasswordHash } from './PasswordHash'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserRole } from './UserRole'

export class User {
  readonly id: UserId
  readonly name: UserName
  readonly email: UserEmail
  readonly role: UserRole
  readonly passwordHash: PasswordHash
  readonly deletedAt: Date | undefined

  private constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    role: UserRole,
    passwordHash: PasswordHash,
    deletedAt?: Date,
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.role = role
    this.passwordHash = passwordHash
    this.deletedAt = deletedAt
  }

  static create(id: UserId, name: UserName, email: UserEmail, role: UserRole, passwordHash: PasswordHash): User {
    return new User(id, name, email, role, passwordHash)
  }

  static fromPrimitives(
    id: string,
    name: string,
    email: string,
    role: string,
    passwordHash: string,
    deletedAt: string | undefined,
  ): User {
    return new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      UserRole.from(role),
      new PasswordHash(passwordHash),
      deletedAt ? new Date(deletedAt) : undefined,
    )
  }

  isDeleted(): boolean {
    return this.deletedAt !== undefined && this.deletedAt !== null
  }

  delete(): User {
    return new User(this.id, this.name, this.email, this.role, this.passwordHash, new Date())
  }

  restore(): User {
    return new User(this.id, this.name, this.email, this.role, this.passwordHash, undefined)
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
      passwordHash: this.passwordHash.value,
      deletedAt: this.deletedAt,
    }
  }
}
