import { v4 as uuid } from 'uuid'

// const makeGenerator = (arr: string[]): (() => Generator<string>) => {
//   return function* gener8() {
//     yield* arr
//   }
// }

const generateUids = (count: number) => new Array(count).fill('').map(_ => uuid())

const uids = {
  categories: generateUids(20),
  images: generateUids(20),
  users: generateUids(3),
  profiles: generateUids(3),
  products: generateUids(17),
  reviews: generateUids(30),
  variants: generateUids(20),
}

const gen = { at: (key: keyof typeof uids) => (index: number) => uids[key][index] }

export { uids, gen }
