import { v4 as uuid } from 'uuid'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export interface RequestContextHeaders {
  correlationId: string
  authorization?: string
}

export const RequestContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContextHeaders => {
    const request: Request = ctx.switchToHttp().getRequest()

    const correlationId = (request.headers['x-correlation-id'] ?? uuid()) as string
    // const authorization = request.headers["authorization"] as string

    return { correlationId }
  },
)

export const emptyRequestHeaders = (): RequestContextHeaders => ({ correlationId: '' })
