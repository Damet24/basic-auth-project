import type { Token } from '@packages/contracts/index'
export type Session = Token & {
  expires_at: number
}

export type AuthContextType = {
  session: Session | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}
