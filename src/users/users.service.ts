import { Inject, Injectable } from '@nestjs/common'
import { isNil } from '@nestjs/common/utils/shared.utils'

import { Users } from './entity/users.entity'

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof Users) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>()
  }

  async findUser(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { email } })

    if (isNil(user)) {
      throw Error('Brak użytkownika')
    }

    return user
  }
}
