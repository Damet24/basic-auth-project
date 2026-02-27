import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { Card } from '../components/ui/Card'
import { LoginForm } from '../components/forms/LoginForm'

export function IndexPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gray-100 dark:bg-gray-900 transition-colors"
    >
      <Card>
        <h1
          className="text-3xl font-bold text-center mb-6 
        text-gray-900 dark:text-white"
        >
          Login
        </h1>

        <LoginForm />
      </Card>
    </div>
  )
}
