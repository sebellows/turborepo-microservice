export const ErrorCodes = Object.freeze({
  INVALID_AUTHENTICATION: 'InvalidAuthentication',
  INTERNAL_ERROR: 'InternalError',
  CLIENT_ERROR: 'ClientError',
  NOT_FOUND: 'NotFound',
  VALIDATION_ERROR: 'ValidationError',
  INVALID_USER: 'InvalidUser',
})

export function getErrorCode(status: number | string): string {
  status = status.toString()

  if (status === '401' || status === '403') {
    return ErrorCodes.INVALID_AUTHENTICATION
  } else if (status === '404') {
    return ErrorCodes.NOT_FOUND
  } else if (status.match(/4\d\d/)) {
    return ErrorCodes.CLIENT_ERROR
  } else {
    return ErrorCodes.INTERNAL_ERROR
  }
}
