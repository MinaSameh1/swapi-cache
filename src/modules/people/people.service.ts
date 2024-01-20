import { Inject, Injectable } from '@nestjs/common'
import { PeopleRepository } from './people.repository'
import { QueryPeopleDto } from './dto/query-people.dto'
import { PersonEntity } from 'src/entities/person.entity'
import { PaginationQuery } from 'src/common/dtos'
import { PaginatedDto } from 'src/common/dtos/paginated.dto'
import { FindParams } from 'src/common/types/db.type'

@Injectable()
export class PeopleService {
  @Inject(PeopleRepository)
  private readonly personRepository: PeopleRepository

  async findAll(
    pagination: PaginationQuery,
    query?: QueryPeopleDto,
    select?: FindParams<PersonEntity>['select'],
  ): Promise<PaginatedDto<PersonEntity>> {
    let items: [PersonEntity[], number] = [[], 0]
    if (query?.name)
      items = await this.personRepository.findAndCountWithMoviesByName(
        query?.name,
        {
          select,
          skip: pagination.skip,
          take: pagination.take,
        },
      )

    items = await this.personRepository.findAndCountWithMovies({
      skip: pagination.skip,
      take: pagination.take,
    })
    if (items[0].length === 0) {
      return {
        items: [],
        total: 0,
        pages: 0,
      }
    }
    return {
      items: items[0],
      total: items[1],
      pages: Math.ceil(items[1] / pagination.take),
    }
  }

  findOne(id: number) {
    return this.personRepository.findOneWithMoviesById(id)
  }
}
