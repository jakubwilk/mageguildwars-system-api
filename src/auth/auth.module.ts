import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule, JwtModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
