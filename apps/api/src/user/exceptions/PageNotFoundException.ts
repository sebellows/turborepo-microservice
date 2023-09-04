import { HttpStatus, HttpException } from '@nestjs/common'

export class PageNotFoundException extends HttpException {
  constructor() {
    super('Page not found', HttpStatus.NOT_FOUND)
  }
}
