import { LoginRequestSchema } from '@packages/contracts/dtos/requests/LoginRequest'
import { RegisterUserRequestSchema } from '@packages/contracts/index'
import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import { authService } from '../di'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'
import { ChangePasswordSchema } from '@packages/contracts/dtos/requests/ChangePasswordRequest'

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

  async updatePassword(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not authenticated' })
    }

    const parsed = ChangePasswordSchema.safeParse(req.body)
    if (!parsed.success) { 
      return res.status(httpStatus.BAD_REQUEST).json({ error: parsed.error.message })
    }

    const result = await authService.updatePassword({id: req.user.userId, payload: parsed.data})
     result.match({
      ok: () => res.status(httpStatus.OK).send('User deleted'),
      err(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
      },
    })
  }
}
