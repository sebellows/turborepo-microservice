import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common'
import { APP_FILTER, BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core'
import { Prisma } from '@prisma/client'

export type ErrorCodesStatusMapping = {
  [key: string]: number
}

/**
 * Default error codes mapping based on error code definitions for Prisma Client (Query Engine)
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
const DEFAULT_ERROR_CODES_STATUS_MAPPING = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
}

/**
 * PrismaClientExceptionFilter catches Prisma.PrismaClientKnownRequestError} exceptions.
 * @see {@link Prisma.PrismaClientKnownRequestError}
 */
@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private _errorCodesStatusMapping: ErrorCodesStatusMapping = DEFAULT_ERROR_CODES_STATUS_MAPPING

  private get errorCodesStatusMapping() {
    return this._errorCodesStatusMapping
  }
  /**
   * Allow mapping/overwriting for custom error codes.
   *
   * @example
   * const { httpAdapter } = app.get(HttpAdapterHost);
   * app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
   *   P2022: HttpStatus.BAD_REQUEST,
   * }));
   */
  private set errorCodesStatusMapping(errorCodes: ErrorCodesStatusMapping) {
    this._errorCodesStatusMapping = Object.assign(this.errorCodesStatusMapping, errorCodes)
  }

  constructor(
    applicationRef?: HttpServer,
    errorCodesStatusMapping: ErrorCodesStatusMapping | null = null,
  ) {
    super(applicationRef)

    if (errorCodesStatusMapping) {
      this.errorCodesStatusMapping = errorCodesStatusMapping
    }
  }

  /**
   * TS intellisense doesn't like a method named catch. Thinks it's a try/catch rule violation.
   * @ts-ignore-next-line */
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    return this.catchClientKnownRequestError(exception, host)
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const statusCode = this.errorCodesStatusMapping[exception.code]
    const message = `[${exception.code}]: ` + this.exceptionShortMessage(exception.message)

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host)
    }

    return super.catch(new HttpException({ statusCode, message }, statusCode), host)
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'))
    return shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim()
  }
}

export function providePrismaClientExceptionFilter(
  errorCodesStatusMapping?: ErrorCodesStatusMapping,
) {
  return {
    provide: APP_FILTER,
    useFactory: ({ httpAdapter }: HttpAdapterHost) => {
      return new PrismaClientExceptionFilter(httpAdapter, errorCodesStatusMapping)
    },
    inject: [HttpAdapterHost],
  }
}
