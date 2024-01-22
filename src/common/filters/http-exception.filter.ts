import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ServerRequest, ServerResponse } from '../types'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  constructor() {}

  catch(exception: HttpException & { code?: number }, host: ArgumentsHost) {
    // INFO: <19-01-24, minasameh1> We can also add handlers for more types e.g. graphql and websocket
    return this.handleRestException(exception, host)
  }

  /******************* Rest Handler *******************/
  private handleRestException(
    exception: HttpException & { code?: number },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<ServerResponse>()
    const request = ctx.getRequest<ServerRequest>()
    const status = exception.getStatus() || 500

    const res = exception.getResponse()

    const logMessage = `${request.method} ${request.url} ${status} ${exception.name} from ${request.headers['user-agent']} ${exception.message}`

    // only log 500 errors (Internal Server Error) stacks to avoid cluttering the log
    if (exception instanceof InternalServerErrorException || status >= 500)
      this.logger.error(`Error on ${logMessage}`, exception.stack)
    // only warn 400 and above errors.
    else if (status >= 400) this.logger.warn(`Finished ${logMessage}`)
    // techincally this should never happen
    else this.logger.log(`Finished ${logMessage}`)

    return response.status(status).send({
      statusCode: status,
      // Return error payload if it exists
      ...(typeof res === 'string'
        ? { message: res, error: exception.name }
        : { ...res }),
    })
  }
}
