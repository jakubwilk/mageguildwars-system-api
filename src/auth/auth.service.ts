import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { User } from '../users/schemas'

import { ITokenPayload } from './models'

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private _configService: ConfigService,
  ) {}

  handleHashPasswordException() {
    throw new Error('api.errorWithHashPassword')
  }

  handleCreateTokenException() {
    throw new Error('api.errorWithTokenCreation')
  }

  async createPasswordHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, { saltLength: 20 })
    } catch (err) {
      this.handleHashPasswordException()
    }
  }

  createPayloadForToken(user: Pick<User, 'email' | 'group'>): ITokenPayload {
    return {
      email: user.email,
      group: user.group,
    }
  }

  async createAccessToken(user: Pick<User, 'email' | 'group'>): Promise<string> {
    try {
      const payload = this.createPayloadForToken(user)
      return await this._jwtService.signAsync(payload, { secret: this._configService.get<string>('JWT_SECRET'), expiresIn: '6h' })
    } catch (err) {
      this.handleCreateTokenException()
    }
  }

  async createRefreshToken(user: Pick<User, 'email' | 'group'>): Promise<string> {
    try {
      const payload = this.createPayloadForToken(user)
      return await this._jwtService.signAsync(payload, { secret: this._configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '14d' })
    } catch (err) {
      this.handleCreateTokenException()
    }
  }
}
