import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces'
import * as argon2 from 'argon2'

import { ExceptionService } from '../exception/exception.service'
import { mapUserDataToClient } from '../users/mappers'
import { User, UserDocument } from '../users/schemas'
import { UsersService } from '../users/users.service'
import { getEnvVariable } from '../utils'

import { AuthOptionsNameEnum, CreateUserDTO, ICreateOrLoginUser, ITokenPayload, ITokensPair, LoginUserDTO } from './models'

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
    private readonly _exceptionService: ExceptionService,
  ) {}

  async createPasswordHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, { saltLength: 20 })
    } catch (err) {
      console.log('err 2', err)
      this._exceptionService.handleHashException()
    }
  }

  async validUserPassword(password: string, savedUserPassword: string): Promise<boolean> {
    try {
      return await argon2.verify(savedUserPassword, password)
    } catch (err) {
      this._exceptionService.handleMismatchPasswordException()
    }
  }

  async validUserExistence(userData: CreateUserDTO | LoginUserDTO, shouldReturnUser: boolean = true): Promise<UserDocument> {
    const { email } = userData
    return await this._usersService.validUserExistence(email, shouldReturnUser)
  }

  async getPayloadFromToken(token: string): Promise<ITokenPayload> {
    try {
      return await this._jwtService.decode(token)
    } catch (err) {
      this._exceptionService.handleAuthTokenException()
    }
  }

  async generateToken(user: User, isAccessToken: boolean = true): Promise<string> {
    try {
      const payload: ITokenPayload = {
        uid: user.uid,
        group: user.group,
      }
      const options: JwtSignOptions = {
        secret: getEnvVariable(isAccessToken ? AuthOptionsNameEnum.SECRET : AuthOptionsNameEnum.REFRESH),
        expiresIn: isAccessToken ? AuthOptionsNameEnum.SHORT : AuthOptionsNameEnum.LONG,
      }

      return await this._jwtService.signAsync(payload, { ...options })
    } catch (err) {
      this._exceptionService.handleAuthTokenException()
    }
  }

  async generatePairOfTokens(user: User): Promise<ITokensPair> {
    const access = await this.generateToken(user)
    const refresh = await this.generateToken(user, false)

    return { access, refresh }
  }

  async createAccount(userData: CreateUserDTO): Promise<ICreateOrLoginUser> {
    try {
      await this.validUserExistence(userData, false)

      const hashPassword = await this.createPasswordHash(userData.password)
      const user = await this._usersService.createAccountSchema({ ...userData, password: hashPassword })
      const tokens = await this.generatePairOfTokens(user)

      return { tokens, user: mapUserDataToClient(user) }
    } catch (err) {
      this._exceptionService.resolveInheritException(err)
      this._exceptionService.handleCreateUserException()
    }
  }

  async loginAccount(userData: LoginUserDTO): Promise<ICreateOrLoginUser> {
    try {
      const user = await this.validUserExistence(userData)

      await this.validUserPassword(userData.password, user.password)

      const tokens = await this.generatePairOfTokens(user)

      return { tokens, user: mapUserDataToClient(user) }
    } catch (err) {
      this._exceptionService.resolveInheritException(err)
      this._exceptionService.handleLoginUserException()
    }
  }

  async autoLoginAccount(): Promise<void> {}
}
