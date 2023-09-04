import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthenticationDto } from './dto/authentication.dto'
import { LoginDto } from './dto/login.dto'

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Application login that provides a token',
  })
  login(@Body() loginDto: LoginDto): Promise<AuthenticationDto> {
    return this.authService.login(loginDto)
  }
}
