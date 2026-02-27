import { LoginRequestSchema } from '@packages/contracts/dtos/requests/LoginRequest'
import { RegisterUserRequestSchema } from '@packages/contracts/index'
import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import { authService } from '../di'

export class AuthController {
  async login(req: Request, res: Response) {
    const parsed = LoginRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error })
    }
    const result = await authService.login({ email: parsed.data.email, password: parsed.data.password })

    return result.match({
      ok(value) {
        return res.status(httpStatus.OK).json(value)
      },
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).json(error.message)
      },
    })
  }

  async register(req: Request, res: Response) {
    const parsed = RegisterUserRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error })
    }

    const result = await authService.register({
      email: parsed.data.email,
      name: parsed.data.name,
      password: parsed.data.password,
    })

    return result.match({
      ok(value) {
        return res.status(httpStatus.CREATED).json(value)
      },
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).json(error.message)
      },
    })
  }
}
