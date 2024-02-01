import { Column, Model, Table } from 'sequelize-typescript'

import { CharacterGroupEnum, GuildEnum } from '../../auth/models/auth.model'

@Table
export class Characters extends Model {
  @Column({ unique: true, primaryKey: true })
  id: string

  @Column
  uid: string

  @Column
  imageUri: string

  @Column
  name: string

  @Column
  place: string

  @Column
  birthYear: string

  @Column
  guild: GuildEnum

  @Column
  group: CharacterGroupEnum

  @Column
  titles: Array<string>

  @Column
  createdAt: Date

  @Column
  updatedAt: Date

  @Column({ defaultValue: false })
  isGameMaster: boolean
}
