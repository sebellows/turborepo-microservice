import { HttpStatus, UnauthorizedException } from '@nestjs/common'

// TODO: expand on this to make it more informative for the user
export class InvalidCredentialsException extends UnauthorizedException {
  constructor(message?: string) {
    super(
      message ?? 'Account has invalid credentials or does not exist',
      HttpStatus.UNAUTHORIZED.toLocaleString(),
    )
  }
}

export const throwInvalidCredentialsException = (message?: string) =>
  new InvalidCredentialsException(message)

export const maybeThrowInvalidCredentialsException = (isValid: boolean, message?: string) =>
  !isValid && new InvalidCredentialsException(message)
