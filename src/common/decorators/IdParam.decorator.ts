import { Param, ParseIntPipe } from '@nestjs/common'

export const IdParam = (name: string) => Param(name, new ParseIntPipe())
