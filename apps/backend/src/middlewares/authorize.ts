import type { UserRole } from '@packages/domain/index'
import type { NextFunction, Response } from 'express'
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export function authorize(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!allowedRoles.some((role) => role.equals(req.user!.role))) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  }
}
