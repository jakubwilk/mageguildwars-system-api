import { UserGroupEnum } from '../../users/models'
import { User } from '../../users/schemas'

export interface ITokenPayload {
  email: string
  group: UserGroupEnum
}

export const AuthCookieNameEnum = {
  ACCESS: 'access',
  REFRESH: 'refresh',
}

export interface IUserTokenPayload extends Pick<User, 'email' | 'group'> {}
