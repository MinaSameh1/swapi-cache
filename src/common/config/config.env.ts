import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('8000'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('5432'),
  DB_USERNAME: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_NAME: z.string().default('postgres'),
})

export function validate(config: Record<string, unknown>) {
  const validatedConfig = envSchema.parse(config)
  return validatedConfig
}
