import * as z from 'zod'

export const DeleteUserRequestSchema = z.object({
  id: z.uuid(),
})

export type DeleteUserRequest = z.infer<typeof DeleteUserRequestSchema>
