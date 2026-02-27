import { InvalidArgumentError } from '@packages/domain/errors/InvalidArgumentError'
import type { UserRepository } from '../repositories/UserRepository'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<{ id: string; name: string; email: string; role: string }[]> {
    return (await this.userRepository.findAll()).map((user) => ({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    }))
  }

  async getById(id: string): Promise<{ id: string; name: string; email: string; role: string }> {
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
