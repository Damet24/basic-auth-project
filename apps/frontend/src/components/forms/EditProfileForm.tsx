import { zodResolver } from '@hookform/resolvers/zod'
import type { UpdateUserRequest } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import { UpdateUserRequestSchema } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCurrentUser, useUpdateCurrentUser } from '../../hooks/useUser'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

type Props = {
  onCancel?: () => void
  onSuccess?: () => void
}

export function EditProfileForm({ onCancel, onSuccess }: Props) {
  const { data: user } = useCurrentUser()
  const { mutateAsync, isPending } = useUpdateCurrentUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setError,
  } = useForm<UpdateUserRequest>({
    resolver: zodResolver(UpdateUserRequestSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      })
    }
  }, [user, reset])

  async function onSubmit(data: UpdateUserRequest) {
    try {
      const payload = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== ''
        )
      ) as UpdateUserRequest

      await mutateAsync(payload)

      reset(payload)
      onSuccess?.()

    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
    >
      <h2 className="font-semibold text-gray-900 text-lg dark:text-white">
        Edit Profile
      </h2>

      <Input
        inputId="name"
        label="Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        inputId="email"
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      {errors.root && (
        <div className="text-center text-red-500 text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending || !isDirty}
          fullWidth
        >
          {isPending ? 'Updating...' : 'Save Changes'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          fullWidth
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}