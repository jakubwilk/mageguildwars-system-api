import { Module } from '@nestjs/common'

import { usersProviders } from '../users/users.providers'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService, ...usersProviders],
  controllers: [AuthController],
})
export class AuthModule {}
