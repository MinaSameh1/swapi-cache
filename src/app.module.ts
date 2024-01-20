import { Module } from '@nestjs/common'
import { ConfigModule } from './common/config'
import { PeopleModule } from './modules/people/people.module'
import { DatabaseModule } from './common/database'

@Module({
  imports: [ConfigModule, DatabaseModule, PeopleModule],
})
export class AppModule {}
