import {
  Address as AddressModel,
  Brand as BrandModel,
  Category as CategoryModel,
  Discount as DiscountModel,
  ImageFormat,
  Order as OrderModel,
  OrderDetail as OrderDetailModel,
  OrderStatusType,
  Payment as PaymentModel,
  PaymentStatusType,
  Price as PriceModel,
  Product as ProductModel,
  ProductImage as ProductImageModel,
  ProductStatusType,
  ProductVariant as ProductVariantModel,
  Review as ReviewModel,
  Shipping as ShippingModel,
  ShippingStatusType,
  Stock as StockModel,
  StockStatus,
  Swatch as SwatchModel,
  VariantOption as VariantOptionModel,
  Prisma,
} from '@trms/database'
import { ConditionalKeys, ConditionalRecord, ValueOf } from '@trms/utils'
import { ShopUser } from '../user/user.types'

interface PrismaModel {
  address: AddressModel
  brand: BrandModel
  category: CategoryModel
  discount: DiscountModel
  order: OrderModel
  orderDetail: OrderDetailModel
  price: PriceModel
  product: ProductModel
  productImage: ProductImageModel
  productVariant: ProductVariantModel
  review: ReviewModel
  shipping: ShippingModel
  stock: StockModel
  swatch: SwatchModel
  variantOption: VariantOptionModel
}

type RelationKey = keyof PrismaModel | 'user' | 'profile' | 'cart'
type RelationId = `${RelationKey}Id`
type NonInputKeys = 'id' | 'createdAt' | 'updatedAt' | RelationId

export interface PrismaInputModel {
  address: Omit<AddressModel, NonInputKeys>
  brand: Omit<BrandModel, NonInputKeys>
  category: Omit<CategoryModel, NonInputKeys>
  discount: Omit<DiscountModel, NonInputKeys>
  order: Omit<OrderModel, NonInputKeys>
  orderDetail: Omit<OrderDetailModel, NonInputKeys>
  price: Omit<PriceModel, NonInputKeys>
  product: Omit<ProductModel, NonInputKeys>
  productImage: Omit<ProductImageModel, NonInputKeys>
  productVariant: Omit<ProductVariantModel, NonInputKeys>
  review: Omit<ReviewModel, NonInputKeys>
  shipping: Omit<ShippingModel, NonInputKeys>
  stock: Omit<StockModel, NonInputKeys>
  swatch: Omit<SwatchModel, NonInputKeys>
  variantOption: Omit<VariantOptionModel, NonInputKeys>
}
type GetInputModel<K extends keyof PrismaInputModel> = ValueOf<PrismaInputModel, K>

/**
 * Examples of extracting and setting controller/input fields
 */
// type PartialAddressInput = Partial<PrismaInputModel['address']>

/**
 * Set all fields that have values of string or number types as required.
 *
 * @example
 * \// keys we don't want inferred in the input fields
 * type NonInputFields = 'id' | 'createdAt' | 'updatedAt' | RelationId
 * \// exclude those non-input fields
 * type AddressInput = Omit<AddressModel, NonInputKeys>
 * type AddressInputWithRequiredStringFields = SetRequired<
 *   PartialAddressInput,
 *   ConditionalKeys<PartialAddressInput, string>
 * >
 * // OUTPUT =>
 * {
 *   addressLine1: string;
 *   addressLine2: string;
 *   municipality: string;
 *   region: string;
 *   country: string;
 *   postalCode: string;
 *   isBillingAddress?: boolean;
 *   isPrimaryAddress?: boolean;
 *   isShippingAddress?: boolean;
 *   isValidAddress?: boolean;
 *   poBox?: boolean;
 * }
 */
// type AddressInputWithRequiredStringFields = SetRequired<PartialAddressInput, ConditionalKeys<PartialAddressInput, string>>

/**
 * We can also omit the boolean fields all together:
 *
 * @example
 * type AddressInputWithoutBooleanFields = ConditionalExcept<AddressModel, boolean | NonInputKeys>
 */
// type AddressInputWithoutBooleanFields = ConditionalExcept<Omit<AddressModel, NonInputKeys>, boolean>

interface PrismaCreateModel {
  address: Prisma.AddressCreateInput
  brand: Prisma.BrandCreateInput
  category: Prisma.CategoryCreateInput
  discount: Prisma.DiscountCreateInput
  order: Prisma.OrderCreateInput
  orderDetail: Prisma.OrderDetailCreateInput
  price: Prisma.PriceCreateInput
  product: Prisma.ProductCreateInput
  productImage: Prisma.ProductImageCreateInput
  productVariant: Prisma.ProductVariantCreateInput
  review: Prisma.ReviewCreateInput
  shipping: Prisma.ShippingCreateInput
  stock: Prisma.StockCreateInput
  swatch: Prisma.SwatchCreateInput
  variantOption: Prisma.VariantOptionCreateInput
}

interface PrismaCreateManyModel {
  address: Prisma.AddressCreateManyInput
  brand: Prisma.BrandCreateManyInput
  category: Prisma.CategoryCreateManyInput
  discount: Prisma.DiscountCreateManyInput
  order: Prisma.OrderCreateManyInput
  orderDetail: Prisma.OrderDetailCreateManyInput
  price: Prisma.PriceCreateManyInput
  product: Prisma.ProductCreateManyInput
  productImage: Prisma.ProductImageCreateManyInput
  productVariant: Prisma.ProductVariantCreateManyInput
  review: Prisma.ReviewCreateManyInput
  shipping: Prisma.ShippingCreateManyInput
  stock: Prisma.StockCreateManyInput
  swatch: Prisma.SwatchCreateManyInput
  variantOption: Prisma.VariantOptionCreateManyInput
}

interface PrismaUpdateModel {
  address: Prisma.AddressUpdateInput
  brand: Prisma.BrandUpdateInput
  category: Prisma.CategoryUpdateInput
  discount: Prisma.DiscountUpdateInput
  order: Prisma.OrderUpdateInput
  orderDetail: Prisma.OrderDetailUpdateInput
  price: Prisma.PriceUpdateInput
  product: Prisma.ProductUpdateInput
  productImage: Prisma.ProductImageUpdateInput
  productVariant: Prisma.ProductVariantUpdateInput
  review: Prisma.ReviewUpdateInput
  shipping: Prisma.ShippingUpdateInput
  stock: Prisma.StockUpdateInput
  swatch: Prisma.SwatchUpdateInput
  variantOption: Prisma.VariantOptionUpdateInput
}

interface PrismaUncheckedUpdateManyModel {
  address: Prisma.AddressUncheckedUpdateManyInput
  brand: Prisma.BrandUncheckedUpdateManyInput
  category: Prisma.CategoryUncheckedUpdateManyInput
  discount: Prisma.DiscountUncheckedUpdateManyInput
  order: Prisma.OrderUncheckedUpdateManyInput
  orderDetail: Prisma.OrderDetailUncheckedUpdateManyInput
  price: Prisma.PriceUncheckedUpdateManyInput
  product: Prisma.ProductUncheckedUpdateManyInput
  productImage: Prisma.ProductImageUncheckedUpdateManyInput
  productVariant: Prisma.ProductVariantUncheckedUpdateManyInput
  review: Prisma.ReviewUncheckedUpdateManyInput
  shipping: Prisma.ShippingUncheckedUpdateManyInput
  stock: Prisma.StockUncheckedUpdateManyInput
  swatch: Prisma.SwatchUncheckedUpdateManyInput
  variantOption: Prisma.VariantOptionUncheckedUpdateManyInput
}

export type GetModel<K extends keyof PrismaModel> = ValueOf<PrismaModel, K>
export type CreateOne<K extends keyof PrismaCreateModel> = ValueOf<PrismaCreateModel, K>
export type CreateMany<K extends keyof PrismaCreateManyModel> = ValueOf<PrismaCreateManyModel, K>
export type UpdateOne<K extends keyof PrismaUpdateModel> = ValueOf<PrismaUpdateModel, K>
export type UpdateMany<K extends keyof PrismaUncheckedUpdateManyModel> = ValueOf<
  PrismaUncheckedUpdateManyModel,
  K
>

interface ModelCommonFields<K extends keyof PrismaModel, IdType = ValueOf<GetModel<K>, 'id'>> {
  id: IdType
  createdAt: Date
  updatedAt: Date
}

export namespace Catalog {
  type Product = GetInputModel<'product'>
  /** SUBMIT: form response */
  export type ProductInput = Product & {
    categories?: Category[]
    variants?: ProductVariant[]
  }
  /** FROM DB: Comes from the Database */
  export type ProductRecord = Omit<GetModel<'product'>, 'brandName'>
  /** TO DB: Resolved relations set in the controller/service and posted back to DB */
  export type ProductCreateOutput = Omit<CreateOne<'product'>, 'brandName'> & {
    brand?: CreateOne<'brand'>
    userReviews?: CreateMany<'review'> // GET Reviews via `productId`
    categories?: CreateMany<'category'> // MANY relationship - GET via Category.products
    orders?: CreateOne<'order'> // GET `orderId`s from results of `OrderDetails` lookup via `productId`
    variants?: CreateMany<'productVariant'> // GET ALL variants by the `productId`
  }
  export type ProductUpdateOutput = Omit<GetModel<'product'>, 'brandName'> & {
    brand?: UpdateOne<'brand'>
    userReviews?: UpdateMany<'review'> // GET Reviews via `productId`
    categories?: UpdateMany<'category'> // MANY relationship - GET via Category.products
    orders?: UpdateMany<'order'> // GET `orderId`s from results of `OrderDetails` lookup via `productId`
    variants?: UpdateMany<'productVariant'> // GET ALL variants by the `productId`
  }

  /** Base Model */
  type ProductVariant = {
    active?: boolean
    name: string
    sortOrder?: number
    status: ProductStatusType
    size?: string[]
    inseam?: string[]
    waist?: string[]
  }
  /** FROM DB: Comes from the Database */
  export type ProductVariantRecord = ModelCommonFields<'productVariant'> & ProductVariant
  /** SUBMIT: form response */
  export type ProductVariantInput = ProductVariant & {
    options: ProductVariantOptionInput[]
    swatch: SwatchInput
  }
  /** TO DB: Base properties set in the controller/service */
  export type ProductVariantOutput = ProductVariant & {
    productId: string
    swatchId: number
  }
  /** TO DB: Resolved relations set in the controller/service and posted back to DB */
  export type ProductVariantOutputWithRelations = ProductVariant & {
    options: ProductVariantOptionOutputWithRelations[] // GET w/ ProductVariantOutput ID
    swatch: SwatchOutput // GET swatch by `swatchId`
  }

  /** Base ProductVariantOption Model */
  type ProductVariantOption = {
    SKU: string
    size?: string
    inseam?: string
    waist?: string
  }
  /** FROM DB: Comes from the Database */
  export type ProductVariantOptionRecord = ModelCommonFields<'variantOption'> & ProductVariantOption
  /** SUBMIT: form response */
  export type ProductVariantOptionInput = ProductVariantOption & {
    stock?: StockInput
    price?: PriceInput
  }
  /** TO DB (Pt. 1): Base properties set in the controller/service */
  export type ProductVariantOptionOutput = ProductVariantOption & {
    id: number
    createdAt: Date
    updatedAt: Date
    priceId?: number
    variantId?: string
  }
  /** TO DB (Pt. 2): Resolved relations set in the controller/service and posted back to DB */
  export type ProductVariantOptionOutputWithRelations = ProductVariantOptionOutput & {
    stock: StockOutput // - GET stock by ProductVariantOption ID
  }

  type Price = {
    currentPrice: number
    fullPrice: number
    formattedPrice: string // Set in service
    isoCurrencyCode?: string // MAYBE set via response or service
  }
  /** FROM DB: Comes from the Database */
  export type PriceRecord = ModelCommonFields<'price'> & Price
  /** SUBMIT: form response */
  export type PriceInput = Price
  /** TO DB: Base properties set in the controller/service */
  export type PriceOutput = Price

  /** Base `Stock` Model */
  type Stock = {
    code?: string // This should be the concatenated product variant ID and product option value
    quantity: number
    // for Advance Shipment Notice (ASN)
    nextDelivery?: Date
    nextDeliveryQuantity?: number
    status?: StockStatus
  }
  /** SUBMIT: form response */
  export type StockInput = Stock
  /** TO DB: Base properties set in the controller/service */
  export type StockOutput = Stock & {
    variantId?: string // SET from direct `VariantOption.id`
    variantSku?: string // SET from direct `VariantOption.SKU`
  }
  /** FROM DB: Comes from the Database */
  export type StockRecord = ModelCommonFields<'stock'> & StockOutput

  /** Base `ProductImage` Model */
  type ProductImage = {
    altText?: string
    resource: string // JSON
    format?: ImageFormat
  }
  /** SUBMIT: form response */
  export type ProductImageInput = ProductImage
  /** TO DB: Base properties set in the controller/service */
  export type ProductImageOutput = ProductImage & {
    variantId?: string
  }
  /** FROM DB: Comes from the Database */
  export type ProductImageRecord = ModelCommonFields<'productImage'> & ProductImageOutput

  /** Base `Category` Model */
  type Category = {
    description?: string
    name: string
    path?: string
  }
  /** SUBMIT: form response */
  export type CategoryInput = Category & {
    code?: string | null // MAYBE SET custom `code` in form
    parentId?: CategoryInput // MAYBE SET immediate Category parent ID
  }
  /** TO DB (Pt. 1): Base properties set in the controller/service */
  export type CategoryOutput = Category & {
    code: string // MAYBE SET⎯if not set in form⎯generated by concatenating category IDs (`cat1_cat2`)
    parentId?: number | null // MAYBE SET by relatively resolving category parent
  }
  /** FROM DB: Comes from the Database */
  export type CategoryRecord = ModelCommonFields<'category'> & CategoryOutput
  /** TO DB (Pt. 2): Resolved relations set in the controller/service */
  export type CategoryOutputWithRelations = Category &
    Pick<CategoryOutput, 'code'> & {
      parent?: CategoryOutputWithRelations // SET the immediate parent category using `parentId`
    }

  /** Base `Swatch` Model */
  type Swatch = {
    code?: string // e.g., 'B' for blue, 'Bl' for black, used for generating SKU
    name: string
    hex?: string
    image?: string // JSON: { "src": "https://...", "width": 80, "height": 55, "alt": "red" }
  }
  /** SUBMIT: form response */
  export type SwatchInput = Swatch
  /** TO DB: Base properties set in the controller/service */
  export type SwatchOutput = Swatch
  /** FROM DB: Comes from the Database */
  export type SwatchRecord = ModelCommonFields<'swatch'> & SwatchOutput
  /** RELATION: Resolve a related object using own ID */
  export type GetVariantOptionWithSwatchID = {
    variant?: ProductVariantOutputWithRelations // Get ProductVariant via the Swatch ID
  }

  /** Base `Order` Model */
  type Order = {
    items?: OrderDetails[] // GET OrderDetails array via the Order ID
    status?: OrderStatusType
    discounts?: Discount[] // GET Discounts array via the Order ID
    shipping?: Shipping // GET Discounts array via the Order ID
    payment?: Payment // GET Discounts array via the Order ID
  }
  export type OrderInput = {
    payment?: Payment // GET Discounts array via the Order ID
    userId?: string // MAYBE SET the user ID of user who placed the order
  }
  export type OrderOutput = {
    status?: OrderStatusType // Validate in service by checking order status
    items?: Prisma.OrderDetailCreateManyInput // GET OrderDetails array via the Order ID
    discounts?: Prisma.DiscountCreateManyInput[] // GET Discounts array via the Order ID
    shipping?: CreateOne<'shipping'> // GET Shipping data via the Order ID
    // payment?: CreateOne<''> // GET Payment data via the Order ID
  }
  export type GetPaymentWithOrderId = {
    items?: OrderDetails[] // GET OrderDetails array via the Order ID
    discounts?: Discount[] // GET Discounts array via the Order ID
    shipping?: Shipping // GET Discounts array via the Order ID
    payment?: Payment // GET Discounts array via the Order ID
  }
  export type GetRelationsWithOrderId = {
    user?: ShopUser.UserRecord // GET OrderDetails array via the Order ID
    payment?: PaymentModel // GET Payment via the Order ID
  }
  /** FROM DB: Comes from the Database */
  export type OrderRecord = ModelCommonFields<'order'> & OrderOutput

  export type Payment = {
    provider?: String // i.e., Visa, PayPal, etc.
    status?: PaymentStatusType
    total?: number
  }

  export type OrderDetails = {
    quantity?: number
    total: number
  }

  export type Discount = {
    expiresOn?: Date
    active?: boolean
    description?: string // JSON
    name?: string
    percentage?: number
  }

  export type UserReview = {
    label: string
    rating: number
    comment?: string | null
    profileId?: string
  }

  export type ShippingOption = {
    name: string // e.g., '2-Day Air', 'Ground', 'Standard', etc.

    // Relations
    provider: ShippingProvider // @relation(fields: [providerId], references: [id])
    providerId: number
    shipment: Shipping[]
  }

  export type ShippingProvider = {
    name: string
    accountId: string
    options: ShippingOption[]
    shipments: Shipping[]
  }

  export type Shipping = {
    status?: ShippingStatusType
    shippingOption?: ShippingOption // @relation(fields: [providerId, shipmentMethod], references: [providerId, name])
    shipmentMethod?: string

    order: Order // @relation(fields: [orderId], references: [id])
    orderId: number // @unique
    provider: ShippingProvider // @relation(fields: [providerId], references: [id])
    providerId: number // @unique
  }
}
