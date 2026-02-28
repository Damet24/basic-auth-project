import { PlainPassword } from '@packages/domain/entities/PlainPassword'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useRegister } from '../../hooks/useRegister'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>()

  const password = watch('password')

  async function onSubmit(data: RegisterFormValues) {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      })
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
        inputId="name"
        label="Name"
        type="text"
        autoComplete="name"
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 4, message: 'Name must be at least 4 characters' },
        })}
        error={errors.name?.message}
      />

      <Input
        inputId="email"
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email', {
          required: 'Email is required',
        })}
        error={errors.email?.message}
      />

      <Input
        inputId="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        {...register('password', {
          required: 'Password is required',
          validate: (value) => {
            const result = PlainPassword.create(value)
            return result.isOk() || result.error.message
          },
        })}
        error={errors.password?.message}
      />

      <Input
        inputId="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
        error={errors.confirmPassword?.message}
      />

      {errors.root && (
        <div className="text-center text-red-500 text-sm">{errors.root.message}</div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  )
}
