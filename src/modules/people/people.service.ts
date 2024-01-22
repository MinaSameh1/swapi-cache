import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { PaginationQuery } from 'src/common/dtos'
import { PaginatedDto } from 'src/common/dtos/paginated.dto'
import { FindParams } from 'src/common/types/db.type'
import { PersonEntity } from 'src/entities/person.entity'
import { SWApiService } from '../SWApi/swapi.service'
import { QueryPeopleDto } from './dto/query-people.dto'
import { cacheTtl } from './people.assets'
import { PeopleRepository } from './people.repository'

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name)

  constructor(
    @Inject(PeopleRepository)
    private readonly personRepository: PeopleRepository,
    @Inject(SWApiService)
    private readonly swapiService: SWApiService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(
    pagination: PaginationQuery,
    query?: QueryPeopleDto,
    select?: FindParams<PersonEntity>['select'],
  ): Promise<PaginatedDto<PersonEntity>> {
    let items: [PersonEntity[], number] = [[], 0]
    const filter = query?.toFilter()
    const peopleFilterCacheKey = `people:page:${pagination.page}:${String(filter)}`
    const peopleCacheKey = `people:page:${pagination.page}`
    this.logger.debug(`Find All People ${JSON.stringify(filter)}`)

    const cached = await this.cacheManager.get<PersonEntity[]>(
      filter ? peopleFilterCacheKey : peopleCacheKey,
    )
    if (cached) {
      this.logger.debug('Found cached people')
      const total = await this.personRepository.countBy({ ...filter })
      return {
        items: JSON.parse(cached as unknown as string),
        total,
        pages: Math.ceil(total / pagination.take),
      }
    }

    items = await this.personRepository.findAndCount({
      select,
      where: filter,
      skip: pagination.skip,
      take: pagination.take,
    })

    if (items[0].length > 0 && items[1] > 0) {
      await this.cacheManager.set(
        filter ? peopleFilterCacheKey : peopleCacheKey,
        JSON.stringify(items[0]),
        cacheTtl,
      )
      return {
        items: items[0],
        total: items[1],
        pages: Math.ceil(items[1] / pagination.take),
      }
    }

    const swapiPeople = await this.swapiService.getPeople({
      name: query?.name,
      page: pagination.page,
    })

    if (
      !swapiPeople ||
      swapiPeople?.results.length < 1 ||
      swapiPeople?.count < 1
    )
      throw new HttpException('No data', HttpStatus.NO_CONTENT)

    let people = this.personRepository.create(
      swapiPeople.results.map(p => ({
        ...p,
        moviesIds: p.films.map(film => film.split('/').slice(-2)[0]),
      })),
    )

    await this.personRepository.save(people)
    // Manually select the fields to return to the client
    if (select !== undefined)
      people = people.map(p => {
        const obj = {}
        for (const key of Object.keys(select)) {
          if (select[key]) obj[key] = p[key]
        }
        return obj as PersonEntity
      })
    await this.cacheManager.set(
      filter ? peopleFilterCacheKey : peopleCacheKey,
      JSON.stringify(people),
      cacheTtl,
    )
    return {
      items: people,
      total: swapiPeople.count,
      pages: Math.ceil(swapiPeople.count / pagination.take),
    }
  }

  async findOne(id: number) {
    this.logger.debug(`Find Person ${id}`)
    const personCacheKey = `person:${id}`
    const cachedItem = await this.cacheManager.get<PersonEntity>(personCacheKey)
    if (cachedItem) return JSON.parse(cachedItem as unknown as string)
    const item = await this.personRepository.findOneBy({ id: id.toString() })
    if (item) {
      await this.cacheManager.set(
        personCacheKey,
        JSON.stringify(item),
        cacheTtl,
      )
      return item
    }
    const swapiPerson = await this.swapiService.getPerson(id).catch(() => null)
    if (!swapiPerson) return null

    const person = this.personRepository.create({
      ...swapiPerson,
      moviesIds: swapiPerson.films.map(film => film.split('/').slice(-2)[0]),
    })
    await this.personRepository.save(person)
    await this.cacheManager.set(
      personCacheKey,
      JSON.stringify(person),
      cacheTtl,
    )
    return person
  }
}
