import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { ConfigModule, CustomConfigService } from '../config'

const entitesPath = path.join(__dirname, '../../entities/**/*.entity{.ts,.js}')
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (customConfigService: CustomConfigService) => ({
        type: 'postgres',
        host: customConfigService.getDbHost(),
        port: customConfigService.getDbPort(),
        username: customConfigService.getDbUsername(),
        password: customConfigService.getDbPassword(),
        database: customConfigService.getDbName(),
        entities: [entitesPath],
        synchronize: false,
      }),
      inject: [CustomConfigService],
    }),
  ],
})
export class DatabaseModule {}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [entitesPath],
      synchronize: true,
    }),
  ],
})
export class TestDatabaseModule {}
