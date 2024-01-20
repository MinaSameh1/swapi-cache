import { faker } from '@faker-js/faker'
import { PersonEntity } from 'src/entities/person.entity'

export const generateFakePeople = (overrides?: Partial<PersonEntity>) => {
  return {
    name: faker.internet.userName(),
    eye_color: faker.internet.color(),
    hair_color: faker.internet.color(),
    gender: faker.helpers.arrayElement(['male', 'female']),
    height: faker.number.float({ min: 0, max: 10 }),
    mass: faker.number.float({ min: 0, max: 10 }),
    homeworld: faker.internet.url(),
    skin_color: faker.internet.color(),
    created: faker.date.past().toISOString(),
    edited: faker.date.past().toISOString(),
    url: faker.internet.url(),
    movies: [],
    moviesUrls: [],
    species: [],
    starships: [],
    vehicles: [],
    ...overrides,
  }
}
