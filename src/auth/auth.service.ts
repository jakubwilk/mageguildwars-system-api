import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { User } from '../users/schemas'
import { UsersService } from '../users/users.service'

import { ITokenPayload, IUserTokenPayload } from './models'

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private _configService: ConfigService,
    private readonly _usersService: UsersService,
  ) {}

  handleGenericInternalException() {
    throw new HttpException('api.genericInternalError', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async createPasswordHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, { saltLength: 20 })
    } catch (err) {
      this.handleGenericInternalException()
    }
  }

  async isUserPasswordCorrect(password: string, savedUserPassword: string): Promise<boolean> {
    try {
      return await argon2.verify(savedUserPassword, password)
    } catch (err) {
      this.handleGenericInternalException()
    }
  }

  async isUserTokenCorrect(userToken: string, savedToken: string): Promise<boolean> {
    try {
      return await argon2.verify(savedToken, userToken)
    } catch (err) {
      this.handleGenericInternalException()
    }
  }

  createPayloadForToken(user: IUserTokenPayload): ITokenPayload {
    return {
      email: user.email,
      group: user.group,
    }
  }

  async createAccessToken(user: IUserTokenPayload): Promise<string> {
    try {
      const payload = this.createPayloadForToken(user)
      return await this._jwtService.signAsync(payload, { secret: this._configService.get<string>('JWT_SECRET'), expiresIn: '6h' })
    } catch (err) {
      this.handleGenericInternalException()
    }
  }

  async createRefreshToken(user: IUserTokenPayload): Promise<string> {
    try {
      const payload = this.createPayloadForToken(user)
      return await this._jwtService.signAsync(payload, { secret: this._configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '14d' })
    } catch (err) {
      this.handleGenericInternalException()
    }
  }

  async updateRefreshToken(user: User): Promise<void> {
    try {
      const { email, group } = user
      const userData: IUserTokenPayload = {
        email,
        group,
      }
      const newRefreshToken = await this.createRefreshToken(userData)
      await this._usersService.updateUserRefreshToken(user.email, newRefreshToken)
    } catch (err) {
      this.handleGenericInternalException()
    }
  }
}
