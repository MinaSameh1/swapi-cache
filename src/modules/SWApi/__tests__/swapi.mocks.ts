import { InjectionToken } from '@nestjs/common'
import { HttpService } from 'src/common/services'
import {
  generateManyFakeSwapiPeople,
  generateFakeSwapiPeople,
} from './generator'

export function getMockedHttpGetForSwapi(token: InjectionToken | undefined) {
  if (token == HttpService) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (_url: string) => {
        // check if the url has a param at the end that is a number
        const id = _url.match(/\/(\d+)\/$/)?.[1]
        if (id) {
          console.log('match', _url)
          return {
            id,
            ...generateFakeSwapiPeople(),
          }
        }

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
}
