import { InvalidArgumentError } from '@packages/domain/errors/InvalidArgumentError'
import type { UserRepository } from '../repositories/UserRepository'
import { UserInfoResponse } from '@packages/contracts/dtos/responses/UserInfoResponse'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserInfoResponse[]> {
    return (await this.userRepository.findAll()).map((user) => ({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    }))
  }

  async getById(id: string): Promise<UserInfoResponse> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new InvalidArgumentError('User not found')
    }

    return {
      id: id,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    }
  }
}
