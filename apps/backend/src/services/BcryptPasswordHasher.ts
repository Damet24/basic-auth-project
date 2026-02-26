import bcrypt from 'bcrypt'
import type { PasswordHasher } from './PasswordHasher'

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly saltRounds: number) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
