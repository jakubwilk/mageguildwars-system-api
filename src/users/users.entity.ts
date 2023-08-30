import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class Users extends Model {
  @Column
  login: string

  @Column
  password: string

  @Column
  email: string
}
