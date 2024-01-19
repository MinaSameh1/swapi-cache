import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApplicationType } from '../types'

export function setupSwagger(app: ApplicationType) {
  const options = new DocumentBuilder()
    .setTitle('Star Wars Api')
    .setDescription('THE Star Wars API, your gateway to the galaxy')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
