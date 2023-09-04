// import { config } from '../config'

// import { LoggerService, Message } from './logger.service'
// import { LoggerConfig, LoggerConfigRequired } from './logger.config'

// /**
//  * A facade for accessing the LoggerService singleton inside on non-DI contexts,
//  * like inside of utility function calls or debugging in development.
//  */
// class LoggerFacade {
//   static instance: LoggerFacade

//   static get lastTimestamp(): number {
//     return LoggerService.lastTimestamp
//   }

//   static get context(): string {
//     return this.instance.logger.context
//   }

//   static get config(): LoggerConfig {
//     return this.instance.logger.config
//   }

//   private constructor(private logger: LoggerService) {}

//   static getInstance(loggerConfig: LoggerConfigRequired) {
//     if (!this.instance) {
//       const loggerService = LoggerService.instance ?? LoggerService.create(loggerConfig)

//       this.instance = new LoggerFacade(loggerService)
//     }

//     return this.instance
//   }

//   static setContext(context: string) {
//     this.instance.logger.setContext(context)
//   }

//   static error(message: Message, context?: any, ...args: any[]) {
//     this.instance.logger.error(message, context, ...args)
//   }

//   static info(message: Message, context?: any, ...args: any[]) {
//     this.instance.logger.info(message, context, ...args)
//   }

//   static log(message: Message, context?: any, ...args: any[]) {
//     this.instance.logger.info(message, context, ...args)
//   }

//   static warn(message: Message, context: string = '', ...args: any[]) {
//     this.instance.logger.warn(message, context, ...args)
//   }

//   static debug(message: Message, context?: any, ...args: any[]) {
//     this.instance.logger.debug(message, context, ...args)
//   }

//   static verbose(message: Message, context?: any, ...args: any[]) {
//     this.instance.logger.verbose(message, context, ...args)
//   }
// }

// const _logger = LoggerFacade.getInstance(config('logger'))

// export const Logger = LoggerFacade
