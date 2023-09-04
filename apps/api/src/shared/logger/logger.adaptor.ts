import winston from 'winston'

import { maskPII } from './maskPii'
import { LoggerConfig } from './logger.config'

export function createWinstonInstance(config: LoggerConfig) {
  const { appName, appVersion, environment, logLevel, maskedFields } = config

  const metaData = winston.format(info => {
    info.appName = appName
    info.appVersion = appVersion
    info.environment = environment
    info.level = logLevel

    if (info instanceof Error) {
      info.level = 'error'
      // We want the stack trace when logging an error
      return Object.assign({}, info, {
        stack: info.stack,
        message: info.message,
      })
    }

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
