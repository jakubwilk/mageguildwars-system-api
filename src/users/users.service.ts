import { Inject, Injectable } from '@nestjs/common'
import { isNil } from '@nestjs/common/utils/shared.utils'

import { Users } from './entity/users.entity'

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof Users) {}

  userNotFoundException() {
    throw new Error('Użytkownik nie został odnaleziony')
  }

  userWithEmailExistException() {
    throw new Error('Użytkownik z takim adresem email istnieje')
  }

  async enforceUserExist(email: string) {
    const remoteUser = await this.usersRepository.findOne({ where: { email } })

    if (!remoteUser) {
      return this.userNotFoundException()
    }
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>()
  }

  async findUser(email: string): Promise<Users> {
    await this.enforceUserExist(email)

    return (await this.usersRepository.findOne({ where: { email } })) as Users
  }
}
