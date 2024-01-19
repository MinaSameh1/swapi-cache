export interface Movie {
  title: string
  episode_id: string
  opening_crawl: string
  director: string
  producer: string
  release_date: Date
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: Date
  edited: Date
  url: string
}

export interface MovieResult {
  count: number
  next: string
  previous: string
  results: [Movie]
}

export interface People {
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: Date
  edited: Date
  url: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
}
export interface PeopleResult {
  count: number
  next: string
  previous: string
  results: [People]
}
