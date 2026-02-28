import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setSession, clearSession, apiFetch } from '../../src/services/ApiClient'
import { SESSION_KEY } from '../../src/constants/api'

const mockFetch = vi.fn()

describe('ApiClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
    localStorage.removeItem(SESSION_KEY)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('setSession / clearSession', () => {
    it('setSession stores session in localStorage', () => {
      setSession({
        access_token: 'token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      })
      const raw = localStorage.getItem(SESSION_KEY)
      expect(raw).toBeTruthy()
      const parsed = JSON.parse(raw!)
      expect(parsed.access_token).toBe('token')
    })

    it('clearSession removes session from localStorage', () => {
      setSession({
        access_token: 't',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      })
      clearSession()
      expect(localStorage.getItem(SESSION_KEY)).toBeNull()
    })
  })

  describe('apiFetch', () => {
    it('adds Authorization header when session exists', async () => {
      setSession({
        access_token: 'bearer-token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      })
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({}),
      })
      await apiFetch('/test')
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer bearer-token',
          }),
        }),
      )
    })

    it('adds Content-Type application/json when body is sent', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({}),
      })
      await apiFetch('/test', { method: 'POST', body: JSON.stringify({ x: 1 }) })
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      )
    })

    it('on 401 clears session and throws Session expired', async () => {
      setSession({
        access_token: 't',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      })
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        text: () => Promise.resolve(''),
      })
      await expect(apiFetch('/test')).rejects.toThrow('Session expired')
      expect(localStorage.getItem(SESSION_KEY)).toBeNull()
    })

    it('on !response.ok throws with error text', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not found'),
      })
      await expect(apiFetch('/test')).rejects.toThrow('Not found')
    })

    it('returns json when content-type is application/json', async () => {
      const data = { id: '1', name: 'Test' }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(data),
      })
      const result = await apiFetch<typeof data>('/users')
      expect(result).toEqual(data)
    })
  })
})
