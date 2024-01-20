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

  getDbUsername() {
    return this.get('DB_USERNAME')
  }
  getDbPassword() {
    return this.get('DB_PASSWORD')
  }
  getDbHost() {
    return this.get('DB_HOST')
  }
  getDbPort() {
    return Number(this.get('DB_PORT'))
  }
  getDbName() {
    return this.get('DB_NAME')
  }
  getDbSchema() {
    return this.get('DB_SCHEMA')
  }
}
