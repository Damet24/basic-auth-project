import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserRole } from './UserRole'

export class User {
  readonly id: UserId
  readonly name: UserName
  readonly email: UserEmail
  readonly role: UserRole

  constructor(id: UserId, name: UserName, email: UserEmail, role: UserRole) {
    this.id = id
    this.name = name
    this.email = email
    this.role = role
  }

  static create(id: UserId, name: UserName, email: UserEmail, role: UserRole): User {
    return new User(id, name, email, role)
  }

  static fromPrimitives(id: string, name: string, email: string, role: string): User {
    return new User(new UserId(id), new UserName(name), new UserEmail(email), new UserRole(role))
  }

  toPrimitives(): { id: string; name: string; email: string; role: string } {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
    }
  }
}
