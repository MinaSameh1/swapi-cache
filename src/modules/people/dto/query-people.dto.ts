import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const QueryPeopleSchema = z.object({
  name: z.string().optional().describe('The name of the person to find'),
})

export class QueryPeopleDto extends createZodDto(QueryPeopleSchema) {}
