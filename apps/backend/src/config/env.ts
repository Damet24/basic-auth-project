import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.coerce.number().default(3600),
  JWT_REFRESH_SECRET: z.string().min(32),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

export const env = envSchema.parse(process.env)
