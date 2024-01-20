import helmet from '@fastify/helmet'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

export const createNestApp = (module: any) =>
  NestFactory.create<NestFastifyApplication>(module, new FastifyAdapter())

export const setupHelmet = (app: NestFastifyApplication) => {
  app.register(helmet, {
    // To solve swagger-ui issues with CSP
    // See https://docs.nestjs.com/openapi/introduction
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
}
