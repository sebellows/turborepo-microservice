import { categories } from './categories'
// import { getReviewsByProductId } from './reviews'
import { gen } from './seed-ids'
import { variants } from './variants'
import { productCodes } from './product-codes'

const at = gen.at('products')

const products = [
  {
    uid: at(0),
    code: productCodes[0],
    name: 'Club Room® Fitted Button Up Shirt',
    variants: { create: [variants[0], variants[1]] },
    description: 'Perfect for a night out at the Roxbury.',
    Brand: { create: { name: 'Club Room' } },
    categories: { create: [categories.menShirts] },
    // userReviews: {
    //   create: getReviewsByProductId(at(0)),
    // },
  },
  {
    uid: at(1),
    code: productCodes[1],
    name: 'H&M® Mens Shortsleeve Plaid Dress Shirt',
    variants: { create: [variants[2]] },
    description: 'The perfect fit for any man who is over 6 feet tall and only weighs 120 pounds.',
    Brand: { create: { name: 'H&M' } },
    categories: { create: [categories.menShirts] },
    // userReviews: {
    //   create: getReviewsByProductId(at(1)),
    // },
  },
  {
    uid: at(2),
    code: productCodes[2],
    name: 'Tom Ford® Mens Longsleeve Flannel Shirt',
    variants: { create: [variants[3]] },
    description: "Look like the embodiment of everything that killed grunge in the 90's",
    Brand: { create: { name: 'Tom Ford' } },
    categories: { create: [categories.menShirts] },
    // userReviews: {
    //   create: getReviewsByProductId(at(2)),
    // },
  },
  {
    uid: at(3),
    code: productCodes[3],
    name: "Acme® Men's Loose-Fitting Jeans",
    variants: { create: [variants[4]] },
    description: "Men's Loose-Fitting Jeans",
    Brand: { create: { name: 'Acme' } },
    categories: { create: [categories.menJeans] },
    // userReviews: {
    //   create: getReviewsByProductId(at(3)),
    // },
  },
  {
    uid: at(4),
    code: productCodes[4],
    name: "Acme® Men's Bootcut Jeans",
    variants: { create: [variants[5]] },
    description: "Men's Bootcut Jeans",
    brandName: 'Acme',
    categories: { create: [categories.menJeans] },
    // userReviews: {
    //   create: getReviewsByProductId(at(4)),
    // },
  },
  {
    uid: at(5),
    code: productCodes[5],
    name: "XXX® Men's Distresed Skinny Jeans",
    variants: { create: [variants[6]] },
    description: "We made these jeans look like you live dangerously even though you really don't.",
    Brand: { create: { name: 'XXX' } },
    categories: { create: [categories.menJeans] },
    // userReviews: {
    //   create: getReviewsByProductId(at(5)),
    // },
  },
  {
    uid: at(6),
    code: productCodes[6],
    name: "Minnetonka® Men's Black Moccasins",
    variants: { create: [variants[7]] },
    description: 'Genuine leather moccasins.',
    Brand: { create: { name: 'Minnetonka' } },
    categories: { create: [categories.menShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(6)),
    // },
  },
  {
    uid: at(7),
    code: productCodes[7],
    name: "Merrell® Men's Suede Outdoor Shoes",
    variants: { create: [variants[8]] },
    description: 'Suede or su-su-sussudio? Yeah, Phil Collins.',
    Brand: { create: { name: 'Merrell' } },
    categories: { create: [categories.menShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(7)),
    // },
  },
  {
    uid: at(8),
    code: productCodes[8],
    name: "Alfani® Men's Leather Dress Shoes",
    variants: { create: [variants[9]] },
    description: 'Who would wear these?',
    Brand: { create: { name: 'Alfani' } },
    categories: { create: [categories.menShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(8)),
    // },
  },
  {
    uid: at(9),
    code: productCodes[9],
    name: "DKNY® Women's Flared Floral Dress",
    variants: { create: [variants[10]] },
    description: 'A flared floral dress.',
    Brand: { create: { name: 'DKNY' } },
    categories: { create: [categories.dresses] },
    // userReviews: {
    //   create: getReviewsByProductId(at(9)),
    // },
  },
  {
    uid: at(10),
    code: productCodes[10],
    name: 'GUESS® Striped Floral V-Neck Midi Dress',
    variants: { create: [variants[11]] },
    description: 'Striped Floral V-Neck Midi Dress',
    Brand: { create: { name: 'GUESS' } },
    categories: { create: [categories.menShirts] },
    // userReviews: {
    //   create: getReviewsByProductId(at(10)),
    // },
  },
  {
    uid: at(11),
    code: productCodes[11],
    name: "Calvin Klein® Women's Sleeveless Chiffon A-Line Dress",
    variants: { create: [variants[12]] },
    description: "Women's Sleeveless Chiffon A-Line Dress",
    Brand: { create: { name: 'Calvin Klein' } },
    categories: { create: [categories.dresses] },
    // userReviews: {
    //   create: getReviewsByProductId(at(11)),
    // },
  },
  {
    uid: at(12),
    code: productCodes[12],
    name: "Almost Famous® Women's Stretchy High-Rise Skinny Jeans",
    variants: { create: [variants[13]] },
    description: "Women's Stretchy High-Rise Skinny Jeans",
    Brand: { create: { name: 'Almost Famous' } },
    categories: { create: [categories.womenJeans] },
    // userReviews: {
    //   create: getReviewsByProductId(at(12)),
    // },
  },
  {
    uid: at(13),
    code: productCodes[13],
    name: "Levi's® Women's Flared Bootcut Jeans",
    variants: { create: [variants[14]] },
    description: "Women's Flared Bootcut Jeans",
    Brand: { create: { name: 'Levi Strauss' } },
    categories: { create: [categories.womenJeans] },
    // userReviews: {
    //   create: getReviewsByProductId(at(13)),
    // },
  },
  {
    uid: at(14),
    code: productCodes[14],
    name: "DKNY® Women's Brown High-Heeled Business Shoes",
    variants: { create: [variants[15]] },
    description: "Women's Brown High-Heeled Business Shoes",
    brandName: 'DKNY',
    categories: { create: [categories.womenShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(14)),
    // },
  },
  {
    uid: at(15),
    code: productCodes[15],
    name: "Gucci® Women's Stylish Black Stilleto Heels",
    variants: { create: [variants[16]] },
    description: "Women's Stylish Black Stilleto Heels",
    Brand: { create: { name: 'Gucci' } },
    categories: { create: [categories.womenShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(15)),
    // },
  },
  {
    uid: at(16),
    code: productCodes[16],
    name: "Nike® Women's Running Shoes",
    variants: { create: [variants[17]] },
    description: "Women's Running Shoes",
    Brand: { create: { name: 'Nike' } },
    categories: { create: [categories.womenShoes] },
    // userReviews: {
    //   create: getReviewsByProductId(at(16)),
    // },
  },
]

export { products }
