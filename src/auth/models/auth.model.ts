import { UserGroupEnum } from '../../users/models'

export interface ITokenPayload {
  email: string
  group: UserGroupEnum
}

export const AuthCookieNameEnum = {
  ACCESS: 'access',
  REFRESH: 'refresh',
}
