import { UserRole } from '@packages/domain/index'
import type { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
    role: UserRole
  }
}
