import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PersonEntity } from 'src/entities/person.entity'
import { SWApiModule } from '../SWApi/swapi.module'
import { PeopleController } from './people.controller'
import { PeopleRepository } from './people.repository'
import { PeopleService } from './people.service'

@Module({
  imports: [SWApiModule, TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
})
export class PeopleModule {}
