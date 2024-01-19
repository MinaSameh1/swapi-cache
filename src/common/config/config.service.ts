import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  get<T = string>(key: string): T {
    return this.configService.get<T>(key)
  }

  getPort(): number {
    return Number(this.get<string>('PORT'))
  }
}
