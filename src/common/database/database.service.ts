import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger: Logger = new Logger(DatabaseService.name)

  @InjectDataSource() private readonly dataSource: DataSource

  onApplicationShutdown(signal?: string) {
    this.dataSource.destroy()
    this.logger.log(`Database disconnect due to signal: ${signal}`)
  }

  onModuleInit() {
    this.dataSource.initialize()
    this.logger.log('Database Service initialized')
  }

  getDataSource(): DataSource {
    return this.dataSource
  }

  getRepository<T>(entity: new () => T): Repository<T> {
    return this.dataSource.getRepository(entity)
  }

  getQueryBuilder<T>(entity: new () => T): SelectQueryBuilder<T> {
    return this.dataSource.getRepository(entity).createQueryBuilder()
  }
}
