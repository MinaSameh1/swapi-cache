import { ApiProperty } from '@nestjs/swagger'

export class PaginatedDto<TData> {
  @ApiProperty({ example: 20 })
  total: number
  @ApiProperty({ example: 2 })
  pages: number

  @ApiProperty()
  items: TData[]
}
