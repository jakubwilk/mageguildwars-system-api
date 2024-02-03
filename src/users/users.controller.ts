import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthCookieNameEnum } from '../auth/models'
import { DEFAULT_ACCESS_OPTIONS, DEFAULT_REFRESH_OPTIONS } from '../auth/utils'

import { mapUserDataToClient } from './mappers'
import { CreateOrLoginUserDTO, IClientUser } from './models'
import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateOrLoginUserDTO, @Res() res: Response) {
    const user = await this._usersService.createAsync(createUser)
    const { authToken: access, refreshToken: refresh } = user
    const userData: IClientUser = mapUserDataToClient(user)
    return res
      .cookie(AuthCookieNameEnum.ACCESS, access, { ...DEFAULT_ACCESS_OPTIONS })
      .cookie(AuthCookieNameEnum.REFRESH, refresh, { ...DEFAULT_REFRESH_OPTIONS })
      .json({ data: userData })
  }
}
