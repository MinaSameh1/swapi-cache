import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ people (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/people',
        body: {},
      })
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.json().items).toHaveLength(10)
      })
  })
})
