import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { passportJwtSecret } from 'jwks-rsa'

// import { InvalidCredentialsException } from '../../common/errors'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    })
  }

  validate(payload: unknown): unknown {
    // { email: string }): Promise<User> {
    console.log('JwtStrategy->payload', payload)
    return payload
    // const user = await this.prisma.user.findUnique({
    //   where: { email: payload.email },
    // })

    // if (!user) {
    //   throw new InvalidCredentialsException()
    // }

    // delete user.password, user.createdAt, user.updatedAt

    // return user
  }
}
