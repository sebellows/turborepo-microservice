import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthenticationDto } from './dto/authentication.dto'
import { LoginDto } from './dto/login.dto'
import { ClearanceCheckDto } from './dto/clearance-check.dto'

@Controller('auth')
@ApiTags('Login')
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

  @Post('verifyAdmin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify the code to create an admin user.',
  })
  verifyAdmin(@Body() clearanceDto: ClearanceCheckDto) {
    return this.authService.verifyAdmin(clearanceDto)
  }

  @Post('verifyEmployee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify the code to create an employee user.',
  })
  verifyEmployee(@Body() employeeDto: ClearanceCheckDto) {
    return this.authService.verifyEmployee(employeeDto)
  }
}
