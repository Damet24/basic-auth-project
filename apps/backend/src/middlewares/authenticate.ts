import type { Response, NextFunction } from 'express'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { UserRole } from '@packages/domain/index'

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const token = authHeader.split(' ')[1] as string

  try {
    const payload = jwt.verify(token, config.jwt.secret) as { sub: string; role: string }

    req.user = {
      userId: payload.sub,
      role: UserRole.from(payload.role),
    }

    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
