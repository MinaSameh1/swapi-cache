import { z } from 'zod'

const envSchema = z.object({
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
  APP_LOGGING_LEVEL: z.string().default('info'),
})

export function validate(config: Record<string, unknown>) {
  const validatedConfig = envSchema.parse(config)
  return validatedConfig
}
