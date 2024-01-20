import { AppModule } from './app.module'
import { CustomConfigService } from './common/config'
import { HttpExceptionFilter } from './common/filters'
import { createNestApp, setupHelmet } from './common/helpers/server.helper'
import { setupSwagger } from './common/helpers/swagger.helper'
import { LoggerInterceptor } from './common/interceptors'

async function bootstrap() {
  /******************* Create the app *******************/
  const app = await createNestApp(AppModule)

  /******************* App Config ****************/
  app.enableVersioning()
  app.enableCors()

  /******************* Swagger *******************/
  setupSwagger(app)
  /******************* Helmet ********************/
  setupHelmet(app)

  /******************* Global Interceptors and Filters *******************/
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggerInterceptor())

  /******************* Start the app **************/
  const configService = app.get(CustomConfigService)
  await app.listen(configService.getPort())
}

bootstrap()
