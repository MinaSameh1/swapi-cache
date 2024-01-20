import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { PaginatedDto } from '../dtos/paginated.dto'

export const ApiPagintedResponse = <T>(
  classRef: T,
  { description = 'Success', status = HttpStatus.OK } = {},
) => {
  return applyDecorators(
    ApiExtraModels(classRef as any, PaginatedDto),
    ApiOkResponse({
      description,
      status,
      schema: {
        title: `PaginatedResponseOf${classRef}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(classRef as string) },
              },
            },
          },
        ],
      },
    }),
  )
}

export const ApiDefaultResponses = () => {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description:
        'Internal Server Error, something wrong happened. Contact us.',
    }),
  )
}
