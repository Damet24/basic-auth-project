import * as z from 'zod'

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>
