import { AppModule } from './app.module'
import { CustomConfigService } from './common/config'
import { HttpExceptionFilter } from './common/filters'
import { setupSwagger } from './common/helpers/swagger.helper'
import { LoggerInterceptor } from './common/interceptors'
import { createNestApp } from './common/helpers/server.helper'

async function bootstrap() {
  /******************* Create the app *******************/
  const app = await createNestApp(AppModule)

  /******************* App Config *******************/
  app.enableVersioning()
  app.enableCors()

  /******************* Swagger *******************/
  setupSwagger(app)

  /******************* Global Interceptors and Filters *******************/
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggerInterceptor())

  /******************* Start the app *******************/
  const configService = app.get(CustomConfigService)
  await app.listen(configService.getPort())
}

bootstrap()
