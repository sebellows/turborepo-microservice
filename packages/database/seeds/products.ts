import { ImageFormat, ProductStatusType } from '@prisma/client'

import { categories } from './categories'
// import { getReviewsByProductId } from './reviews'
import { gen } from './seed-ids'
import { variants } from './variants'
import { images } from './images'

const at = gen.at('products')

const products = [
  {
    sku: at(0),
    name: 'Club Room® Fitted Button Up Shirt',
    images: {
      create: [
        {
          resource: JSON.stringify(images['15']),
          // variantId: variants.black.uid,
          format: ImageFormat.PORTRAIT,
        },
        {
          resource: JSON.stringify(images['17']),
          // variantId: variants.white.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'Perfect for a night out at the Roxbury.',
    brand: 'Club Room',
    categories: { create: [categories.menShirts] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 190,
        discounted: false,
        formattedValue: '$190.00',
        fullPrice: 190,
      },
    },
    stock: {
      create: {
        // productId: at(0),
        quantity: 10,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(0)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.black, variants.white] },
  },
  {
    sku: at(1),
    name: 'H&M® Mens Shortsleeve Plaid Dress Shirt',
    images: {
      create: [
        {
          resource: JSON.stringify(images['16']),
          // variantId: variants.thinPlaid.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'The perfect fit for any man who is over 6 feet tall and only weighs 120 pounds.',
    brand: 'H&M',
    categories: { create: [categories.menShirts] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 35,
        discounted: true,
        formattedValue: '$35.00',
        fullPrice: 50,
      },
    },
    stock: {
      create: {
        // productId: at(1),
        quantity: 20,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(1)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.thinPlaid] },
  },
  {
    sku: at(2),
    name: 'Tom Ford® Mens Longsleeve Flannel Shirt',
    images: {
      create: [
        {
          resource: JSON.stringify(images['14']),
          // variantId: variants.fatPlaid.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Look like the embodiment of everything that killed grunge in the 90's",
    brand: 'Tom Ford',
    categories: { create: [categories.menShirts] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 300,
        discounted: false,
        formattedValue: '$300.00',
        fullPrice: 300,
      },
    },
    stock: {
      create: {
        // productId: at(2),
        quantity: 2,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(2)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.fatPlaid] },
  },
  {
    sku: at(3),
    name: "Acme® Men's Loose-Fitting Jeans",
    images: {
      create: [
        {
          resource: JSON.stringify(images['0']),
          // variantId: variants.denim.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Men's Loose-Fitting Jeans",
    brand: 'Acme',
    categories: { create: [categories.menJeans] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 200,
        discounted: false,
        formattedValue: '$200.00',
        fullPrice: 200,
      },
    },
    stock: {
      create: {
        // productId: at(3),
        quantity: 1,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(3)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.denim] },
  },
  {
    sku: at(4),
    name: "Acme® Men's Bootcut Jeans",
    images: {
      create: [
        {
          resource: JSON.stringify(images['9']),
          // variantId: variants.denimDark.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Men's Bootcut Jeans",
    brand: 'Acme',
    categories: { create: [categories.menJeans] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 100,
        discounted: false,
        formattedValue: '$100.00',
        fullPrice: 100,
      },
    },
    stock: {
      create: {
        // productId: at(4),
        quantity: 2,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(4)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.denimDark] },
  },
  {
    sku: at(5),
    name: "XXX® Men's Distresed Skinny Jeans",
    images: {
      create: [
        {
          resource: JSON.stringify(images['11']),
          // variantId: variants.denimDark.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "We made these jeans look like you live dangerously even though you really don't.",
    brand: 'XXX',
    categories: { create: [categories.menJeans] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 500,
        discounted: false,
        formattedValue: '$500.00',
        fullPrice: 500,
      },
    },
    stock: {
      create: {
        // productId: at(5),
        quantity: 3,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(5)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.denimDark] },
  },
  {
    sku: at(6),
    name: "Minnetonka® Men's Black Moccasins",
    images: {
      create: [
        {
          resource: JSON.stringify(images['8']),
          // variantId: variants.black.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'Genuine leather moccasins.',
    brand: 'Minnetonka',
    categories: { create: [categories.menShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 180,
        discounted: false,
        formattedValue: '$180.00',
        fullPrice: 180,
      },
    },
    stock: {
      create: {
        // productId: at(6),
        quantity: 0,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(6)),
    // },
    status: ProductStatusType.OUT_OF_STOCK,
    variants: { create: [variants.black] },
  },
  {
    sku: at(7),
    name: "Merrell® Men's Suede Outdoor Shoes",
    images: {
      create: [
        {
          resource: JSON.stringify(images['10']),
          // variantId: variants.bone.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'Suede or su-su-sussudio? Yeah, Phil Collins.',
    brand: 'Merrell',
    categories: { create: [categories.menShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 190,
        discounted: false,
        formattedValue: '$190.00',
        fullPrice: 190,
      },
    },
    stock: {
      create: {
        // productId: at(7),
        quantity: 7,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(7)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.bone] },
  },
  {
    sku: at(8),
    name: "Alfani® Men's Leather Dress Shoes",
    images: {
      create: [
        {
          resource: JSON.stringify(images['12']),
          // variantId: variants.brown.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'Who would wear these?',
    brand: 'Alfani',
    categories: { create: [categories.menShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 41,
        discounted: true,
        formattedValue: '$41.00',
        fullPrice: 60,
      },
    },
    stock: {
      create: {
        // productId: at(8),
        quantity: 999,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(8)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.brown] },
  },
  {
    sku: at(9),
    name: "DKNY® Women's Flared Floral Dress",
    images: {
      create: [
        {
          resource: JSON.stringify(images['2']),
          // variantId: variants.floralDark.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'A flared floral dress.',
    brand: 'DKNY',
    categories: { create: [categories.dresses] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 134,
        discounted: false,
        formattedValue: '$134.00',
        fullPrice: 134,
      },
    },
    stock: {
      create: {
        // productId: at(9),
        quantity: 2,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(9)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.floralDark] },
  },
  {
    sku: at(10),
    name: 'GUESS® Striped Floral V-Neck Midi Dress',
    images: {
      create: [
        {
          resource: JSON.stringify(images['13']),
          // variantId: variants.floralPink.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: 'Striped Floral V-Neck Midi Dress',
    brand: 'GUESS',
    categories: { create: [categories.menShirts] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 80,
        discounted: true,
        formattedValue: '$80.00',
        fullPrice: 130,
      },
    },
    stock: {
      create: {
        // productId: at(10),
        quantity: 20,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(10)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.floralPink] },
  },
  {
    sku: at(11),
    name: "Calvin Klein® Women's Sleeveless Chiffon A-Line Dress",
    images: {
      create: [
        {
          resource: JSON.stringify(images['4']),
          // variantId: variants.floralTeal.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Sleeveless Chiffon A-Line Dress",
    brand: 'Calvin Klein',
    categories: { create: [categories.dresses] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 85,
        discounted: false,
        formattedValue: '$85.00',
        fullPrice: 85,
      },
    },
    stock: {
      create: {
        // productId: at(11),
        quantity: 8,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(11)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.floralTeal] },
  },
  {
    sku: at(12),
    name: "Almost Famous® Women's Stretchy High-Rise Skinny Jeans",
    images: {
      create: [
        {
          resource: JSON.stringify(images['6']),
          // variantId: variants.denim.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Stretchy High-Rise Skinny Jeans",
    brand: 'Almost Famous',
    categories: { create: [categories.womenJeans] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 20,
        discounted: true,
        formattedValue: '$20.00',
        fullPrice: 38,
      },
    },
    stock: {
      create: {
        // productId: at(12),
        quantity: 1,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(12)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.denim] },
  },
  {
    sku: at(13),
    name: "Levi's® Women's Flared Bootcut Jeans",
    images: {
      create: [
        {
          resource: JSON.stringify(images['7']),
          // variantId: variants.denimDark.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Flared Bootcut Jeans",
    brand: 'Levi Strauss',
    categories: { create: [categories.womenJeans] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 50.0,
        discounted: false,
        formattedValue: '$50.00',
        fullPrice: 50.0,
      },
    },
    stock: {
      create: {
        // productId: at(13),
        quantity: 13,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(13)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.denimDark] },
  },
  {
    sku: at(14),
    name: "DKNY® Women's Brown High-Heeled Business Shoes",
    images: {
      create: [
        {
          resource: JSON.stringify(images['1']),
          // variantId: variants.brown.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Brown High-Heeled Business Shoes",
    brand: 'DKNY',
    categories: { create: [categories.womenShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 180,
        discounted: false,
        formattedValue: '$180.00',
        fullPrice: 180,
      },
    },
    stock: {
      create: {
        // productId: at(14),
        quantity: 5,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(14)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.brown] },
  },
  {
    sku: at(15),
    name: "Gucci® Women's Stylish Black Stilleto Heels",
    images: {
      create: [
        {
          resource: JSON.stringify(images['5']),
          // variantId: variants.black.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Stylish Black Stilleto Heels",
    brand: 'Gucci',
    categories: { create: [categories.womenShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 399,
        discounted: false,
        formattedValue: '$399.00',
        fullPrice: 399,
      },
    },
    stock: {
      create: {
        // productId: at(15),
        quantity: 4,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(15)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.black] },
  },
  {
    sku: at(16),
    name: "Nike® Women's Running Shoes",
    images: {
      create: [
        {
          resource: JSON.stringify(images['3']),
          // variantId: variants.white.uid,
          format: ImageFormat.PORTRAIT,
        },
      ],
    },
    description: "Women's Running Shoes",
    brand: 'Nike',
    categories: { create: [categories.womenShoes] },
    price: {
      create: {
        isoCurrencyCode: 'USD',
        currentPrice: 72,
        discounted: true,
        formattedValue: '$72.00',
        fullPrice: 90,
      },
    },
    stock: {
      create: {
        // productId: at(16),
        quantity: 15,
      },
    },
    // userReviews: {
    //   create: getReviewsByProductId(at(16)),
    // },
    status: ProductStatusType.AVAILABLE,
    variants: { create: [variants.white] },
  },
]

export { products }
