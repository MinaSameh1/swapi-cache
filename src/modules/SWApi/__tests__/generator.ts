import { faker } from '@faker-js/faker'
import { People } from '../swapi.types'

export const generateFakeSwapiPeople = (
  overrides?: Partial<People> | any,
): People => {
  return {
    name: faker.internet.userName(),
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: faker.helpers.arrayElements([
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/',
    ]),
    starships: faker.helpers.arrayElements([
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/',
    ]),
    created: faker.date.past(),
    edited: faker.date.past(),
    url: faker.internet.url(),
    ...overrides,
  }
}

export const generateManyFakeSwapiPeople = (ops = { min: 1, max: 10 }) => {
  return faker.helpers.multiple(generateFakeSwapiPeople, {
    count: {
      min: ops.min,
      max: ops.max,
    },
  })
}
