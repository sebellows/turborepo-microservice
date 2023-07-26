import { UnauthorizedException } from '@nestjs/common'
import { Role, User } from '@trms/database'

export function isAdmin(user: User) {
  if (user.role !== Role.ADMIN) {
    throw new UnauthorizedException('Permission denied! Admin access only.')
  }
}

export function isEmployee(user: User) {
  if (user.role !== Role.EMPLOYEE) {
    throw new UnauthorizedException('Permission denied! Employee access only.')
  }
}
