import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authenticate } from '../src/middlewares/authenticate'
import type { AuthenticatedRequest } from '../src/types/AuthenticatedRequest'
import type { Response, NextFunction } from 'express'
import { UserRole } from '../../../packages/domain/src/entities/UserRole'

vi.mock('../src/config', () => ({
  config: {
    jwt: {
      secret: 'test-secret-min-32-chars!!!!!!!!!!!',
    },
  },
}))

describe('authenticate', () => {
  let mockRes: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    }
    mockNext = vi.fn()
  })

  it('returns 401 when Authorization header is missing', () => {
    const req = { headers: {} } as AuthenticatedRequest
    authenticate(req, mockRes as Response, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Missing token' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('returns 401 when Authorization does not start with Bearer ', () => {
    const req = { headers: { authorization: 'Basic xyz' } } as AuthenticatedRequest
    authenticate(req, mockRes as Response, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Missing token' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('returns 401 when token is invalid or expired', () => {
    const req = { headers: { authorization: 'Bearer invalid-token' } } as AuthenticatedRequest
    authenticate(req, mockRes as Response, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('sets req.user and calls next() when token is valid', async () => {
    const jwt = await import('jsonwebtoken')
    const secret = 'test-secret-min-32-chars!!!!!!!!!!!'
    const token = jwt.sign({ sub: 'user-id-123', role: 'USER' }, secret, { expiresIn: '1h' })
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthenticatedRequest
    authenticate(req, mockRes as Response, mockNext)
    expect(mockNext).toHaveBeenCalledTimes(1)
    expect(req.user).toBeDefined()
    expect(req.user?.userId).toBe('user-id-123')
    expect(req.user?.role).toBeInstanceOf(UserRole)
    expect(req.user?.role.value).toBe('USER')
  })
})
