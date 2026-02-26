import { PasswordHash } from '@packages/domain/entities/PasswordHash'
import { PlainPassword } from '@packages/domain/entities/PlainPassword'
import { InvalidArgumentError } from '@packages/domain/errors/InvalidArgumentError'
import { User, UserEmail, UserId, UserName, UserRole } from '@packages/domain/index'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import type { UserRepository } from '../repositories/UserRepository'
import type { LoginRequest, Token, RegisterUserRequest, RegisterUserResponse } from '@packages/contracts/index'
import type { PasswordHasher } from './PasswordHasher'

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passswordHasher: PasswordHasher
  ) {}

  async login({ email, password }: LoginRequest): Promise<Token | null> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) return null

    const isPasswordValid = await this.passswordHasher.compare(password, user.passwordHash.value)

    if (!isPasswordValid) return null

    const accessToken = jwt.sign(
      {
        sub: user.id.value,
        role: user.role.value,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    )

    return { accessToken }
  }

  async register({ email, name, password }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new InvalidArgumentError('User already exists')
    }

    const plainPassword = new PlainPassword(password)
    const hashed = await this.passswordHasher.hash(plainPassword.value)
    const passwordHash = new PasswordHash(hashed)

    const user = User.create(UserId.random(), new UserName(name), new UserEmail(email), UserRole.USER, passwordHash)
    await this.userRepository.save(user)
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    }
  }
}
