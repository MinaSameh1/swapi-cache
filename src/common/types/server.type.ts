import { NestFastifyApplication } from '@nestjs/platform-fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type ServerRequest = FastifyRequest
export type ServerResponse = FastifyReply

export type ApplicationType = NestFastifyApplication
