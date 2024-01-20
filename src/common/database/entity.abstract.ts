import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: string

  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
  @DeleteDateColumn()
  deleted_at: Date
}
