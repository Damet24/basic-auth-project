import type { Token } from '@packages/contracts/index'
import type { PERMISSIONS } from '../constants'

export type Session = Token & {
  expires_at: number
}

export type AuthContextType = {
  session: Session | null
  logout: () => void
  isAuthenticated: boolean
}

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export type NavItem = {
  name: string
  path: string
  permission?: Permission
}

export type AppRoute = {
  path: string
  element: React.ReactNode
  permission?: Permission
  showInSidebar?: boolean
  children?: AppRoute[]
}
