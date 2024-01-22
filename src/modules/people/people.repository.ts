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
    return this.findOne({ ...params })
  }

  findOneById(id: number) {
    return this.findOne({ where: { id: id.toString() } })
  }

  /**
   * @param name - The name of the person to find
   * @returns The people with the given name. By default, it returns the first 10 people only.
   */
  findAndCountByName(
    name: string,
    params: Parameters<Repository<PersonEntity>['find']>[0] = { take: 10 },
  ) {
    return this.findAndCount({
      where: { name },
      ...params,
    })
  }
}
