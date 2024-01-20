import { ApiProperty } from '@nestjs/swagger'
import { AbstractEntity } from 'src/common/database'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { PersonEntity } from './person.entity'

@Entity('movie')
export class MovieEntity extends AbstractEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'The id of the movie from swapi', example: '1' })
  episode_id: string

  @Column()
  @ApiProperty({ description: 'The title of the movie', example: 'A New Hope' })
  title: string
  @Column()
  @ApiProperty({
    description: 'The opening crawl of the movie',
    example:
      'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.',
  })
  opening_crawl: string
  @Column()
  @ApiProperty({
    description: 'The director of the movie',
    example: 'George Lucas',
  })
  director: string
  @Column()
  @ApiProperty({
    description: 'The producer of the movie',
    example: 'Gary Kurtz, Rick McCallum',
  })
  producer: string
  @Column()
  @ApiProperty({
    description: 'The release date of the movie',
    example: '1977-05-25',
  })
  release_date: Date
  @Column()
  @ApiProperty({
    description: 'The date the movie was created',
    example: '2014-12-10T14:23:31.880000Z',
  })
  created: Date
  @Column()
  @ApiProperty({
    description: 'The date the movie was edited',
    example: '2014-12-12T11:24:39.858000Z',
  })
  edited: Date
  @Column()
  @ApiProperty({
    description: 'The url of the movie',
    example: 'https://swapi.dev/api/films/1/',
  })
  url: string
  @ManyToMany(() => PersonEntity, person => person.movies)
  @JoinTable({
    name: 'movie_person',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  @ApiProperty({
    description: 'The characters in the movie',
  })
  characters: PersonEntity[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The planets in the movie',
    example: ['tatooine', 'alderaan'],
  })
  planets: string[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The starships in the movie',
    example: ['death-star', 'star-destroyer'],
  })
  starships: string[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The vehicles in the movie',
    example: ['sand-crawler', 't-16-skyhopper'],
  })
  vehicles: string[]
  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'The species in the movie',
    example: ['human', 'droid'],
  })
  species: string[]
}
