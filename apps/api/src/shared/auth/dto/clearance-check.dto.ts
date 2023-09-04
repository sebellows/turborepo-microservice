import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ClearanceCheckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role secret for an account with a determined clearance',
    example: 'ADM$00kf56@!',
  })
  code: string
}
