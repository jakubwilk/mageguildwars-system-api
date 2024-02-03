import { Body, Controller, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from '../auth/auth.service'

import { CreateUserDTO, LoginUserDTO } from './models'
import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _authService: AuthService,
  ) {}

  @Put()
  async create(@Body() createUser: CreateUserDTO, @Res() res: Response) {
    const user = await this._usersService.createAsync(createUser)
    const { authToken: access, refreshToken: refresh } = user
    return await this._usersService.returnUserWithTokens(user, access, refresh, res)
  }

  @Post()
  async login(@Body() loginUser: LoginUserDTO, @Res() res: Response) {
    const { email, password } = loginUser
    await this._usersService.isUserExist(email)
    const user = await this._usersService.loginAsync(loginUser)
    await this._authService.isUserPasswordCorrect(user.password, password)
    const access = await this._authService.createAccessToken(user)
    const refresh = await this._authService.createRefreshToken(user)
    await this._usersService.updateUserTokens(email, access, refresh)
    return await this._usersService.returnUserWithTokens(user, access, refresh, res)
  }
}
