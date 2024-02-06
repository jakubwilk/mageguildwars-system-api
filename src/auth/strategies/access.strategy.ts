import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { getEnvVariable } from '../../utils'
import { ITokenPayload } from '../models'

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AccessStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: getEnvVariable('JWT_SECRET'),
    })
  }

  validate(req: Request, payload: ITokenPayload) {
    const refreshToken = req.cookies['refresh']
    return { ...payload, refreshToken }
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies['token']
    }

    return null
  }
}
