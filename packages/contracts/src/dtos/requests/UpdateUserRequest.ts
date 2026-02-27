import * as z from 'zod'

export const UpdateUserRequestSchema = z.object({
  id: z.uuid(),
  email: z.email().optional(),
  name: z.string().min(4).optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional()
})

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>
