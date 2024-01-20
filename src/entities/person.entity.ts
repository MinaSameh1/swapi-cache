import { ApiProperty } from '@nestjs/swagger'
import { AbstractEntity } from 'src/common/database'
import { Column, Entity, Index, ManyToMany } from 'typeorm'
import { MovieEntity } from './movie.entity'

@Entity()
export class PersonEntity extends AbstractEntity {
  @Column()
  @Index()
  @ApiProperty({
    description: 'The name of the person',
    example: 'Luke Skywalker',
  })
  name: string
  @Column()
  @ApiProperty({
    description: 'The eye color of the person',
    example: 'blue',
  })
  eye_color: string
  @Column()
  @ApiProperty({
    description: 'The gender of the person',
    example: 'male',
  })
  gender: string
  @Column()
  @ApiProperty({
    description: 'The hair color of the person',
    example: 'blond',
  })
  hair_color: string
  @Column()
  @ApiProperty({
    description: 'The height of the person',
    example: '172',
  })
  height: string
  @Column()
  @ApiProperty({
    description: 'The homeworld of the person',
    example: 'https://swapi.dev/api/planets/1/',
  })
  homeworld: string
  @Column()
  @ApiProperty({
    description: 'The mass of the person',
    example: '77',
  })
  mass: string
  @Column()
  @ApiProperty({
    description: 'The skin color of the person',
    example: 'fair',
  })
  skin_color: string
  @Column()
  @ApiProperty({
    description: 'The birth year of the person',
    example: '19BBY',
  })
  birth_year: string
  @Column()
  @ApiProperty({
    description: 'The date the person was created',
    example: '2014-12-09T13:50:51.644000Z',
  })
  created: Date
  @Column()
  @ApiProperty({
    description: 'The date the person was edited',
    example: '2014-12-20T21:17:56.891000Z',
  })
  edited: Date
  @Column()
  @ApiProperty({
    description: 'The url of the person',
    example: 'https://swapi.dev/api/people/1/',
  })
  url: string
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The films the person appears in',
    example: ['https://swapi.dev/api/films/1/'],
  })
  moviesUrls: string[]

  @ManyToMany(() => MovieEntity, movie => movie.characters)
  @ApiProperty({
    description: 'The films the person appears in',
  })
  movies: MovieEntity[]

  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The species the person belongs to',
    example: ['https://swapi.dev/api/species/1/'],
  })
  species: string[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The starships the person has piloted',
    example: ['https://swapi.dev/api/starships/12/'],
  })
  starships: string[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The vehicles the person has piloted',
    example: ['https://swapi.dev/api/vehicles/14/'],
  })
  vehicles: string[]
}
