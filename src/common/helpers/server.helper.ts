import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

export const createNestApp = (module: any) =>
  NestFactory.create<NestFastifyApplication>(module, new FastifyAdapter())
