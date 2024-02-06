import { User } from '../schemas'

export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

export interface ICreateUserSchema {
  email: string
  password: string
  group: UserGroupEnum
}

export interface IClientUser extends Omit<User, '_id' | '__v' | 'password'> {}
