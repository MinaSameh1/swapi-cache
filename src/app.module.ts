import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { redisStore } from 'cache-manager-redis-store'
import type { RedisClientOptions } from 'redis'
import { ConfigModule, CustomConfigService } from './common/config'
import { DatabaseModule } from './common/database'
import { PeopleModule } from './modules/people/people.module'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: CustomConfigService) => ({
        store: redisStore as any,
        url: configService.getRedisUrl(),
      }),
      inject: [CustomConfigService],
    }),
    PeopleModule,
  ],
})
export class AppModule {}
