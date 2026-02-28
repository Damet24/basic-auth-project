import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useLogin } from '../../hooks/useLogin'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

type LoginFormValues = {
  email: string
  password: string
}

export function LoginForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>()

  async function onSubmit(data: LoginFormValues) {
    try {
      await mutateAsync(data)

      navigate('/home')
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        inputId="email"
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
        })}
        error={errors.email?.message}
      />

      <Input
        inputId="password"
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
        })}
        error={errors.password?.message}
      />

      {errors.root && <div className="text-center text-red-500 text-sm">{errors.root.message}</div>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
