import type { Request, Response } from 'express'
import { userService } from '../di'

export class UserController {
  async index(_req: Request, res: Response) {
    const result = await userService.getAll()
    return res.json(result)
  }
}
