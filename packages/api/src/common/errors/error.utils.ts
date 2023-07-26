import { BadRequestException } from '@nestjs/common'
import { Logger } from '../../shared/logger'

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('\n')
  const lastErrorLine = errorLines[errorLines.length - 1].trim()

  if (!lastErrorLine) {
    Logger.warn(error.message, 'handleError', error)
  }

  throw new BadRequestException(
    lastErrorLine || 'Oops, an error ocurred. Please reload the page and try again.',
  )
}
