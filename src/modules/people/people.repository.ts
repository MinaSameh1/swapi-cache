import { Injectable } from '@nestjs/common'
import { PersonEntity } from 'src/entities/person.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class PeopleRepository extends Repository<PersonEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(PersonEntity, _dataSource.createEntityManager())
  }

  findOneByName(name: string) {
    return this.findOne({ where: { name } })
  }

  findOneWithMovies(
    params?: Parameters<Repository<PersonEntity>['findOne']>[0],
  ) {
    return this.findOne({ ...params, relations: ['movies'] })
  }

  findOneWithMoviesById(id: number) {
    return this.findOne({ where: { id: id.toString() }, relations: ['movies'] })
  }

  findOneWithMoviesByName(name: string) {
    return this.findOne({ where: { name }, relations: ['movies'] })
  }

  /**
   * Overrides the default find method to include the movies relation.
   * Do not send the relations parameter when using this method as it will be overridden.
   * @param params - The parameters to find people with movies
   * @returns The people with their movies
   */
  findAndCountWithMovies(
    params: Parameters<Repository<PersonEntity>['find']>[0] = { take: 10 },
  ) {
    return this.findAndCount({ ...params, relations: ['movies'] })
  }

  /**
   * @param name - The name of the person to find
   * @returns The people with the given name and their movies. By default, it returns the first 10 people only.
   */
  findAndCountWithMoviesByName(
    name: string,
    params: Parameters<Repository<PersonEntity>['find']>[0] = { take: 10 },
  ) {
    return this.findAndCount({
      where: { name },
      relations: ['movies'],
      ...params,
    })
  }
}
