import { Inject, Injectable } from '@nestjs/common'

import { Users } from '../users/entity/users.entity'

import { CreateUserDto } from './models/auth.model'

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof Users) {}

  async create(user: CreateUserDto) {
    console.log('user', user)

    return { created: true }
  }
}
