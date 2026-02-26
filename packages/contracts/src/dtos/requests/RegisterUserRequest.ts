import * as z from 'zod'

export const RegisterUserRequestSchema = z.object({
  email: z.email(),
  name: z.string().min(4),
  password: z.string().min(6),
})

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>
