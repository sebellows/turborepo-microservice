import bcrypt from 'bcrypt'
// import { JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { Injectable } from '@nestjs/common'
// import { User } from '@trms/database'

import { maybeThrowInvalidCredentialsException } from '../../common/errors'

import { PrismaService } from '../prisma'

import { AuthenticationDto } from './dto/authentication.dto'
import { LoginDto } from './dto/login.dto'
// import { Action } from './constants'

// const AllPolicies = [Action.Create, Action.Delete, Action.Update, Action.Read]
// const defaultPolicies: [Action, boolean][] = [
//   [Action.Create, false],
//   [Action.Delete, false],
//   [Action.Update, false],
//   [Action.Read, true],
// ]

@Injectable()
export class AuthService {
  // private user: Record<string, any> // User

  // private policies: Map<Action, boolean> = new Map(defaultPolicies)

  // private setPolicies(...policies: Action[]) {
  //   policies.forEach(policy => {
  //     this.policies.set(policy, true)
  //   })
  // }

  constructor(private readonly prisma: PrismaService, private readonly jwtservice: JwtStrategy) {}

  async login(dto: LoginDto): Promise<AuthenticationDto> {
    const { email, password } = dto

    const user = await this.prisma.user.findUnique({ where: { email } })

    maybeThrowInvalidCredentialsException(!!user, 'User or password invalid.')

    const isValid = await bcrypt.compare(password, user.password)

    maybeThrowInvalidCredentialsException(isValid, 'User or password invalid.')

    delete user.password

    // this.user = user
    // this.assignPolicies()

    return {
      // token: this.jwtservice.,
      user,
    }
  }

  // async verifyAdmin() {
  //   return this.can(...AllPolicies)
  // }

  // async verifyEmployee() {
  //   return this.can(Action.Create, Action.Update, Action.Read)
  // }

  // private can(...policies: Action[]) {
  //   return policies.every(policy => !!this.policies.get(policy))
  // }

  // private assignPolicies() {
  //   switch (this.user.role) {
  //     case 'ADMIN':
  //       this.setPolicies(...Object.values(Action))
  //       break
  //     case 'EMPLOYEE':
  //       this.setPolicies(Action.Create, Action.Read, Action.Update)
  //       break
  //     case 'CUSTOMER':
  //     default:
  //       this.setPolicies(Action.Read)
  //   }
  // }
}
