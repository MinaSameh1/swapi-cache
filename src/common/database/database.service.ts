import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger: Logger = new Logger(DatabaseService.name)

  async onModuleInit() {
    await this.$connect()
  }

  onApplicationShutdown(signal?: string) {
    this.logger.log(`Disconnecting from database due to ${signal}...`)
    this.$disconnect()
  }
}
