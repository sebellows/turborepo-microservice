import { HttpStatus, NotFoundException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
  constructor(userId: string) {
    super(`User with id "${userId}" not found`, `${HttpStatus.NOT_FOUND}`)
  }
}
