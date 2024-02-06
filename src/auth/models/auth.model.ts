import { IsEmail, IsNumber, IsString, Length } from 'class-validator'

import { IClientUser, UserGroupEnum } from '../../users/models'
import { UserDocument } from '../../users/schemas'

export class CreateUserDTO {
  @IsEmail()
  email: string
  @IsString()
  @Length(14)
  password: string
  @IsNumber()
  group: UserGroupEnum
}

export class LoginUserDTO {
  @IsEmail()
  email: string
  @IsString()
  @Length(14)
  password: string
}

export enum AuthCookieNameEnum {
  REFRESH = 'refresh',
}

export enum AuthOptionsNameEnum {
  SECRET = 'JWT_SECRET',
  REFRESH = 'JWT_REFRESH_SECRET',
  SHORT = '6h',
  LONG = '7d',
}

export interface ITokenPayload {
  uid: string
  group: UserGroupEnum
}

export interface ITokensPair {
  access: string
  refresh: string
}

export interface ICreateOrLoginUser {
  tokens: ITokensPair
  user: IClientUser
}

export interface IUserTokenPayload extends Pick<UserDocument, 'uid' | 'group'> {}
