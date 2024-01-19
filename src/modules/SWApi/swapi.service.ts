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

  getMovies(name?: string) {
    this.logger.debug(`getMovies: Hit name=${name}`)
    let url = this.baseUrl + '/films/'
    if (name) {
      url += `?search=${name}`
    }
    return this.httpService.get<MovieResult>(url)
  }

  getPeople(name?: string) {
    this.logger.debug(`getPeople: Hit name=${name}`)
    let url = this.baseUrl + '/people/'
    if (name) {
      url += `?search=${name}`
    }
    return this.httpService.get<PeopleResult>(url)
  }
}
