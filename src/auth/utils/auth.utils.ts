import { Response } from 'express'

import { IUserDataWithTokens, IUserDataWithTokensResponse } from '../../users/models'

export const AuthCookieNameEnum = {
  ACCESS: 'access',
  REFRESH: 'refresh',
}

export const DEFAULT_ACCESS_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 21600000),
}

export const DEFAULT_REFRESH_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 604800000),
}

export const returnUserDataWithTokens = (
  { access, refresh, user }: IUserDataWithTokens,
  res: Response,
): Response<IUserDataWithTokensResponse> => {
  return res
    .cookie(AuthCookieNameEnum.ACCESS, access, { ...DEFAULT_ACCESS_OPTIONS })
    .cookie(AuthCookieNameEnum.REFRESH, refresh, { ...DEFAULT_REFRESH_OPTIONS })
    .json({ user, refresh })
}
