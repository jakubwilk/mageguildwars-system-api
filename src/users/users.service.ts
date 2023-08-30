import { Inject, Injectable } from '@nestjs/common'

import { Users } from './users.entity'

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof Users) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>()
  }
}
