import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { ExceptionService } from '../exception/exception.service'
import { UsersModule } from '../users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessStrategy, RefreshStrategy } from './strategies'

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthService, ExceptionService, RefreshStrategy, AccessStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
