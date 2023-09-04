import Chalk from 'chalk'
import winston, { LeveledLogMethod } from 'winston'
import { Injectable, LoggerService as NestLogger, Optional, Scope } from '@nestjs/common'
import { isPlainObject, isString } from '@trms/utils'

import { LogLevel, LoggerConfigService } from './logger.config'

export type MessageRecord = { message: string; context?: string; [key: string]: any }
export type Message = string | MessageRecord

export const messageIsRecord = <Msg extends MessageRecord>(msg: Msg): msg is Msg => {
  return isPlainObject(msg)
}

const printMessageSetup = ({ colorize }: { colorize?: boolean }) => {
  let methods: Record<LogLevel | 'highlight', (msg: string) => string> = {
    debug: (msg: string) => msg,
    info: (msg: string) => msg,
    log: (msg: string) => msg,
    highlight: (msg: string) => msg,
    warn: (msg: string) => msg,
    error: (msg: string) => msg,
    verbose: (msg: string) => msg,
  }
  if (colorize) {
    methods = {
      debug: (msg: string) => Chalk.gray(msg),
      info: (msg: string) => Chalk.gray(msg),
      log: (msg: string) => Chalk.gray(msg),
      highlight: (msg: string) => Chalk.greenBright(msg),
      warn: (msg: string) => Chalk.yellow(msg),
      error: (msg: string) => Chalk.red(msg),
      verbose: (msg: string) => Chalk.gray(msg),
    }
  }

  return methods
}

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements NestLogger {
  static instance: Logger

  private readonly _loggerInstance: winston.Logger

  private static _lastTimestamp: number
  static get lastTimestamp(): number {
    return this._lastTimestamp
  }
  private static set lastTimestamp(timestamp: number) {
    this._lastTimestamp = timestamp
  }

  private _context: string
  get context(): string {
    return this._context
  }

  private _currentContext: string
  get currentContext() {
    return this._currentContext ?? this.context
  }
  private set currentContext(ctx: string) {
    this._currentContext = ctx
  }

  readonly printer: ReturnType<typeof printMessageSetup>

  constructor(@Optional() private loggerConfig: LoggerConfigService) {
    if (Logger.instance) {
      return Logger.instance
    }

    this.setContext(this.loggerConfig.context)

    this.printer =
      this.loggerConfig.environment === 'development'
        ? printMessageSetup({ colorize: true })
        : printMessageSetup({ colorize: false })

    this._loggerInstance = loggerConfig.createWinstonInstance()
  }

  static createStaticInstance(loggerConfig: LoggerConfigService) {
    if (!this.instance) {
      this.instance = new Logger(loggerConfig)
    }
  }

  setContext(context: string) {
    this._context = context
  }

  getWinstonLogger() {
    return this._loggerInstance
  }

  error(message: Message, context?: any, ...args: any[]) {
    this.printMessage('error', message, context, ...args)
  }

  info(message: Message, context?: any, ...args: any[]) {
    this.printMessage('info', message, context, ...args)
  }

  log(message: Message, context?: any, ...args: any[]) {
    this.printMessage('info', message, context, ...args)
  }

  warn(message: Message, context: string = '', ...args: any[]) {
    this.printMessage('warn', message, context, ...args)
  }

  debug(message: Message, context?: any, ...args: any[]) {
    this.printMessage('debug', message, context, ...args)
  }

  verbose(message: Message, context?: any, ...args: any[]) {
    this.printMessage('verbose', message, context, ...args)
  }

  private parseArgs(msg: any, ctx?: any, ...args: any[]): [string, string, ...any[]] {
    let context = isString(ctx) ? ctx : this.context
    let message = ''

    if (messageIsRecord(msg)) {
      let { message: msgMessage, context: msgContext, ...rest } = msg

      message = msgMessage

      if (isString(msgContext)) {
        context = msgContext
      }

      return [message, context, ...args]
    }

    if (isString(msg)) {
      message = msg
    }

    return [message, context, ...args]
  }

  printMessage(level: LogLevel, msg: any, ctx?: any, ...args: any[]) {
    const [message, context, ...rest] = this.parseArgs(msg, ctx, ...args)
    const output = this.printer[level](message)

    const localeStringOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    }

    const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
    let prefix = this.printer[level](
      `[${this.printer.highlight(context)}] [${level}] ${process.pid} - ${timestamp} -`,
    )

    ;(this._loggerInstance[level] as LeveledLogMethod)(`${prefix} ${output}`, ...args)

    this.printTimestamp()
  }

  private printTimestamp() {
    const includeTimestamp = Logger.lastTimestamp && this.loggerConfig.timestamp
    if (includeTimestamp) {
      this._loggerInstance.log(
        'info',
        this.printer.highlight(` +${Date.now() - Logger.lastTimestamp}ms\n`),
      )
    }

    Logger.lastTimestamp = Date.now()
  }
}
