import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PersonEntity } from 'src/entities/person.entity'
import { PeopleController } from './people.controller'
import { PeopleService } from './people.service'
import { PeopleRepository } from './people.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
})
export class PeopleModule {}
