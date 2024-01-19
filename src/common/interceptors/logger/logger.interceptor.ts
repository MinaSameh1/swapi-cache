import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { ServerResponse } from 'http'
import { Observable, tap } from 'rxjs'
import { ServerRequest } from 'src/common/types'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(LoggerInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        return this.logRestResponse(context, start)
      }),
    )
  }

  private logRestResponse(context: ExecutionContext, startTime: number): void {
    const http = context.switchToHttp()
    const request = http.getRequest<ServerRequest>()
    const response = http.getResponse<ServerResponse>()
    const delta = Date.now() - startTime
    const ip =
      request.headers['fastly-client-ip'] ||
      request.headers['x-forwarded-for'] ||
      request.ip

    const logMessage = `${new Date().toISOString()} ${request.method} ${
      request.url
    } status ${response.statusCode} took ${delta}ms from ${ip} / ${
      request.headers['host']
    } using ${request.headers['user-agent']}`

    return this.logger.log(logMessage)
  }
}
