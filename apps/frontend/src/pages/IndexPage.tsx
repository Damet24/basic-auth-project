import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LoginForm } from '../components/forms/LoginForm'
import { Card } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

export function IndexPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 transition-colors dark:bg-gray-900">
      <Card>
        <h1 className="mb-6 text-center font-bold text-3xl text-gray-900 dark:text-white">Login</h1>

        <LoginForm />
      </Card>
    </div>
  )
}
