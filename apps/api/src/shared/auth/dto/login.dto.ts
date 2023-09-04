import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's email address",
    example: 'elonmush@aol.com',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's current valid password",
    example: 'correcthorsebatterystaple',
  })
  password: string
}
