import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from './schemas'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isUserExist(email: string): Promise<Error | undefined> {
    const user = await this.userModel.findOne({ email }).exec()

    if (user) {
      return Error('Użytkownik istnieje')
    }

    return
  }

  async createAsync(): Promise<User> {
    await this.isUserExist('')
    const createdUser = new this.userModel(null)

    return createdUser.save()
  }
}
