import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestDatabaseModule } from 'src/common/database'
import { PersonEntity } from 'src/entities/person.entity'
import { PeopleRepository } from '../people.repository'
import { PeopleService } from '../people.service'

describe('PeopleService', () => {
  let service: PeopleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule, TypeOrmModule.forFeature([PersonEntity])],
      providers: [PeopleService, PeopleRepository],
    }).compile()

    service = module.get<PeopleService>(PeopleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('find', () => {
    it('should return an array of people', () => {
      expect(service.findAll()).toBe([])
    })
  })
})
