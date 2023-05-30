export function hasOwn<O extends {}, P extends PropertyKey>(
  obj: O,
  ...props: P[]
): obj is O & Record<P, unknown> {
  return props.every((prop) => Object.prototype.hasOwnProperty.call(obj, prop));
}

/**
 * Ensure that params are either an array or contain an array.
 */
export function variadic<T extends unknown = any>(...args: any[]): T[] {
  return [...(Array.isArray(args[0]) ? args[0] : args)];
}
