import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common'
import { ApiCookieAuth } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { RefreshGuard } from './guards'
import { AuthCookieNameEnum, CreateUserDTO, LoginUserDTO } from './models'
import { DEFAULT_REFRESH_OPTIONS, setAuthorizationHeader } from './utils'

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Put()
  async createAccount(@Body() userData: CreateUserDTO, @Res() res: Response) {
    const {
      tokens: { access, refresh },
      user,
    } = await this._authService.createAccount(userData)

    return res
      .set(setAuthorizationHeader(access))
      .cookie(AuthCookieNameEnum.REFRESH, refresh, { ...DEFAULT_REFRESH_OPTIONS })
      .json({ data: user })
  }

  @Post()
  async loginAccount(@Body() userData: LoginUserDTO, @Res() res: Response) {
    const {
      tokens: { access, refresh },
      user,
    } = await this._authService.loginAccount(userData)

    return res
      .set(setAuthorizationHeader(access))
      .cookie(AuthCookieNameEnum.REFRESH, refresh, { ...DEFAULT_REFRESH_OPTIONS })
      .json({ data: user })
  }

  @UseGuards(RefreshGuard)
  @Get()
  @ApiCookieAuth('refresh')
  async autoLoginAccount(@Req() req: Request, @Res() res: Response) {
    console.log('req.cookie', req.cookies)
    console.log('req.headers', req.headers)

    await this._authService.autoLoginAccount()
    return res.json({ test: 'essa' })
  }
}
