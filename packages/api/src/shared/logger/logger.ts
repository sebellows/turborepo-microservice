import Chalk, { BackgroundColorName, ColorName, ForegroundColorName } from 'chalk'
import winston, { LeveledLogMethod } from 'winston'
import { isPlainObject } from '@trms/utils'

import { MaskedField, maskPII, resolveMaskedFields } from './maskPii'

const logLevels = ['info', 'debug', 'log', 'warn', 'error', 'verbose'] as const
type LogLevel = (typeof logLevels)[number]

function createWinstonInstance(config: LoggerConfig) {
  const { appName, appVersion, environment, logLevel, maskedFields } = config

  const metaData = winston.format(info => {
    info.appName = appName
    info.appVersion = appVersion
    info.environment = environment
    info.level = logLevel

    return info
  })

  const maskData = winston.format(info => {
    if (info.meta) {
      info.meta = maskPII(info.meta, maskedFields, 4)
    }

    return info
  })

  const formats = [winston.format.timestamp(), metaData(), maskData()]

  if (environment === 'development') {
    formats.push(winston.format.prettyPrint())
  } else {
    formats.push(winston.format.json())
  }

  const logFormat = winston.format.combine(...formats)

  return winston.createLogger({
    level: logLevel,
    transports: [
      new winston.transports.Console({
        level: logLevel,
        format: logFormat,
      }),
    ],
    format: logFormat,
  })
}

export interface LoggerConfig {
  appName: string
  appVersion: string
  environment?: string
  context?: string
  enableTimestamp?: boolean
  logLevel?: (typeof logLevels)[number]
  maskedFields?: MaskedField[]
}

export interface LoggerParams extends Omit<LoggerConfig, 'maskedFields'> {
  maskedFields?: string | MaskedField[]
}

export class Logger {
  static instance: Logger

  private readonly _loggerInstance: winston.Logger

  private static lastTimestamp?: number

  private _contextName: string

  private constructor(config: LoggerConfig) {
    const {
      appName = 'Generic API',
      appVersion = '0.0.1',
      enableTimestamp = false,
      environment = 'development',
      logLevel = 'info',
      maskedFields = [],
    } = config

    const contextName = `${appName} [v${appVersion}]`
    this._contextName = contextName

    this._loggerInstance = createWinstonInstance({
      appName,
      appVersion,
      environment,
      context: contextName,
      enableTimestamp,
      logLevel,
      maskedFields: resolveMaskedFields(maskedFields),
    })
  }

  static create(config: LoggerConfig) {
    if (!Logger.instance) {
      Logger.instance = new Logger(config)
    }

    return Logger.instance
  }

  error(message: any, context: string = '', trace = '', ...args: any[]) {
    this.printMessage('error', 'red', context, message, ...args)
    this.printStackTrace(trace)
  }

  info(message: string, context: string = '', ...args: any[]) {
    this.printMessage('info', 'gray', context, message, ...args)
  }

  log(message: string, context: string = '', ...args: any[]) {
    this.printMessage('info', 'gray', context, message, ...args)
  }

  warn(message: string, context: string = '', ...args: any[]) {
    this.printMessage('warn', 'yellow', context, message, ...args)
  }

  debug(message: string, context: string = '', ...args: any[]) {
    this.printMessage('debug', 'gray', context, message, ...args)
  }

  verbose(message: string, context: string = '', ...args: any[]) {
    this.printMessage('verbose', 'cyan', context, message, ...args)
  }

  printMessage<Color extends ColorName | BackgroundColorName | ForegroundColorName = ColorName>(
    level: LogLevel,
    color: Color,
    context: string = '',
    message: any,
    ...args: any[]
  ) {
    const output = isPlainObject(message)
      ? `${Chalk[color]('Object:')}\n${JSON.stringify(message, null, 2)}\n`
      : Chalk[color](message)

    const localeStringOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    }

    const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
    let prefix = Chalk[color](`[${this._contextName}] [${level}] ${process.pid} - ${timestamp} - `)
    if (context.length) {
      prefix += Chalk.yellow(`${context}  `)
    }
    ;(this._loggerInstance[level] as LeveledLogMethod)(`${prefix}${output}`, ...args)

    this.printTimestamp()
    process.stdout.write(`\n`)
  }

  private printTimestamp(isTimeDiffEnabled = true) {
    const includeTimestamp = Logger.lastTimestamp && isTimeDiffEnabled
    if (includeTimestamp) {
      this._loggerInstance.log('info', Chalk.yellow(` +${Date.now() - Logger.lastTimestamp}ms`))
    }

    Logger.lastTimestamp = Date.now()
  }

  private printStackTrace(trace: string) {
    if (!trace) return

    process.stdout.write(trace)
    process.stdout.write(`\n`)
  }
}
