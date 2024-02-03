import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthService } from '../auth/auth.service'

import { CreateOrLoginUserDTO } from './models'
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

  async isUserExist(email: string): Promise<Error | undefined> {
    const user = await this._userModel.findOne({ email }).exec()

    if (user) {
      this.handleUserExistException()
    }

    return
  }

  async createAsync({ email, password, group }: CreateOrLoginUserDTO): Promise<User> {
    await this.isUserExist('')
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
}
