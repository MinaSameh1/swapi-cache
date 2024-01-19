import { Observable } from 'rxjs'
import { LoggerInterceptor } from './logger.interceptor'
import { CallHandler } from '@nestjs/common'

describe('LoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggerInterceptor()).toBeDefined()
  })

  it('should intercept', () => {
    const interceptor = new LoggerInterceptor()
    const request = {
      url: 'http://localhost:3000/v1/movies',
      method: 'GET',
      headers: {
        'fastly-client-ip': 'IP',
        'user-agent': 'Test user-agent',
        host: 'localhost:3000',
      },
    } as any
    const response = { statusCode: 200 } as any

    const getRequest = jest.fn(() => request)
    const getResponse = jest.fn(() => response)

    const context = {
      switchToHttp: () => ({
        getRequest,
        getResponse,
      }),
    }

    const callHandler: CallHandler = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.next()
          subscriber.complete()
        })
      },
    }

    const obs = interceptor.intercept(context as any, callHandler as any)
    obs.subscribe(data => {
      expect(data).toBeUndefined()
      expect(getRequest).toHaveBeenCalled()
      expect(getResponse).toHaveBeenCalled()
    })
  })
})
