import { IsEmail, IsString, Length } from 'class-validator'

import { UserDocument } from '../schemas'

export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

export class CreateOrLoginUserDTO {
  @IsEmail()
  email: string
  @IsString()
  @Length(14)
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
