import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AuthService } from '../auth/auth.service'

import { CreateOrLoginUserDTO } from './models'
import { User } from './schemas'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly _authService: AuthService,
  ) {}

  handleUserExistException() {
    throw new Error('api.errorUserWithMailExist')
  }

  async isUserExist(email: string): Promise<Error | undefined> {
    const user = await this.userModel.findOne({ email }).exec()

    if (user) {
      this.handleUserExistException()
    }

    return
  }

  async createAsync({ email, password }: CreateOrLoginUserDTO): Promise<User> {
    await this.isUserExist('')
    const hashPassword = await this._authService.createPasswordHash(password)
    const createdUser = new this.userModel({
      email,
      password: hashPassword,
    })

    return createdUser.save()
  }
}
