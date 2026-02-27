import type { Request, Response } from 'express'
import { userService } from '../di'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export class UserController {
  async index(_req: Request, res: Response) {
    const result = await userService.getAll()
    return res.json(result)
  }

  async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(400).json({ error: 'User not authenticated' })
    }
    const user = await userService.getById(req.user.userId)
    return res.json(user)
  }
}
