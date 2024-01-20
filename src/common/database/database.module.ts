import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomConfigService } from '../config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (customConfigService: CustomConfigService) => ({
        type: 'postgres',
        host: customConfigService.getDbHost(),
        port: customConfigService.getDbPort(),
        username: customConfigService.getDbUsername(),
        password: customConfigService.getDbPassword(),
        database: customConfigService.getDbName(),
        entities: [],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class TestDatabaseModule {}
