import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
  UsePipes,
} from '@nestjs/common'
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ZodValidationPipe } from 'nestjs-zod'
import { ApiPaginationDocumentation, Pagination } from 'src/common/decorators'
import { IdParam } from 'src/common/decorators/IdParam.decorator'
import {
  ApiDefaultResponses,
  ApiPagintedResponse,
} from 'src/common/decorators/Swagger.decorators'
import { PaginationQuery } from 'src/common/dtos'
import { PersonEntity } from 'src/entities/person.entity'
import { QueryPeopleDto } from './dto/query-people.dto'
import { PeopleService } from './people.service'
import { PeopleErrorMessagesAndCodes } from './people.assets'

@Controller('people')
@ApiTags('People')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  /**** Swagger docs ****/
  @ApiOperation({
    summary: 'Find all people',
    description: `
## User Story

- As a user, I want to be able to see a list of people. (Frontend shows a list of people)
- As a user, I want to be able to search for a person by name. (Frontend sends the name of the person to the backend)
- As a user, I want to be able to see the movies that a person has participated in. (Frontend shows the movies that the person has participated in)

## Requests Flow
- Send a GET request to /people to get a list of people
- Send a GET request to /people?name= to search for a person by name
`,
  })
  @ApiNoContentResponse({
    description: 'No content to return (`total` is 0 and `pages` is 0)',
  })
  @ApiPagintedResponse(PersonEntity)
  @ApiDefaultResponses()
  @ApiPaginationDocumentation()
  @ApiQuery({ type: QueryPeopleDto, required: false })
  /**** End swagger docs ****/
  @Get()
  @UsePipes(ZodValidationPipe)
  async findAll(
    @Pagination() pagination: PaginationQuery,
    @Query() query?: QueryPeopleDto,
  ) {
    const results = await this.peopleService.findAll(
      pagination,
      // Zod doesn't support transform
      QueryPeopleDto.fromPartial(query),
      {
        id: true,
        name: true,
        eye_color: true,
        hair_color: true,
        gender: true,
        homeworld: true,
      },
    )
    if (results.pages === 0 && results.total === 0)
      throw new HttpException(
        {
          message: 'No content', // useless message as it is not shown to the client
        },
        HttpStatus.NO_CONTENT,
      )
    return results
  }

  /**** Swagger docs ****/
  @ApiOperation({
    summary: 'Find one person',
    description: `
## User Story 

- As a user, I want to be able to find a person when I search for it by id. (Frontend sends ID when user clicks on a person in the list of people)
- As a user, I want to be able to see the movies that a person has participated in. (Frontend shows the movies that the person has participated in)

## Requests Flow 
- Send a GET request to /people to get a list of people
- Send a GET request to /people/:id to get a person by id

## Error Codes 

- 404 \`${PeopleErrorMessagesAndCodes.MissingPerson.code}\` => \`${PeopleErrorMessagesAndCodes.MissingPerson.message}\`
`,
  })
  @ApiOkResponse({ type: PersonEntity, description: 'Person found' })
  @ApiNotFoundResponse({
    description: 'Person not found',
  })
  @ApiDefaultResponses()
  /**** End swagger docs ****/
  @Get(':id')
  async findOne(@IdParam('id') id: number) {
    const item = await this.peopleService.findOne(id)
    if (!item)
      throw new NotFoundException(
        PeopleErrorMessagesAndCodes.MissingPerson.message,
        {
          description: PeopleErrorMessagesAndCodes.MissingPerson.code,
        },
      )
    return item
  }
}
