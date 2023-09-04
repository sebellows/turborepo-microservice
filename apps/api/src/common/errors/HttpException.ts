import { ErrorCodes } from './error-codes'

export class HttpException extends Error {
  readonly status: number

  readonly message: string

  readonly code: string

  readonly meta?: any

  constructor(status: number, message: string, code?: string, meta?: any) {
    super(message)

    this.status = status
    this.message = message
    this.code = code ?? ErrorCodes.INTERNAL_ERROR
    this.meta = meta
  }
}

export const throwHttpException = (status: number, message: string, code?: string, meta?: any) =>
  new HttpException(status, message, code, meta)
