import { AppModule } from './app.module'
import { CustomConfigService } from './common/config'
import { HttpExceptionFilter } from './common/filters'
import { createNestApp, setupHelmet } from './common/helpers/server.helper'
import { setupSwagger } from './common/helpers/swagger.helper'
import { LoggerInterceptor } from './common/interceptors'

async function bootstrap() {
  /******************* Create the app *******************/
  const app = await createNestApp(AppModule)
  const configService = app.get(CustomConfigService)

  /******************* App Config ****************/
  app.enableVersioning()
  app.enableCors()
  // add log level
  if (configService.getLoggerLevel() === 'debug') {
    app.useLogger(['log', 'debug', 'error', 'warn', 'verbose'])
  } else if (configService.getLoggerLevel() === 'silent') {
    app.useLogger(['error', 'warn'])
  } else {
    app.useLogger(['error', 'warn', 'log'])
  }
  /******************* Swagger *******************/
  setupSwagger(app)
  /******************* Helmet ********************/
  setupHelmet(app)

  /******************* Global Interceptors and Filters *******************/
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggerInterceptor())

  /******************* Start the app **************/
  await app.listen(configService.getPort())
}

bootstrap()
