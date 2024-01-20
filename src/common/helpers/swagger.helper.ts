import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'
import { ApplicationType } from '../types'
import { swaggerCustomCss } from './swagger.css.js'

export function setupSwagger(app: ApplicationType) {
  patchNestJsSwagger()
  const options = new DocumentBuilder()
    .setTitle('Star Wars Api')
    .setDescription('THE Star Wars API, your gateway to the galaxy')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document, {
    customCss: swaggerCustomCss,
    customfavIcon: 'https://swapi.dev/static/favicon.ico',
    customSiteTitle: 'Star Wars Api',
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  })
}
