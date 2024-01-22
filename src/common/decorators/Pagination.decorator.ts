import {
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { ServerRequest } from '../types'
import { isPositiveNumber } from '../utils'

/**
 *  @description Pagination decorator. Used to get pagination params from request query. ex: ?page=1
 *  @returns {PaginationQuery} Pagination query. Returns skip and take.
 */
export const Pagination = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_data = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ServerRequest>()
    const pageQuery = (request.query as { page: number }).page

    const take = 10
    const page =
      isPositiveNumber(pageQuery) && Number(pageQuery) > 0
        ? Number(pageQuery) - 1
        : 0

    return {
      page: page + 1,
      skip: page * take,
      take,
    }
  },
)

export const ApiPaginationDocumentation = () => {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      type: Number,
      example: 1,
      required: false,
      description: 'Page number',
    }),
  )
}

export default Pagination
