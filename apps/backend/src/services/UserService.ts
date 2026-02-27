import { UpdateUserRequest } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import type { UserRepository } from '../repositories/UserRepository'
import type { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'
import type { User, UserId } from '@packages/domain/index'
import { ok, err, type Result } from '@packages/domain/shared/Result'
import { NotFoundError } from '@packages/domain/errors/NotFoundError'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<Result<UserInfoResponse[], Error>> {
    const result = await this.userRepository.findAll()

    return result.match({
      ok(value) {
        return ok(
          value.map((user) => ({
            id: user.id.value,
            name: user.name.value,
            email: user.email.value,
            role: user.role.value,
          })),
        )
      },
      err(error) {
        return err(error)
      },
    })
  }

  async getById(id: UserId): Promise<Result<UserInfoResponse, Error>> {
    const result = await this.userRepository.findById(id.value)

    return result.match({
      ok(user) {
        return ok({
          id: id.value,
          name: user.name.value,
          email: user.email.value,
          role: user.role.value,
        })
      },
      err(error) {
        return err(error)
      },
    })
  }

  async delete(id: UserId): Promise<Result<boolean, NotFoundError>> {
    const result = await this.userRepository.remove(id.value)
    return result.match({
      ok: () => {
        return ok(true)
      },
      err(error) {
        return err(error)
      },
    })
  }

  async edit(payload: UpdateUserRequest): Promise<Result<boolean, NotFoundError>> {
    const userResult = await this.userRepository.findById(payload.id)

    if (userResult.isErr()) {
      return err(userResult.error)
    }

    const result = await this.userRepository.update(payload.id, Object.fromEntries(
      Object.entries({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      }).filter(([, value]) => value !== undefined)
    ))

    return result.match({
      ok: () => {
        return ok(true)
      },
      err(error) {
        return err(error)
      },
    })
  }
}
