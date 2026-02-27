import { PasswordHash } from '@packages/domain/entities/PasswordHash'
import { PlainPassword } from '@packages/domain/entities/PlainPassword'
import { User, UserEmail, UserId, UserName, UserRole } from '@packages/domain/index'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import type { UserRepository } from '../repositories/UserRepository'
import type { LoginRequest, Token, RegisterUserRequest, RegisterUserResponse } from '@packages/contracts/index'
import type { PasswordHasher } from './PasswordHasher'
import { ok, err, type Result } from '@packages/domain/shared/Result'

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passswordHasher: PasswordHasher,
  ) {}

  async login({ email, password }: LoginRequest): Promise<Result<Token, Error>> {
    const result = await this.userRepository.findByEmail(email)
    if (result.isErr()) return err(new Error('Invalid credentials'))
    const user = result.unwrap()
    const isPasswordValid = await this.passswordHasher.compare(password, user.passwordHash.value)
    if (!isPasswordValid) return err(new Error('Invalid credentials'))
    // en algun momento se puede megrar esta funcionalidad a un JWTService,
    // si se llega a necesitar, o si llegara a crecer
    const accessToken = jwt.sign(
      {
        sub: user.id.value,
        role: user.role.value,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    )

    return ok({ access_token: accessToken, expires_in: config.jwt.expiresIn })
  }

  async register({ email, name, password }: RegisterUserRequest): Promise<Result<RegisterUserResponse, Error>> {
    const result = await this.userRepository.findByEmail(email)
    if (result.isErr()) return err(new Error('User already exists'))

    const plainPassword = PlainPassword.create(password)
    if (plainPassword.isErr()) {
      return err(plainPassword.error)
    }
    const hashed = await this.passswordHasher.hash(plainPassword.value.value)
    const passwordHash = new PasswordHash(hashed)

    const user = User.create(UserId.random(), new UserName(name), new UserEmail(email), UserRole.USER, passwordHash)
    await this.userRepository.save(user)
    return ok({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      role: user.role.value,
    })
  }
}
