import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'

import { returnUserDataWithTokens } from '../auth/utils'

import { CreateOrLoginUserDTO } from './models'
import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateOrLoginUserDTO, @Res() res: Response) {
    const user = await this._usersService.createAsync(createUser)
    return returnUserDataWithTokens({ access: '', refresh: '', user: { _id: null, ...user } }, res)
  }
}
