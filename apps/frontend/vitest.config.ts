import path from 'node:path'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.test.{ts,tsx}'],
      root: path.resolve(__dirname),
      globals: true,
      setupFiles: ['./tests/setup.ts'],
    },
    resolve: {
      alias: {
        '@packages/domain': path.resolve(__dirname, '../../packages/domain/src'),
        '@packages/contracts': path.resolve(__dirname, '../../packages/contracts/src'),
      },
    },
  }),
)
