import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const querySchema = z.object({
  page: z
    .number()
    .int()
    .positive()
    .optional()
    .default(1)
    .transform(v => v - 1)
    .describe('Page number'),
})

export class PaginationQueryDto extends createZodDto(querySchema) {
  page: number

  skip: number
  take: number
}

export interface PaginationQuery {
  skip: number
  take: number
}
