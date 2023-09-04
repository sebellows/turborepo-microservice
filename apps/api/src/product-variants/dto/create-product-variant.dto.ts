import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ProductStatusType } from '@trms/database'
import { IsString } from 'class-validator'

export class CreateProductVariantDto {
  @ApiPropertyOptional()
  active: boolean | null

  @IsString()
  @ApiProperty({
    description: 'The name assigned to the variant of a product',
    example: 'Houndstooth',
  })
  name: string

  @ApiPropertyOptional()
  sortOrder: number | null

  @ApiProperty()
  status: ProductStatusType

  @ApiPropertyOptional()
  size: string[]

  @ApiPropertyOptional()
  inseam: string[]

  @ApiPropertyOptional()
  waist: string[]
}
