import { Navigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import { usePermissions } from '../../hooks/usePermissions'
import type { Permission } from '../../types'

type Props = {
  children: React.ReactNode
  requiredPermission?: Permission
}

export function ProtectedRoute({ children, requiredPermission }: Props) {
  const { isAuthenticated } = useAuth()
  const { can } = usePermissions()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (requiredPermission && !can(requiredPermission)) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
