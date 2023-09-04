import { Injectable, NestMiddleware } from '@nestjs/common'
// import { RequestContext } from './request-context.model';
import { NextFunction, Request, RequestHandler, Response } from 'express'

interface ParamsDictionary {
  [key: string]: string
}
interface Query {
  [key: string]: undefined | string | string[] | Query | Query[]
}

export function asyncRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
>(handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>) {
  return function runAsyncRequestHandler(
    req: Request<P, ResBody, ReqBody, ReqQuery, Record<string, any>>,
    res: Response<ResBody, Record<string, any>>,
    next: NextFunction,
  ): void | Promise<void> {
    const result: ReturnType<RequestHandler<P, ReqBody, ResBody, ReqQuery>> = handler(
      req,
      res,
      next,
    )

    return Promise.resolve(result).catch(next)
  }
}

@Injectable()
export class RequestContextMiddleware<Request = any, Response = any>
  implements NestMiddleware<Request, Response>
{
  use(req: Request, res: Response, next: () => void) {
    // RequestContext.cls.run(new RequestContext(req, res), next);
  }
}
