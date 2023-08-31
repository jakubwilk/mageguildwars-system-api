import { Inject, Injectable } from '@nestjs/common'

import { Users } from '../users/users.entity'

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof Users) {}

  async create() {
    return { created: true }
  }
}
