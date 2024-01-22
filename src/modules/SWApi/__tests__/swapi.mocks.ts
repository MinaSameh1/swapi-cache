import { InjectionToken } from '@nestjs/common'
import { HttpService } from 'src/common/services'
import {
  generateFakeSwapiPeople,
  generateManyFakeSwapiPeople,
} from './generator'

export function getMockedHttpGetForSwapi(
  token: InjectionToken | undefined,
  getResults = {
    many: generateManyFakeSwapiPeople,
    one: generateFakeSwapiPeople,
  },
) {
  if (token == HttpService) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (_url: string) => {
        // check if the url has a param at the end that is a number
        const id = _url.match(/\d+$/)?.[0]
        console.log('id', id, _url)
        if (id && !_url.includes('page')) {
          console.log('match', _url)
          return {
            id,
            ...getResults.one(),
          }
        }

        const results = getResults.many()
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
