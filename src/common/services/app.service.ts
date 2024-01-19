import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '../config'
import { HttpService } from './http.service'

const services = { HttpService: HttpService } as const

@Module({
  imports: [ConfigModule],
})
export class AppServicesModule {
  static forFeature(service: string | [string]): DynamicModule {
    const servicesToAdd = []
    if (Array.isArray(service)) {
      for (const s of service) {
        if (services[s]) {
          servicesToAdd.push(services[s])
        }
      }
    } else if (services[service]) {
      servicesToAdd.push(services[service])
    }
    return {
      module: AppServicesModule,
      providers: servicesToAdd,
      exports: servicesToAdd,
    }
  }
}
