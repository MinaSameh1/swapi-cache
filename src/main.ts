import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { CustomConfigService } from './common/config'
import { setupSwagger } from './common/helpers/swagger.helper'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  setupSwagger(app)

  const configService = app.get(CustomConfigService)
  await app.listen(configService.getPort())
}
bootstrap()
