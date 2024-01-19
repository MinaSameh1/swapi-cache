import { Injectable, Logger } from '@nestjs/common'
import * as undici from 'undici'

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name)

  /**
   * @param method - HTTP method
   *   @param url - URL
   *   @param reqBody - Request body
   *   @returns Response body and status code
   *   @throws Error if status code is 400 or higher
   */
  private async doRequest<Res extends object, T = any>({
    method,
    url,
    reqBody,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    url: string
    reqBody?: T
  }): Promise<{
    statusCode: number
    body: Res | string
  }> {
    const { statusCode, body, headers } = await undici.request(url, {
      method,
      body: JSON.stringify(reqBody),
    })

    if (statusCode >= 400) {
      this.logger.error(`HTTP error: ${statusCode}`)
      throw new Error(`HTTP error: ${statusCode}`)
    }

    if (headers['content-type'] == 'application/json') {
      return {
        statusCode,
        body: (await body.json()) as Res,
      }
    }

    return {
      statusCode,
      body: (await body.text()) as string,
    }
  }

  async get<T>(url: string): Promise<T> {
    this.logger.debug(`GET ${url}`)
    const { body } = await this.doRequest({ method: 'GET', url })
    return body as T
  }

  async post<Req, Res>(url: string, reqBody: Req): Promise<Res> {
    this.logger.debug(`POST ${url}`)
    const { body } = await this.doRequest({ method: 'POST', url, reqBody })
    return body as Res
  }

  async put<Req, Res>(url: string, reqBody: Req): Promise<Res> {
    this.logger.debug(`PUT ${url}`)
    const { body } = await this.doRequest({ method: 'PUT', url, reqBody })
    return body as Res
  }

  async delete<Req, Res>(url: string, reqBody: Req): Promise<Res> {
    this.logger.debug(`DELETE ${url}`)
    const { body } = await this.doRequest({ method: 'DELETE', url, reqBody })
    return body as Res
  }

  async patch<Req, Res>(url: string, reqBody: Req): Promise<Res> {
    this.logger.debug(`PATCH ${url}`)
    const { body } = await this.doRequest({ method: 'PATCH', url, reqBody })
    return body as Res
  }
}
