import { HttpStatus, HttpException } from '@nestjs/common'

export class NotUniqueException extends HttpException {
  constructor(email: string) {
    super(`A user with an email of "${email}" already exists`, HttpStatus.CONFLICT)
  }
}
