import { ApiPropertyOptional } from '@nestjs/swagger'
import { ImageFormat, ProductStatusType, StockStatus } from '@trms/database'

export type CreateCategory = {
  code?: string | null
  description?: string
  name: string
  path?: string
  parent?: CreateCategory
}

export type CreateProductVariant = {
  active?: boolean
  name: string
  sortOrder?: number
  status: ProductStatusType
  size?: string[]
  inseam?: string[]
  waist?: string[]
  images: CreateProductImage[]
}

export type CreateProductVariantOption = {
  SKU: string
  size?: string
  inseam?: string
  waist?: string
  stock?: CreateStock
  price?: CreatePrice
}

export type CreatePrice = {
  currentPrice: number
  fullPrice: number
  formattedPrice?: string
  isoCurrencyCode?: string
}

export type CreateStock = {
  code?: string // This should be the concatenated product variant ID and product option value
  quantity: number
  // for Advance Shipment Notice (ASN)
  nextDelivery?: Date
  nextDeliveryQuantity?: number
  status?: StockStatus

  productVariant?: CreateProductVariantOption // CREATE
  variantId?: string // RESPONSE
  variantSku?: string // RESPONSE
}

export type CreateProductImage = {
  altText?: string
  resource?: string // JSON
  format?: ImageFormat
}

export type CreateDiscount = {
  expiresOn?: Date
  active?: boolean
  description?: string // JSON
  name?: string
  percentage?: number
}

export type CreateUserReview = {
  label: string
  rating: number
  comment?: string | null
  profileId?: string
}

export type CreateShippingOption = {
  name: string // e.g., '2-Day Air', 'Ground', 'Standard', etc.

  // Relations
  provider: CreateShippingProvider // @relation(fields: [providerId], references: [id])
  providerId: number
  shipment: CreateShipping[]
}

export type CreateShippingProvider = {
  name: string
  accountId: string
  options: CreateShippingOption[]
  shipments: CreateShipping[]
}

export type CreateShipping = {
  status?: ShippingStatusType
  shippingOption?: CreateShippingOption // @relation(fields: [providerId, shipmentMethod], references: [providerId, name])
  shipmentMethod?: string

  order: CreateOrder // @relation(fields: [orderId], references: [id])
  orderId: number // @unique
  provider: CreateShippingProvider // @relation(fields: [providerId], references: [id])
  providerId: number // @unique
}

export class CreateProductVariantDto {
  @ApiPropertyOptional()
  brandName?: string

  @ApiPropertyOptional()
  Brand?: { name: string }

  @ApiPropertyOptional()
  code?: string

  @ApiPropertyOptional()
  rating?: number

  @ApiPropertyOptional()
  uid?: string

  @ApiPropertyOptional()
  categories?: CreateCategoryObj[]

  @ApiPropertyOptional()
  variants?: string
}
