import * as z from 'zod'

export const UpdateUserRequestSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(4).optional(),
  role: z.string().optional(),
})

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>
