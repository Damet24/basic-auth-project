import type { UserRepository } from '../repositories/UserRepository'
import type { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'
import type { UserId } from '@packages/domain/index'
import { ok, err, type Result } from '@packages/domain/shared/Result'

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

  async delete(id: UserId): Promise<void> {
    await this.userRepository.remove(id.value)
  }
}
