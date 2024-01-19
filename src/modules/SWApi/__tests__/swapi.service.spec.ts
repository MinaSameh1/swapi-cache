import { Test, TestingModule } from '@nestjs/testing'
import { HttpService } from 'src/common/services'
import { AppServicesModule } from 'src/common/services/app.service'
import { SWApiService } from '../swapi.service'
import { generateManyFakeSwapiPeople } from './generator'

describe('SwapiService', () => {
  describe('Unit Testing', () => {
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
  describe('Integration Testing', () => {
    let service: SWApiService

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AppServicesModule.forFeature(HttpService.name)],
        providers: [SWApiService],
      }).compile()

      service = module.get<SWApiService>(SWApiService)
    })

    // Check all is fine
    it('should be defined', () => {
      expect(service).toBeDefined()
    })

    it('should return movies', async () => {
      const movies = await service.getMovies()
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(0)
      expect(movies.results[0].title).toBeDefined()
      expect(typeof movies.results[0].title).toBe('string')
    })

    it('should make sure the movie shape is correct', async () => {
      const movies = await service.getMovies()
      expect(movies).toBeDefined()
      expect(movies.results.length).toBeGreaterThan(1)
      expect(movies.results[0].title).toBeDefined()
      expect(typeof movies.results[0].title).toBe('string')
      expect(movies.results[0].characters).toBeDefined()
      expect(Array.isArray(movies.results[0].characters)).toBeTruthy()
      expect(movies.results[0].characters.length).toBeGreaterThan(0)
      expect(movies.results[0].episode_id).toBeDefined()
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

    it('should make sure people shape is correct', async () => {
      const people = await service.getPeople()
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(1)
      expect(typeof people.results[0].name).toBe('string')
      expect(Array.isArray(people.results[0].films)).toBeTruthy()
      expect(people.results[0].homeworld).toBeDefined()
      expect(typeof people.results[0].height).toBe('string')
      expect(people.results[0].gender).toBeDefined()
    })

    it('should accept a name parameter', async () => {
      const people = await service.getPeople('Luke Skywalker')
      expect(people).toBeDefined()
      expect(people.results.length).toBeGreaterThan(0)
    })
  })
})
