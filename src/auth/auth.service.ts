import { Inject, Injectable } from '@nestjs/common'

import { Users } from '../users/entity/users.entity'
import { UsersService } from '../users/users.service'

import { CreateUserDto } from './models/auth.model'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
    private readonly userService: UsersService,
  ) {}

  async create(user: CreateUserDto) {
    const existedUser = await this.userService.findUser(user.email)

    console.log('existedUser', existedUser)

    return { created: true }
  }
}
