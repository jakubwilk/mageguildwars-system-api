import { IsEmail, IsNumber, IsString, Length } from 'class-validator'

import { User } from '../schemas'

export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

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

export interface IClientUser extends Omit<User, '_id' | '__v' | 'password' | 'authToken' | 'refreshToken'> {}
