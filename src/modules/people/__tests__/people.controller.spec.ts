import { Test, TestingModule } from '@nestjs/testing'
import { PeopleController } from '../people.controller'
import { PeopleService } from '../people.service'
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestDatabaseModule } from 'src/common/database'
import { PersonEntity } from 'src/entities/person.entity'
import { SWApiModule } from 'src/modules/SWApi/swapi.module'
import { PeopleRepository } from '../people.repository'
import { QueryPeopleDto } from '../dto/query-people.dto'
import { HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from 'src/common/services'
import { getMockedHttpGetForSwapi } from 'src/modules/SWApi/__tests__/swapi.mocks'
import {
  generateFakeSwapiPeople,
  generateManyFakeSwapiPeople,
} from 'src/modules/SWApi/__tests__/generator'

describe('PeopleController', () => {
  let controller: PeopleController
  const pagination = { page: 1, take: 10, skip: 0 }
  let one = jest.fn()
  let many = jest.fn()

  beforeEach(async () => {
    one = jest.fn()
    many = jest.fn()
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        // use memory
        CacheModule.register(),
        TypeOrmModule.forFeature([PersonEntity]),
        SWApiModule,
      ],
      controllers: [PeopleController],
      providers: [PeopleService, PeopleRepository],
    })
      .overrideProvider(HttpService)
      .useValue(
        getMockedHttpGetForSwapi(HttpService, {
          one,
          many,
        }),
      )
      .compile()

    controller = module.get<PeopleController>(PeopleController)
    const cacheManager = module.get(CACHE_MANAGER)
    cacheManager.reset()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return people', async () => {
    many.mockReturnValueOnce(generateManyFakeSwapiPeople())
    const people = await controller.findAll(pagination)
    expect(people).toBeDefined()
    expect(people.items.length).toBeGreaterThan(1)
  })

  it('should return people with pagination', async () => {
    const search = new QueryPeopleDto()
    search.name = 'Luke'
    many.mockReturnValueOnce([
      {
        ...generateFakeSwapiPeople(),
        name: 'Luke Skywalker',
      },
    ])
    const people = await controller.findAll(pagination, search)
    expect(people).toBeDefined()
    expect(people.items).toHaveLength(1)
  })

  it('Should throw error empty when there is no data', async () => {
    try {
      many.mockReturnValueOnce([])
      await controller.findAll({
        page: 10,
        take: 10,
        skip: 100,
      })
    } catch (err) {
      console.log('err', err)
      expect(err).toBeInstanceOf(HttpException)
      expect(err.getStatus()).toBe(HttpStatus.NO_CONTENT)
    }
  })

  it('should return a person', async () => {
    one.mockReturnValueOnce({
      ...generateFakeSwapiPeople(),
      name: 'Luke Skywalker',
    })
    const person = await controller.findOne(1)
    expect(person).toBeDefined()
    expect(person.name).toBeDefined()
  })
})
