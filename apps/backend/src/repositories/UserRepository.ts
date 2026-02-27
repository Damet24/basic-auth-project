import type { User } from '@packages/domain/entities/User'
import type { NotFoundError } from '@packages/domain/errors/NotFoundError'
import type { Result } from '@packages/domain/shared/Result'

export interface UserRepository {
  remove(id: string): Promise<Result<boolean, NotFoundError>>
  save(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(
    id: string,
    data: Partial<{ name: string; email: string; role: string }>,
  ): Promise<Result<boolean, NotFoundError>>
  findByEmailIncludingDeleted(email: string): Promise<User | null>

  restore(id: string): Promise<Result<boolean, NotFoundError>>

  updatePassword(
    id: string,
    passwordHash: string
  ): Promise<Result<boolean, NotFoundError>>
}
