import { HttpStatus, HttpException } from '@nestjs/common'

export class UserValidationException extends HttpException {
  constructor(errorMessages: string) {
    super('User validation failed', HttpStatus.UNPROCESSABLE_ENTITY)

    this.stack = errorMessages
  }
}
