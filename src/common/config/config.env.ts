import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('production'),
  PORT: z.string().default('8000'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_SCHEMA: z.string(),
  DB_LOGGING: z
    .string()
    .optional()
    .default('false')
    .transform(value => value === 'true'),
  REDIS_URL: z.string().optional().default('redis://localhost:6379'),
  LOGGING_LEVEL: z
    .enum(['debug', 'verbose', 'log', 'warn', 'error', 'info', 'silent'])
    .default('info'),
})

export function validate(config: Record<string, unknown>) {
  const validatedConfig = envSchema.parse(config)
  return validatedConfig
}
