import { Controller, Get } from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  async create() {
    return await this._usersService.createAsync({ email: 'test', password: 'password' })
  }
}
