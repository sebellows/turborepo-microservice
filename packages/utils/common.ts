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
