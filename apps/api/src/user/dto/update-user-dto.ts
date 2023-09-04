import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@trms/database'
import {
  Length,
  IsEmail,
  MinLength,
  IsString,
  Matches,
  IsPhoneNumber,
  IsLocale,
  IsUUID,
} from 'class-validator'

export class UpdateUserDto {
  @Length(2)
  @ApiProperty({
    description: "User's first name (minimum 2 characters)",
    example: 'Cliff',
  })
  firstName: string

  @Length(1)
  @ApiPropertyOptional({
    description: "User's middle name (minimum 1 characters)",
    example: 'Calvin',
  })
  middleName?: string

  @Length(2)
  @ApiProperty({
    description: "User's last name (minimum 2 characters)",
    example: 'Clavin',
  })
  lastName: string

  @IsUUID()
  @ApiProperty({
    description: "User's assigned customer ID after becoming a member.",
    example: '',
  })
  customerId: string

  @IsEmail()
  @ApiProperty({
    description: 'User email.',
    example: 'ccclavin@hotmail.com',
  })
  email: string

  @MinLength(8)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description:
      'User password. Must contain uppercase, lowercase, numbers, and a unicorn emoji (🦄).',
    example: 'Correct🦄BatterySt8ple',
  })
  password: string

  @MinLength(11)
  @IsPhoneNumber()
  @ApiPropertyOptional({
    description: "The user's main phone number",
    example: '1-555-867-5309',
  })
  phone: string

  @IsLocale()
  @ApiProperty({
    description: "The user's preferred language.",
    example: 'en-US',
  })
  preferredLanguage: string

  @ApiProperty({
    description: "The user's assigned role",
    example: 'admin',
  })
  role: Role
}
