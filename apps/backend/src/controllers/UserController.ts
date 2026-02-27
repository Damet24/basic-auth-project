import { UserId } from '@packages/domain/index'
import type { Response } from 'express'
import httpStatus from 'http-status'
import { userService } from '../di'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'
import { DeleteUserRequestSchema } from '@packages/contracts/dtos/requests/DeleteUserRequest'

export class UserController {
  async index(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }
    const result = await userService.getAll()
    result.match({
      ok(value) {
        return res.status(httpStatus.OK).json(value)
      },
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).json(error.message)
      },
    })
  }

  async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }
    const result = await userService.getById(new UserId(req.user.userId))
    return result.match({
      ok(value) {
        return res.status(httpStatus.OK).json(value)
      },
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).json(error.message)
      },
    })
  }

  async delete(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }

    const parsed = DeleteUserRequestSchema.safeParse(req.params)
    if (!parsed.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error })
    }

    await userService.delete(new UserId(parsed.data?.id))
    return res.status(httpStatus.OK).send('user deleted')
  }
}
