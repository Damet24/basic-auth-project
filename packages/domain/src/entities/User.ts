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

  constructor(id: UserId, name: UserName, email: UserEmail, role: UserRole, passwordHash: PasswordHash) {
    this.id = id
    this.name = name
    this.email = email
    this.role = role
    this.passwordHash = passwordHash
  }

  static create(id: UserId, name: UserName, email: UserEmail, role: UserRole, passwordHash: PasswordHash): User {
    return new User(id, name, email, role, passwordHash)
  }

  static fromPrimitives(id: string, name: string, email: string, role: string, passwordHash: string): User {
    return new User(new UserId(id), new UserName(name), new UserEmail(email), UserRole.from(role), new PasswordHash(passwordHash))
  }

  toPrimitives(): { id: string; name: string; email: string; role: string; passwordHash: string | undefined } {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
      passwordHash: this.passwordHash.value,
    }
  }
}
