import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DbService } from '../db'
import { User } from '@trms/database'
import { InvalidCredentialsException } from '../../common/errors'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: { email: string }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    })

    if (!user) {
      throw new InvalidCredentialsException()
    }

    delete user.password, user.createdAt, user.updatedAt

    return user
  }
}
