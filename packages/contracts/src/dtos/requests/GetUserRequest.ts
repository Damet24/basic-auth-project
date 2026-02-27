import * as z from 'zod'

export const GetUserRequestSchema = z.object({
  id: z.uuid(),
})

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>
