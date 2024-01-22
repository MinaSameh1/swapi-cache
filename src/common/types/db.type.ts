import { Repository } from 'typeorm'

export type FindParams<T extends object> = NonNullable<
  Parameters<Repository<T>['find']>[0]
>
