export interface UserRow {
  id: string
  name: string
  email: string
  role: string
  password_hash: string
  deleted_at: string | null
}