import { ApiProperty } from '@nestjs/swagger'
import { User } from '@trms/database'

/**
 * The login response
 */
export class AuthenticationDto {
  @ApiProperty({
    description: "User's authentication token",
    example: 'TOKEN_GERADO_AUTOMATICAMENTE',
  })
  token: string

  @ApiProperty({
    description: 'The authenticated user',
  })
  user: User
}
