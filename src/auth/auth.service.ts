import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  handleHashPasswordException() {
    throw new Error('api.errorWithHashPassword')
  }

  async createPasswordHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, { saltLength: 20 })
    } catch (err) {
      this.handleHashPasswordException()
    }
  }
}
