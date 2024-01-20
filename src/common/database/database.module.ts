import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, CustomConfigService } from '../config'

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
        entities: [],
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
      entities: [],
      synchronize: true,
    }),
  ],
})
export class TestDatabaseModule {}
