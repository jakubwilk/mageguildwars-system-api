import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ExceptionService } from '../exception/exception.service'

import { ICreateUserSchema } from './models'
import { User, UserDocument } from './schemas'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    private readonly _exceptionService: ExceptionService,
  ) {}

  async validUserExistence(email: string, shouldReturnUser: boolean = true): Promise<UserDocument> {
    const user = await this._userModel.findOne({ email }).exec()

    if (user && shouldReturnUser) {
      return user
    }

    this._exceptionService.handleExistUserException()
  }

  async createAccountSchema(userData: ICreateUserSchema): Promise<User> {
    try {
      const user = new this._userModel({ ...userData })
      return await user.save()
    } catch (err) {
      this._exceptionService.resolveInheritException(err)
      this._exceptionService.handleCreateUserException()
    }
  }

  // async getUser(email: string): Promise<User> {
  //   return await this._userModel.findOne({ email }).exec()
  // }
  //
}
