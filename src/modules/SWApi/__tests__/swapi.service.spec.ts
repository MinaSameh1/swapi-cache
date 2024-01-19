import { Test, TestingModule } from '@nestjs/testing'
import { HttpService } from 'src/common/services'
import { SWApiService } from '../swapi.service'
import { generateManyFakeSwapiPeople } from './generator'
import { AppServicesModule } from 'src/common/services/app.service'

describe('SwapiService', () => {
  let service: SWApiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SWApiService],
    })
      .useMocker(token => {
        if (token === HttpService) {
          return {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get: (_url: string) => {
              const results = generateManyFakeSwapiPeople()
              return {
                results,
                count: results.length,
                next: null,
                previous: null,
              }
            },
          }
        }
        return null
      })
      .compile()

    service = module.get<SWApiService>(SWApiService)
  })

  // Check all is fine
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Unit Testing', () => {
    it('should return movies', async () => {
      const movies = await service.getMovies()
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(0)
    })

    it('should accept a name parameter', async () => {
      const movies = await service.getMovies('A New Hope')
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(0)
    })

    it('should return people', async () => {
      const people = await service.getPeople()
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(0)
    })

    it('should accept a name parameter', async () => {
      const people = await service.getPeople('Luke Skywalker')
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(0)
    })
  })

  // Does actual HTTP calls
  describe.skip('Integration Testing', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AppServicesModule.forFeature(HttpService.name)],
        providers: [SWApiService],
      }).compile()

      service = module.get<SWApiService>(SWApiService)
    })

    it('should return movies', async () => {
      const movies = await service.getMovies()
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(0)
    })

    it('should accept a name parameter', async () => {
      const movies = await service.getMovies('A New Hope')
      console.log(movies)
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(0)
    })

    it('should return people', async () => {
      const people = await service.getPeople()
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(0)
    })

    it('should accept a name parameter', async () => {
      const people = await service.getPeople('Luke Skywalker')
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(0)
    })
  })
})
