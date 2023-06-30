import { v4 as uuid } from 'uuid'

const makeGenerator = (arr: string[]): (() => Generator<string>) => {
  return function* gener8() {
    yield* arr
  }
}

const uids = (() => ({
  categories: new Array(20).map(_ => uuid()),
  images: new Array(20).map(_ => uuid()),
  users: new Array(20).map(_ => uuid()),
  products: new Array(20).map(_ => uuid()),
  reviews: new Array(20).map(_ => uuid()),
  variants: new Array(20).map(_ => uuid()),
}))()

type GetNextResult = { next: () => IteratorResult<string, any> }

const generators: Partial<{
  [K in keyof typeof uids]: GetNextResult
}> = {}

type Gen = {
  <K extends keyof typeof uids>(key: K): GetNextResult | never
  at<K extends keyof typeof uids>(key: K): (index: number) => string
}

const _gen = <K extends keyof typeof uids>(key: K) => {
  if (!(key in uids)) {
    throw new Error(`The key "${key}" is not present in the Seed UIDs.`)
  }

  if (!(key in generators)) {
    const iter = makeGenerator(uids.products)
    generators[key] = { next: () => iter().next() }
  }

  return generators[key] as GetNextResult
}

_gen.at = (key: keyof typeof uids) => (index: number) => uids[key][index]

let gen: Gen = _gen

export { gen, uids }
