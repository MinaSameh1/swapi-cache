import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '../config'
import { HttpService } from './http.service'

const services = { HttpService: HttpService } as const
type servicesKey = keyof typeof services

@Module({
  imports: [ConfigModule],
})
export class AppServicesModule {
  static forFeature(service: string | string[]): DynamicModule {
    const servicesToAdd: (typeof services)[servicesKey][] = []
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
