import { JwtService } from '@nestjs/jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import bcrypt from 'bcrypt'

import { DbService } from '../db'
import { AuthenticationDto } from './dto/authentication.dto'
import { LoginDto } from './dto/login.dto'
import { ClearanceCheckDto } from './dto/clearance-check.dto'
import {
  InvalidCredentialsException,
  maybeThrowInvalidCredentialsException,
  throwInvalidCredentialsException,
} from '../../common/errors'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DbService, private readonly jwtservice: JwtService) {}

  async login(dto: LoginDto): Promise<AuthenticationDto> {
    const { email, password } = dto

    const user = await this.prisma.user.findUnique({ where: { email } })

    maybeThrowInvalidCredentialsException(!!user, 'User or password invalid.')

    const isValid = await bcrypt.compare(password, user.password)

    maybeThrowInvalidCredentialsException(isValid, 'User or password invalid.')

    delete user.password

    return {
      token: this.jwtservice.sign({ email }),
      user,
    }
  }

  async verifyAdmin(dto: ClearanceCheckDto) {
    const { code } = dto

    const correctCode = process.env.ADMIN_CODE

    maybeThrowInvalidCredentialsException(code != correctCode, 'Invalid admin code!')

    return true
  }

  async verifyEmployee(dto: ClearanceCheckDto) {
    const { code } = dto

    const correctCode = process.env.EMPLOYEE_CODE

    maybeThrowInvalidCredentialsException(code != correctCode, 'Invalid employee code!')

    return true
  }
}
