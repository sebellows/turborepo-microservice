import { SetOptional } from 'type-fest'
import { ConfigService } from '@nestjs/config'
import { SetRequired } from '@trms/utils'
import winston from 'winston'

import { MaskedField } from './maskPii'

import { maskPII } from './maskPii'
import { join, resolve } from 'path'

export const logLevels = ['info', 'debug', 'log', 'warn', 'error', 'verbose'] as const
export type LogLevel = (typeof logLevels)[number]

export interface LoggerConfig {
  appName: string
  appVersion: string
  environment: string
  context: string
  timestamp?: boolean
  localeOptions: Intl.DateTimeFormatOptions
  logLevel: LogLevel
  maskedFields: MaskedField[]
}

type LoggerConfigPartial = SetOptional<
  LoggerConfig,
  'appName' | 'appVersion' | 'context' | 'environment'
>
export type LoggerConfigRequired = SetRequired<
  Partial<LoggerConfig>,
  'appName' | 'appVersion' | 'context'
>

export const loggerConfigDefaults: LoggerConfigPartial = {
  timestamp: false,
  localeOptions: {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
  },
  logLevel: 'info',
  maskedFields: [],
}

const MESSAGE = Symbol.for('message')

export class LoggerConfigService {
  readonly logLevel: LogLevel = 'info'
  readonly environment: 'development' | 'stage' | 'production'
  readonly timestamp: boolean

  readonly formatter: winston.Logform.Format

  readonly logDir = resolve(process.cwd(), '.logs/trms-api')
  readonly errorFile = join(this.logDir, 'error.log')
  readonly exceptionFile = join(this.logDir, 'exceptions.log')

  private static _lastTimestamp: number
  static get lastTimestamp(): number {
    return this._lastTimestamp
  }
  private static set lastTimestamp(timestamp: number) {
    this._lastTimestamp = timestamp
  }

  private _context: string = ''
  get context() {
    return this._context
  }
  set context(ctx: string) {
    this._context = ctx
  }

  get consoleTransport() {
    return new winston.transports.Console({
      format: this.formatter,
      level: this.logLevel,
    })
  }

  get logTransports() {
    return [
      this.consoleTransport,
      new winston.transports.File({
        level: 'error',
        filename: this.errorFile,
      }),
    ]
  }

  constructor(private configService: ConfigService) {
    const appName = configService.get('appName')
    const appVersion = configService.get('appVersion')
    this.environment = configService.get('environment')
    const _loggerConfig = configService.get('logger', {})

    const _mergedLoggerConfig = { ..._loggerConfig, ...loggerConfigDefaults }
    const { localeOptions, logLevel, maskedFields, timestamp = true } = _mergedLoggerConfig

    if (logLevel) {
      this.logLevel = logLevel
    }

    this.context = `${appName} v${appVersion}`
    this.timestamp = timestamp

    let winstonFormatter =
      this.environment === 'development' ? winston.format.prettyPrint() : winston.format.json()

    this.formatter = winston.format.combine(
      { transform: this.jsonFormatter(localeOptions) },
      { transform: this.metaFormatter(appName, appVersion) },
      { transform: this.maskPiiFormatter(maskedFields) },
      winstonFormatter,
    )
  }

  createWinstonInstance() {
    return winston.createLogger(this.createWinstonModuleOptions())
  }

  private createWinstonModuleOptions() {
    return {
      level: this.logLevel,
      format: this.formatter,
      transports: this.environment === 'development' ? this.consoleTransport : this.logTransports,
      exceptionsHandlers: [
        new winston.transports.File({
          filename: this.exceptionFile,
        }),
      ],
      exitOnError: false,
    }
  }

  private metaFormatter(appName: string, appVersion: string) {
    return (info: any) => {
      info.appName = appName
      info.appVersion = appVersion
      info.environment = this.environment
      info.level = this.logLevel

      if (info instanceof Error) {
        // info.level = 'error'
        // We want the stack trace when logging an error
        return Object.assign({}, info, {
          stack: info.stack,
          message: info.message,
        })
      }

      return info
    }
  }

  private maskPiiFormatter(maskedFields: MaskedField[]) {
    return (info: any) => {
      if (info.meta) {
        info.meta = maskPII(info.meta, maskedFields, 4)
      }

      return info
    }
  }

  private jsonFormatter(localeOptions: Intl.DateTimeFormatOptions) {
    return (info: any) => {
      const locale = this.configService.get('locale', 'en-US')
      const now = new Date()
      const base = { timestamp: now.toLocaleDateString(locale, localeOptions) }
      const json = Object.assign(base, info)
      info[MESSAGE] = JSON.stringify(json)
      return info
    }
  }
}
