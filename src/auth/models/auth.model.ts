import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export interface ICreateUser {}

export interface IUser {}

export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

export enum CharacterGroupEnum {
  MAGE,
  GUILD_MEMBER,
  GUILD_MASTER,
  MAGIC_COUNCIL_MEMBER,
  GAME_MASTER,
  NONE,
}

export enum GuildEnum {
  FAIRY_TAIL,
  LAMIA_SCALE,
  SABERTOOTH,
  GRIMOIRE_HEART,
  RAVEN_TAIL,
  PHANTOM_LORD,
  OUTSIDER,
  MAGIC_COUNCIL,
  GAME_MASTER,
  NONE,
}
