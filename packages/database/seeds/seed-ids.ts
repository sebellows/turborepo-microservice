import { v4 as uuid } from 'uuid'
import { generateProductId, generateShortUid } from '../utils'

const generatePcs = (count: number) => new Array(count).fill('').map(_ => generateProductId())
const generateUids = (count: number) => new Array(count).fill('').map(_ => uuid())
const generateSkus = (count: number) => new Array(count).fill('').map(_ => generateShortUid())

const uids = {
  categories: generateUids(20),
  images: generateUids(20),
  users: generateUids(3),
  profiles: generateUids(3),
  products: generatePcs(17),
  reviews: generateUids(30),
  skus: generateSkus(120),
  variants: generateUids(20),
}

const gen = { at: (key: keyof typeof uids) => (index: number) => uids[key][index] }

export { uids, gen }
