import { UserDocument } from '../schemas'

export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

export interface ICreateUser {
  email: string
  password: string
}

export type TUser = Pick<
  UserDocument,
  '_id' | 'email' | 'createdAt' | 'updatedAt' | 'charactersLimit' | 'isLocked' | 'isBanned' | 'hasEnabledCharacterCreator'
>

export interface IUserDataWithTokens {
  access: string
  refresh: string
  user: TUser
}

export interface IUserDataWithTokensResponse {
  refresh: string
  user: TUser
}
