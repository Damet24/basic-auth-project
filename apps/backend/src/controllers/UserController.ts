import { UserId } from '@packages/domain/index'
import type { Response } from 'express'
import httpStatus from 'http-status'
import { userService } from '../di'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'
import { DeleteUserRequestSchema } from '@packages/contracts/dtos/requests/DeleteUserRequest'
import { UpdateUserRequestSchema } from '@packages/contracts/dtos/requests/UpdateUserRequest'
import * as z from 'zod'

export class UserController {
  async index(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }
    const result = await userService.getAll()
    return res.status(httpStatus.OK).json(result)
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

    const result = await userService.delete(new UserId(parsed.data?.id))
    result.match({
      ok: () => res.status(httpStatus.OK).send('User deleted'),
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
      },
    })
  }

  async update(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }

    const parsed = UpdateUserRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error })
    }

    const result = await userService.edit(req.user.userId, parsed.data)
    result.match({
      ok: () => res.status(httpStatus.OK).send('User updated'),
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
      },
    })
  }

    async updateById(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }

    const parsedParams = z.object({id:z.uuid()}).safeParse(req.params)
    if (!parsedParams.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsedParams.error })
    }

    const parsed = UpdateUserRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error })
    }

    const result = await userService.edit(parsedParams.data.id, parsed.data)
    result.match({
      ok: () => res.status(httpStatus.OK).send('User updated'),
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
      },
    })
  }
}
