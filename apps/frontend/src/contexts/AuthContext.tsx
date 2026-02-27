import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { SESSION_KEY } from '../constants'
import type { AuthContextType, Session } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (Date.now() > parsed.expires_at) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }

    return parsed
  })

  const logout = useCallback(() => {
    setSession(null)
    localStorage.removeItem(SESSION_KEY)
  }, [])

  const isAuthenticated = !!session && Date.now() < session.expires_at

  const value = useMemo(
    () => ({
      session,
      logout,
      isAuthenticated,
    }),
    [session, logout, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
