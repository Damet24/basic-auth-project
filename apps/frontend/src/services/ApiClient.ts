import { API_URL, SESSION_KEY } from '../constants'
import type { Session } from '../types'

function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  return JSON.parse(raw)
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const session = getSession()

  const headers: HeadersInit = {
    ...(options.body && { 'Content-Type': 'application/json' }),
    ...(session?.access_token && {
      Authorization: `Bearer ${session.access_token}`,
    }),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    clearSession()
    throw new Error('Session expired')
  }

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Error ${response.status}`)
  }

  return response.json()
}
