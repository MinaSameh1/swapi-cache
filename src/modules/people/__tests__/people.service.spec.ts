import { CacheModule } from '@nestjs/cache-manager'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestDatabaseModule } from 'src/common/database'
import { PersonEntity } from 'src/entities/person.entity'
import { SWApiModule } from 'src/modules/SWApi/swapi.module'
import { QueryPeopleDto } from '../dto/query-people.dto'
import { PeopleRepository } from '../people.repository'
import { PeopleService } from '../people.service'
import { getMockedHttpGetForSwapi } from 'src/modules/SWApi/__tests__/swapi.mocks'
import { HttpService } from 'src/common/services'

describe('PeopleService', () => {
  let service: PeopleService
  const pagination = { page: 1, take: 10, skip: 0 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        CacheModule.register(),
        TypeOrmModule.forFeature([PersonEntity]),
        SWApiModule,
      ],
      providers: [PeopleService, PeopleRepository],
    })
      .overrideProvider(HttpService)
      .useValue(getMockedHttpGetForSwapi(HttpService))
      .compile()

    service = module.get<PeopleService>(PeopleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of people', async () => {
      const results = await service.findAll(pagination)
      expect(results).toMatchObject({
        items: expect.any(Array),
        total: expect.any(Number),
        pages: expect.any(Number),
      })
    })

    it('should return an array of people with search', async () => {
      const search = new QueryPeopleDto()
      search.name = 'Luke'
      const results = await service.findAll(pagination, search)
      expect(results).toMatchObject({
        items: expect.any(Array),
        total: expect.any(Number),
        pages: expect.any(Number),
      })
    })
  })

  describe('findOne', () => {
    it('should return a person', async () => {
      const person = await service.findOne(1)
      expect(person).toBeDefined()
      expect(person).toHaveProperty('id')
    })
  })
})
