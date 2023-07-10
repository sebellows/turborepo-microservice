import { ImageFormat, ProductStatusType, StockStatus } from '@prisma/client'
import { gen } from './seed-ids'
import { images } from './images'
import { swatches } from './swatches'

const at = gen.at('skus')

const sizes = ['S', 'M', 'L']
// const randomQuantity = (max = 10) => Math.floor(Math.random() * max) + 1

let skuIndex = 0

type VariantOptionType = {
  SKU: string
  size: string
  price: {
    create: {
      isoCurrencyCode: string
      currentPrice: number
      formattedValue: string
      fullPrice: number
    }
  }
  stock: {
    create: {
      quantity: number
      status: StockStatus
    }
  }
}

function generateVariantOptions(
  sizeArr: string[],
  stockAmt: number[],
  currentPrice: number,
  fullPrice = currentPrice,
) {
  return sizeArr.reduce((acc, size, i) => {
    const stock = stockAmt[i]
    acc.push({
      SKU: at(skuIndex++),
      size,
      price: {
        create: {
          isoCurrencyCode: 'USD',
          currentPrice: currentPrice,
          formattedValue: `$${currentPrice}.00`,
          fullPrice,
        },
      },
      stock: {
        create: {
          quantity: stock,
          status: stock > 0 ? StockStatus.IN_STOCK : StockStatus.NONE,
        },
      },
    })
    return acc
  }, [] as VariantOptionType[])
}

type VariantParams = {
  name: string
  sizes: string[]
  quantities: number[]
  price: number
  fullPrice: number
  imageIndex: number
  swatch: string
}
function generateProductVariant(...variantParams: VariantParams[]) {
  function generateVariant(params: VariantParams, index: number) {
    const _sizes = params.sizes
    const isActive = index === 0
    return {
      name: params.name,
      active: isActive,
      size: _sizes,
      options: {
        create: generateVariantOptions(_sizes, params.quantities, params.price, params.fullPrice),
      },
      images: {
        create: [
          {
            resource: JSON.stringify(images[`${params.imageIndex}`]),
            format: ImageFormat.PORTRAIT,
          },
        ],
      },
      status: params.quantities.some(q => q > 0)
        ? ProductStatusType.AVAILABLE
        : ProductStatusType.UNAVAILABLE,
      swatch: { create: swatches[params.swatch] },
    }
  }

  return variantParams.map((params, i) => generateVariant(params, i))
}

export const variants = [
  ...generateProductVariant(
    {
      name: 'Black',
      sizes,
      quantities: [10, 3, 7],
      price: 190,
      fullPrice: 190,
      imageIndex: 15,
      swatch: 'black',
    },
    {
      name: 'White',
      sizes,
      quantities: [5, 0, 3],
      price: 190,
      fullPrice: 190,
      imageIndex: 17,
      swatch: 'white',
    },
  ),
  ...generateProductVariant({
    name: '',
    sizes,
    quantities: [20, 9, 13],
    price: 35,
    fullPrice: 50,
    imageIndex: 16,
    swatch: 'thinPlaid',
  }),
  ...generateProductVariant({
    name: '',
    sizes,
    quantities: [4, 6, 0],
    price: 300,
    fullPrice: 300,
    imageIndex: 14,
    swatch: 'fatPlaid',
  }),
  ...generateProductVariant({
    name: 'Medium Dark Wash',
    sizes: ['30x30', '30x32', '30x34', '32x32', '32x34', '32x36', '34x32', '34x34', '34x36'],
    quantities: [2, 3, 0, 1, 4, 2, 2, 0, 1],
    price: 200,
    fullPrice: 200,
    imageIndex: 0,
    swatch: 'denim',
  }),
  ...generateProductVariant({
    name: 'Dark Wash',
    sizes: ['30x30', '30x32', '30x34', '32x32', '32x34', '32x36', '34x32', '34x34', '34x36'],
    quantities: [2, 3, 0, 1, 4, 2, 2, 0, 1],
    price: 100,
    fullPrice: 100,
    imageIndex: 9,
    swatch: 'denimDark',
  }),
  ...generateProductVariant({
    name: 'Light Wash',
    sizes: ['30x30', '30x32', '30x34', '32x32', '32x34', '32x36', '34x32', '34x34', '34x36'],
    quantities: [2, 3, 0, 1, 4, 2, 2, 0, 1],
    price: 500,
    fullPrice: 500,
    imageIndex: 11,
    swatch: 'denimFaded',
  }),
  ...generateProductVariant({
    name: 'Black Suede',
    sizes: ['9', '10', '12'],
    quantities: [0, 0, 0],
    price: 180,
    fullPrice: 180,
    imageIndex: 8,
    swatch: 'black',
  }),
  ...generateProductVariant({
    name: 'Suede',
    sizes: ['9', '10', '12'],
    quantities: [7, 7, 7],
    price: 190,
    fullPrice: 190,
    imageIndex: 10,
    swatch: 'bone',
  }),
  ...generateProductVariant({
    name: 'Leather',
    sizes: ['9', '10', '12'],
    quantities: [4, 1, 9],
    price: 41,
    fullPrice: 60,
    imageIndex: 12,
    swatch: 'brown',
  }),
  // Womens
  ...generateProductVariant({
    name: 'Floral',
    sizes: ['XS', 'SM', 'MD'],
    quantities: [2, 5, 5],
    price: 134,
    fullPrice: 134,
    imageIndex: 2,
    swatch: 'floralDark',
  }),
  ...generateProductVariant({
    name: 'Striped Floral',
    sizes: ['XS', 'SM', 'MD'],
    quantities: [0, 1, 2],
    price: 80,
    fullPrice: 80,
    imageIndex: 13,
    swatch: 'floralPink',
  }),
  ...generateProductVariant({
    name: 'A-Line',
    sizes: ['SM', 'MD'],
    quantities: [1, 2],
    price: 85,
    fullPrice: 85,
    imageIndex: 4,
    swatch: 'floralTeal',
  }),
  ...generateProductVariant({
    name: 'Medium Wash',
    sizes: ['24x30', '24x32', '26x30', '26x32', '27x30', '28x30', '30x30', '32x30', '32x32'],
    quantities: [2, 3, 0, 1, 4, 2, 2, 0, 1],
    price: 20,
    fullPrice: 38,
    imageIndex: 6,
    swatch: 'denim',
  }),
  ...generateProductVariant({
    name: 'Dark Wash',
    sizes: ['24x30', '24x32', '26x30', '26x32', '27x30', '28x30', '30x30', '32x30', '32x32'],
    quantities: [2, 3, 0, 1, 4, 2, 2, 0, 1],
    price: 50,
    fullPrice: 50,
    imageIndex: 7,
    swatch: 'denimDark',
  }),
  ...generateProductVariant({
    name: 'Brown',
    sizes: ['5', '6', '6.5', '7', '8.5'],
    quantities: [1, 3, 14, 10, 22],
    price: 90,
    fullPrice: 90,
    imageIndex: 1,
    swatch: 'brown',
  }),
  ...generateProductVariant({
    name: 'Black',
    sizes: ['5', '6', '6.5', '7', '8.5'],
    quantities: [1, 3, 14, 10, 22],
    price: 399,
    fullPrice: 399,
    imageIndex: 5,
    swatch: 'black',
  }),
  ...generateProductVariant({
    name: 'White',
    sizes: ['5', '6', '6.5', '7', '8.5'],
    quantities: [11, 13, 4, 20, 12],
    price: 72,
    fullPrice: 72,
    imageIndex: 3,
    swatch: 'white',
  }),
]
