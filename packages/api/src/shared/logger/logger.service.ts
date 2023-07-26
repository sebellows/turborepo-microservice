import { Injectable, LogLevel, LoggerService as NestLoggerService, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Logger as WinstonLogger } from './logger'
import { MaskedField } from './maskPii'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  get logger() {
    return LoggerService.logger
  }

  static logger: WinstonLogger

  constructor(private config: ConfigService) {
    const appName = config.get<string>('appName', 'Generic API')
    const appVersion = config.get<string>('appVersion', '0.0.1')
    const logLevel = config.get<LogLevel>('logLevel')
    const maskedFields = config.get<MaskedField[]>('maskedFields', [])
    const enableTimestamp = config.get<boolean>('enableTimestamp', false)
    const environment = config.get<string>('environment', 'production')

    WinstonLogger.create({
      appName,
      appVersion,
      logLevel,
      maskedFields,
      enableTimestamp,
      environment,
    })

    LoggerService.logger = WinstonLogger.instance
  }

  readonly error = this.logger.error

  readonly info = this.logger.info

  readonly log = this.logger.log

  readonly warn = this.logger.warn

  readonly debug = this.logger.debug

  readonly verbose = this.logger.verbose
}

export const Logger = LoggerService.logger
