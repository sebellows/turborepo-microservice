import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { ResponseContextKey } from '../decorators/response-context.decorator'

function cleanObject<T>(clz: ClassConstructor<T>, data: any): T {
  return plainToInstance(clz, data, {
    enableImplicitConversion: true,
  })
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const correlationId = request.headers['x-correlation-id'] as string
    const authorization = request.headers['authorization'] as string
    const clz = this.reflector.get<ClassConstructor<any>>(ResponseContextKey, context.getHandler())

    return next
      .handle()
      .pipe(
        tap(() => {
          const response = ctx.getResponse<Response>()
          void response.header('x-correlation-id', correlationId)
          // void response.header('authorization', authorization)
        }),
      )
      .pipe(
        map(data => {
          if (clz) {
            return cleanObject(clz, data)
          } else {
            return data
          }
        }),
      )
  }
}
