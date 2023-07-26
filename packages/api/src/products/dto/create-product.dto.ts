// export type ProductData = {
//   brandName?: string
//   code?: string
//   description: string
//   name: string
//   rating?: number
//   uid?: string
//   brand?: { id: number; name: string }
//   userReviews?: UserReviewData[]
//   categories?: CategoryData[]
//   orders?: OrderData[]
//   variants?: ProductVariantData[]
// }

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export type CreateCategoryObj = {
  code?: string | null
  description?: string
  name: string
  path?: string
  parentId?: number | null
}

export class CreateProductDto {
  @ApiPropertyOptional()
  brandName?: string

  @ApiProperty({
    description: 'The name of the product',
    example: "Men's Shortsleeve Plaid Dress Shirt",
  })
  name: string

  @ApiProperty({
    description: 'Code of product.',
    example: 'PC1350100',
  })
  code: string

  @ApiProperty({
    description: 'JSON object containing a product description detailing HTML output',
    example: '[{"type": "paragraph","children":[{"text":"100% cotton"}] }]',
  })
  description: string

  @ApiProperty({
    description: 'Unique ID that should be generated by the ProductService using uuid.v4',
    example: '7422490d-1400-4727-a8c4-67f27f280d74',
  })
  uid: string

  @ApiPropertyOptional()
  rating?: number
}
