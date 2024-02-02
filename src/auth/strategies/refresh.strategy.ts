import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { getEnvVariable } from '../../utils'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshStrategy.extractJWT, ExtractJwt.fromExtractors([(req) => req.cookies['refresh']])]),
      secretOrKey: getEnvVariable('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    })
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'refresh' in req.cookies) {
      return req.cookies['refresh']
    }

    return null
  }
}
