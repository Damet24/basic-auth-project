import { LoginRequestSchema } from '@packages/contracts/dtos/requests/LoginRequest'
import type { Request, Response } from 'express'
import { authService } from '../di'
import { RegisterUserRequestSchema } from '@packages/contracts/index'

export class AuthController {
  async login(req: Request, res: Response) {
    const parsed = LoginRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error })
    }
    const result = await authService.login({ email: parsed.data.email, password: parsed.data.password })
    return res.json(result)
  }

  async register(req: Request, res: Response) {
    const parsed = RegisterUserRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error })
    }

    return res.json(
      await authService.register({
        email: parsed.data.email,
        name: parsed.data.name,
        password: parsed.data.password,
      }),
    )
  }
}
