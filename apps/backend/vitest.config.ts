import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    root: path.resolve(__dirname),
    globals: false,
  },
  resolve: {
    alias: {
      '@packages/domain': path.resolve(__dirname, '../../packages/domain/src'),
      '@packages/contracts': path.resolve(__dirname, '../../packages/contracts/src'),
    },
  },
})
