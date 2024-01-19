import { Inject, Injectable, Logger } from '@nestjs/common'
import { HttpService } from 'src/common/services'
import { MovieResult, PeopleResult } from './swapi.types'

@Injectable()
export class SWApiService {
  private readonly logger = new Logger(SWApiService.name)
  private readonly baseUrl = 'https://swapi.dev/api'

  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {
    this.logger.debug('SWApiService instantiated')
  }

  async getMovies(name?: string) {
    this.logger.debug(`getMovies: Hit name=${name}`)
    let url = this.baseUrl + '/films/'
    if (name) {
      url += `?search=${name}`
    }
    const response = await this.httpService.get<MovieResult>(url)
    response.results.forEach(movie => {
      movie.edited = new Date(movie.edited)
      movie.created = new Date(movie.created)
      movie.release_date = new Date(movie.release_date)
    })
    return response
  }

  async getPeople(name?: string) {
    this.logger.debug(`getPeople: Hit name=${name}`)
    let url = this.baseUrl + '/people/'
    if (name) {
      url += `?search=${name}`
    }
    const response = await this.httpService.get<PeopleResult>(url)
    response.results.forEach(person => {
      person.edited = new Date(person.edited)
      person.created = new Date(person.created)
    })
    return response
  }
}
