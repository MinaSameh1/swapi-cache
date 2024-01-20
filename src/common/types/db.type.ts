import { Repository } from 'typeorm'

export type FindParams<T> = Parameters<Repository<T>['find']>[0]
