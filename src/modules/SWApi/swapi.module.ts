import { Module } from '@nestjs/common'
import { HttpService } from 'src/common/services'
import { AppServicesModule } from 'src/common/services/app.service'
import { SWApiService } from './swapi.service'

@Module({
  imports: [AppServicesModule.forFeature(HttpService.name)],
  providers: [SWApiService],
  exports: [SWApiService],
})
export class SWApiModule {}
