import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import { Model } from 'mongoose'

import { AuthService } from '../auth/auth.service'
import { AuthCookieNameEnum } from '../auth/models'
import { DEFAULT_ACCESS_OPTIONS, DEFAULT_REFRESH_OPTIONS } from '../auth/utils'

import { mapUserDataToClient } from './mappers'
import { CreateUserDTO, IClientUser } from './models'
import { User } from './schemas'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    private readonly _authService: AuthService,
  ) {}

  handleUserExistException() {
    throw new Error('api.errorUserWithMailExist')
  }

  handleUpdateUserException() {
    throw new Error('api.errorUserUpdate')
  }

  async isUserExist(email: string): Promise<Error | undefined> {
    const user = await this._userModel.findOne({ email }).exec()

    if (user) {
      this.handleUserExistException()
    }

    return
  }

  async returnUserWithTokens(user: User, access: string, refresh: string, res: Response) {
    const userData: IClientUser = mapUserDataToClient(user)
    return res
      .cookie(AuthCookieNameEnum.ACCESS, access, { ...DEFAULT_ACCESS_OPTIONS })
      .cookie(AuthCookieNameEnum.REFRESH, refresh, { ...DEFAULT_REFRESH_OPTIONS })
      .json({ data: userData })
  }

  async updateUserTokens(email: string, access: string, refresh: string): Promise<void> {
    try {
      await this._userModel.updateOne({ email }, { authToken: access, refreshToken: refresh })
    } catch (err) {
      this.handleUpdateUserException()
    }
  }

  async createAsync({ email, password, group }: CreateUserDTO): Promise<User> {
    await this.isUserExist(email)
    const hashPassword = await this._authService.createPasswordHash(password)
    const access = await this._authService.createAccessToken({ email, group })
    const refresh = await this._authService.createRefreshToken({ email, group })
    const user = new this._userModel({
      email,
      password: hashPassword,
      authToken: access,
      refreshToken: refresh,
    })
    return await user.save()
  }

  async loginAsync({ email }): Promise<User> {
    return await this._userModel.findOne({ email }).exec()
  }
}
