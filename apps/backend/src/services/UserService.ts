import type { UserRepository } from '../repositories/UserRepository'

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
  
  async getAll(): Promise<{ id: string; name: string; email: string; role: string }[]> {
    return (await this.userRepository.findAll()).map(user => ({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    }));
  }
}
