import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('8000'),
  DATABASE_URL: z
    .string()
    .default('postgres://postgres:postgres@localhost:5432/postgres'),
})

export function validate(config: Record<string, unknown>) {
  const validatedConfig = envSchema.parse(config)
  return validatedConfig
}
