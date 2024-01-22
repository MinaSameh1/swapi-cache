import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { FindParams } from 'src/common/types'
import { PersonEntity } from 'src/entities/person.entity'

export const QueryPeopleSchema = z.object({
  name: z.string().optional().describe('The name of the person to find'),
})

export class QueryPeopleDto extends createZodDto(QueryPeopleSchema) {
  static fromPartial(
    partial: Partial<QueryPeopleDto> | undefined,
  ): QueryPeopleDto | undefined {
    if (!partial || Object.keys(partial).length === 0) {
      return undefined
    }
    return Object.assign(new QueryPeopleDto(), partial)
  }

  toFilter(): FindParams<PersonEntity>['where'] {
    return {
      name: this.name,
    }
  }
}
