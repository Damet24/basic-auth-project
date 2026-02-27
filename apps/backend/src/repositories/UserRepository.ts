import type { User } from '@packages/domain/entities/User'
import type { NotFoundError } from '@packages/domain/errors/NotFoundError'
import type { Result } from '@packages/domain/shared/Result'

export interface UserRepository {
  remove(id: string): Promise<Result<boolean, NotFoundError>>
  save(user: User): Promise<void>
  findById(id: string): Promise<Result<User, NotFoundError>>
  findByEmail(email: string): Promise<Result<User, NotFoundError>>
  findAll(): Promise<Result<User[], NotFoundError>>
}
