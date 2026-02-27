import type { User } from '@packages/domain/entities/User'
import type { Pool } from 'pg'
import type { UserRepository } from '../../UserRepository'
import { UserMapper } from './UserMapper'
import type { UserRow } from './UserRow'
import { err, ok, type Result } from '@packages/domain/shared/Result'
import { NotFoundError } from '@packages/domain/errors/NotFoundError'

export class PostgresqlUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<Result<User[], NotFoundError>> {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        r.name AS role,
        u.password_hash
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.deleted_at IS NULL
    `

    const result = await this.pool.query<UserRow>(query)

    return ok(result.rows.map(UserMapper.toDomain))
  }

  async findById(id: string): Promise<Result<User, NotFoundError>> {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        r.name AS role,
        u.password_hash
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.id = $1
      AND u.deleted_at IS NULL
    `

    const result = await this.pool.query<UserRow>(query, [id])

    if (result.rowCount === 0) {
      return err(new NotFoundError('User not found'))
    }

    return ok(UserMapper.toDomain(result.rows[0]!))
  }

  async findByEmail(email: string): Promise<Result<User, NotFoundError>> {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        r.name AS role,
        u.password_hash
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.email = $1
      AND u.deleted_at IS NULL
    `

    console.log(email)

    const result = await this.pool.query<UserRow>(query, [email])

    console.log(result)

    if (result.rowCount === 0) {
      return err(new NotFoundError('User not found'))
    }

    return ok(UserMapper.toDomain(result.rows[0]!))
  }

  async save(user: User): Promise<void> {
    const row = UserMapper.toPersistence(user)

    const query = `
      INSERT INTO users (id, email, name, password_hash, role_id)
      VALUES (
        $1,
        $2,
        $3,
        $4,
        (SELECT id FROM roles WHERE name = $5 AND deleted_at IS NULL)
      )
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash,
        role_id = EXCLUDED.role_id,
        deleted_at = NULL
    `

    await this.pool.query(query, [
      row.id,
      row.email,
      row.name,
      row.password_hash,
      row.role,
    ])
  }

  async update(
    id: string,
    data: Partial<{ name: string; email: string; role: string }>
  ): Promise<Result<boolean, NotFoundError>> {

    const query = `
      UPDATE users
      SET
        name = COALESCE($2, name),
        email = COALESCE($3, email),
        role_id = COALESCE(
          (SELECT id FROM roles WHERE name = $4 AND deleted_at IS NULL),
          role_id
        )
      WHERE id = $1
      AND deleted_at IS NULL
    `

    const result = await this.pool.query(query, [
      id,
      data.name ?? null,
      data.email ?? null,
      data.role ?? null,
    ])

    if (result.rowCount === 0) {
      return err(new NotFoundError('User not found'))
    }

    return ok(true)
  }

  async remove(id: string): Promise<Result<boolean, NotFoundError>> {
    const query = `
      UPDATE users
      SET deleted_at = NOW()
      WHERE id = $1
      AND deleted_at IS NULL
    `

    const result = await this.pool.query(query, [id])

    if (result.rowCount === 0) {
      return err(new NotFoundError('User not found'))
    }

    return ok(true)
  }
}