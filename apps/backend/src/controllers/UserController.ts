import type { Request, Response } from 'express'
import { userService } from '../di'
import httpStatus from 'http-status'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export class UserController {
  async index(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(400).json({ error: 'User not authenticated' })
    }
    const result = await userService.getAll()
    return res.status(httpStatus.OK).json(result)
  }

  async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(400).json({ error: 'User not authenticated' })
    }
    const user = await userService.getById(req.user.userId)
    return res.status(httpStatus.OK).json(user)
  }
}
