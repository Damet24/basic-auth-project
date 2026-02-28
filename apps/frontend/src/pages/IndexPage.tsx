import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { LoginForm } from '../components/forms/LoginForm'
import { RegisterForm } from '../components/forms/RegisterForm'
import { Card } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

export function IndexPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 transition-colors dark:bg-gray-900">
      <Card>
        <h1 className="mb-6 text-center font-bold text-3xl text-gray-900 dark:text-white">
          {showRegister ? 'Register' : 'Login'}
        </h1>

        {showRegister ? <RegisterForm /> : <LoginForm />}

        <p className="mt-6 text-center text-gray-600 text-sm dark:text-gray-400">
          {showRegister ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Register
              </button>
            </>
          )}
        </p>
      </Card>
    </div>
  )
}
