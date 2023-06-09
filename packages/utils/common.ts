export const hasOwn = <O extends Object>(o: O, key: PropertyKey, strict = false) => {
  const has = Object.prototype.hasOwnProperty.call(o, key)

  return strict ? has && !!o[key] : has
}

/**
 * Ensure that params are either an array or contain an array.
 */
export function variadic<T extends unknown = any>(...args: any[]): T[] {
  return [...(Array.isArray(args[0]) ? args[0] : args)]
}

/** Reluctant trick for fixing TypeScript inference issues around dynamic types. */
export function identityType<T>() {
  function inner<U extends T>(u: U): U {
    return u
  }
  return inner
}

/**
 * Create a cached version of a pure function.
 */
export function cached<R>(fn: (str: string) => R): (str: string) => R {
  const cache: Record<string, R> = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
