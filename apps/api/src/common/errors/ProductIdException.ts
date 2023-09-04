import { BadRequestException, HttpStatus } from '@nestjs/common'

export class ProductIdException extends BadRequestException {
  constructor(productId: string) {
    super(`Invalid product ID of ${productId}`, HttpStatus.BAD_REQUEST.toLocaleString())
  }
}

export const throwProductIdException = (message?: string) => new ProductIdException(message)
