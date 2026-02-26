import type { User } from '@packages/domain/entities/User'
import type { Pool } from 'pg'
import type { UserRepository } from '../../UserRepository'
import { UserMapper } from './UserMapper'
import type { UserRow } from './UserRow'

export class PostgresqlUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<User[]> {
    const query = `
      SELECT id, name, email, role, password_hash
      FROM users
    `

    const result = await this.pool.query<UserRow>(query)

    if (result.rowCount === 0) return []

    return result.rows.map(row => UserMapper.toDomain(row))
  }

  async save(user: User): Promise<void> {
    const row = UserMapper.toPersistence(user)

    const query = `
      INSERT INTO users (id, email, name, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role
    `

    await this.pool.query(query, [row.id, row.email, row.name, row.password_hash, row.role])
  }

  async findById(id: string): Promise<User | null> {
    const query = `
      SELECT id, name, email, role, password_hash
      FROM users
      WHERE id = $1
    `

    const result = await this.pool.query<UserRow>(query, [id])

    if (result.rowCount === 0) return null

    return UserMapper.toDomain(result.rows[0]!)
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT id, name, email, role, password_hash
    FROM users
    WHERE email = $1
    `
    
    const result = await this.pool.query<UserRow>(query, [email])
    
    if (result.rowCount === 0) return null
    
    return UserMapper.toDomain(result.rows[0]!)
  }
}
