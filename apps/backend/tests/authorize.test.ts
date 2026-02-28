import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authorize } from '../src/middlewares/authorize'
import type { AuthenticatedRequest } from '../src/types/AuthenticatedRequest'
import type { Response, NextFunction } from 'express'
import { UserRole } from '@packages/domain/entities/UserRole'

describe('authorize', () => {
  let mockRes: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    }
    mockNext = vi.fn()
  })

  it('returns 401 when req.user is not set', () => {
    const req = {} as AuthenticatedRequest
    const middleware = authorize(UserRole.ADMIN)
    middleware(req, mockRes as Response, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('returns 403 when user role is not in allowed roles', () => {
    const req = { user: { userId: '1', role: UserRole.USER } } as AuthenticatedRequest
    const middleware = authorize(UserRole.ADMIN)
    middleware(req, mockRes as Response, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Forbidden' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('calls next() when user role is allowed', () => {
    const req = { user: { userId: '1', role: UserRole.ADMIN } } as AuthenticatedRequest
    const middleware = authorize(UserRole.ADMIN)
    middleware(req, mockRes as Response, mockNext)
    expect(mockNext).toHaveBeenCalledTimes(1)
    expect(mockRes.status).not.toHaveBeenCalled()
  })

  it('calls next() when user has one of multiple allowed roles', () => {
    const req = { user: { userId: '1', role: UserRole.USER } } as AuthenticatedRequest
    const middleware = authorize(UserRole.ADMIN, UserRole.USER)
    middleware(req, mockRes as Response, mockNext)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })
})
