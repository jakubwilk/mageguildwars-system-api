import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'

import { CreateUserDto } from './models/auth.model'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() user: CreateUserDto) {
    return this.authService.create(user)
  }
}
