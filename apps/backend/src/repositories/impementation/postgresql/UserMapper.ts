import { User } from '@packages/domain/entities/User'
import type { UserRow } from './UserRow'

export class UserMapper {
  static toDomain(row: UserRow): User {
    return User.fromPrimitives(row.id, row.name, row.email, row.role, row.password_hash, row.deleted_at ?? undefined)
  }

  static toPersistence(user: User): UserRow {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
      password_hash: user.passwordHash.value,
      deleted_at: user.deletedAt?.toISOString() ?? null,
    }
  }
}
