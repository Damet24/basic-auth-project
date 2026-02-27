import { Navigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

type Props = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
