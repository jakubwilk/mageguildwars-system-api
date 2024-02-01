import { Column, HasMany, Model, Table } from 'sequelize-typescript'

import { UserGroupEnum } from '../../auth/models/auth.model'

import { Characters } from './characters.entity'

@Table
export class Users extends Model {
  @Column({ unique: true, primaryKey: true })
  uid: string

  @Column({ unique: true })
  email: string

  @Column
  password: string

  @Column
  createdAt: Date

  @Column
  updatedAt: Date

  @Column
  group: UserGroupEnum

  @Column
  charactersLimit: number

  @Column({ defaultValue: false })
  isLocked: boolean

  @Column({ defaultValue: false })
  isBanned: boolean

  @Column({ defaultValue: true })
  hasCreateProfileEnabled: boolean

  @HasMany(() => Characters)
  characters: Array<Characters>
}
