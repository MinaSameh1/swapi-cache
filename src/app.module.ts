import { Module } from '@nestjs/common'
import { ConfigModule } from './common/config'

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
