import { StringKeyOf } from './string.types'

/**
 * Function Type
 *
 * Taken from the Angular framework (© Google LLC).
 * @see {@link https://github.com/angular/angular}
 *
 * @description
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
 * the `MyCustomComponent` constructor function.
 */
export const Type = Function

export function isType(v: any): v is Type<any> {
  return typeof v === 'function'
}

export interface Type<T = any> extends Function {
  [x: string]: any
  new (...args: any[]): T
}

export type Constructor<T, TArgs extends unknown[] = any[]> = new (...arguments_: TArgs) => T

export type Closure<T extends any = void, TArgs extends unknown[] = any[]> = (...args: TArgs) => T

/**
 * An async closure that returns a Promise that will resolve an instance of a class.
 * Normally called from the `make` method of a class extending the HookableContract.
 *
 * @example
 * resolve($engine: GameEngine, async () => {
 *   const instance = new Promise(new GameRelatedClass())
 *   return instance
 * })
 */
export type AsyncClosure<T extends any = void, Args extends unknown[] = any[]> = (
  ...args: Args
) => Promise<T | never>

export type TypedArrayType =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array

export type TypedArrayConstructor =
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor

export const typedArrayTypes = [
  'float32array',
  'float64array',
  'int8array',
  'int16array',
  'int32array',
  'uint8array',
  'uint8clampedarray',
  'uint16array',
  'uint32array',
] as const

export const TypedArrayMap = Object.freeze({
  float32array: Float32Array,
  float64array: Float64Array,
  int16array: Int16Array,
  int32array: Int32Array,
  int8array: Int8Array,
  uint16array: Uint16Array,
  uint32array: Uint32Array,
  uint8clampedarray: Uint8ClampedArray,
  uint8array: Uint8Array,
})

export type Booleanish = boolean | 'true' | 'false'

export type Length<T extends readonly any[] | string> = T['length']

/**
 * Similar to type-fest's FixedLengthArray type but without being strictly
 * for arrays. Can be used on strings and other types that have a `length`.
 */
export type FixedLength<T extends readonly any[] | string, L extends number> = T & {
  readonly length: L
}

/**
 * Similar to type-fest's FixedLengthArray type but without being strictly
 * for arrays. Can be used on strings and other types that have a `length`.
 */
export type FixedByteLength<T extends Float32Array | Float64Array, L extends number> = T & {
  readonly byteLength: L
}

export type Lookup<T> = { [key: string | number]: undefined | T }
export type DefinedLookup<T> = { [key: string | number]: T }

/**
 * Concatenate the keys of two objects using string literals.
 * @see {@link https://stackoverflow.com/a/72031355}
 */
export type MergeKeys<ObjA, ObjB, Sep extends string = ''> = {
  [P in `${Exclude<keyof ObjA, symbol>}${Sep}${Exclude<keyof ObjB, symbol>}`]: string
}

/** Adapted from type-fest */

export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type Split<
  S extends string,
  Delimiter extends string,
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S]

export type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType]

export type AsyncFunction = (...arguments_: any[]) => Promise<unknown>

export type ReplaceKeys<T extends {}, U extends Record<PropertyKey, keyof T>> = Omit<
  T,
  ValueOf<U>
> & {
  [K in keyof U]: T[U[K]]
}

export type ConditionalRecord<ObjA, V extends unknown = ValueOf<ObjA>> = Partial<
  Record<keyof ObjA, V>
>

export type ConditionalKeys<Base, Condition> = NonNullable<
  // Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
  {
    // Map through all the keys of the given base type.
    [Key in keyof Base]: Base[Key] extends Condition // Pick only keys with types extending the given `Condition` type.
      ? // Retain this key since the condition passes.
        Key
      : // Discard this key since the condition fails.
        never

    // Convert the produced object into a union type of the keys which passed the conditional test.
  }[keyof Base]
>

type GetOptions = {
  /**
   * Include `undefined` in the return type when accessing properties.
   *
   * Setting this to `false` is not recommended.
   *
   * @default true
   */
  strict?: boolean
}

/**
 * Like the `Get` type but receives an array of strings as a path parameter.
 */
type GetWithPath<
  BaseType,
  Keys extends readonly string[],
  Options extends GetOptions = {},
> = Keys extends []
  ? BaseType
  : Keys extends readonly [infer Head, ...infer Tail]
  ? GetWithPath<
      PropertyOf<BaseType, Extract<Head, string>, Options>,
      Extract<Tail, string[]>,
      Options
    >
  : never

/**
 * Adds `undefined` to `Type` if `strict` is enabled.
 */
type Strictify<Type, Options extends GetOptions> = Options['strict'] extends false
  ? Type
  : Type | undefined

/**
 * If `Options['strict']` is `true`, includes `undefined` in the returned type when accessing
 * properties on `Record<string, any>`.
 *
 * Known limitations:
 * - Does not include `undefined` in the type on object types with an index signature
 * (for example, `{a: string; [key: string]: string}`).
 */
type StrictPropertyOf<BaseType, Key extends keyof BaseType, Options extends GetOptions> = Record<
  string,
  any
> extends BaseType
  ? string extends keyof BaseType
    ? Strictify<BaseType[Key], Options> // Record<string, any>
    : BaseType[Key] // Record<'a' | 'b', any> (Records with a string union as keys have required properties)
  : BaseType[Key]

/**
 * Splits a dot-prop style path into a tuple comprised of the properties in the path.
 * Handles square-bracket notation.
 *
 * @example
 * ```
 * ToPath<'foo.bar.baz'>
 * //=> ['foo', 'bar', 'baz']
 *
 * ToPath<'foo[0].bar.baz'>
 * //=> ['foo', '0', 'bar', 'baz']
 * ```
 */
type ToPath<S extends string> = Split<FixPathSquareBrackets<S>, '.'>

/**
 * Replaces square-bracketed dot notation with dots, for example, `foo[0].bar` -> `foo.0.bar`.
 */
type FixPathSquareBrackets<Path extends string> = Path extends `[${infer Head}]${infer Tail}`
  ? Tail extends `[${string}`
    ? `${Head}.${FixPathSquareBrackets<Tail>}`
    : `${Head}${FixPathSquareBrackets<Tail>}`
  : Path extends `${infer Head}[${infer Middle}]${infer Tail}`
  ? `${Head}.${FixPathSquareBrackets<`[${Middle}]${Tail}`>}`
  : Path

/**
 * Returns true if `LongString` is made up out of `Substring` repeated 0 or more times.
 *
 * @example
 * ```
 * ConsistsOnlyOf<'aaa', 'a'> //=> true
 * ConsistsOnlyOf<'ababab', 'ab'> //=> true
 * ConsistsOnlyOf<'aBa', 'a'> //=> false
 * ConsistsOnlyOf<'', 'a'> //=> true
 * ```
 */
type ConsistsOnlyOf<LongString extends string, Substring extends string> = LongString extends ''
  ? true
  : LongString extends `${Substring}${infer Tail}`
  ? ConsistsOnlyOf<Tail, Substring>
  : false

/**
Convert a type which may have number keys to one with string keys, making it possible to index using strings retrieved from template types.

@example
```
type WithNumbers = {foo: string; 0: boolean};
type WithStrings = WithStringKeys<WithNumbers>;

type WithNumbersKeys = keyof WithNumbers;
//=> 'foo' | 0
type WithStringsKeys = keyof WithStrings;
//=> 'foo' | '0'
```
*/
type WithStringKeys<BaseType> = {
  [Key in StringKeyOf<BaseType, { strict: false }>]: UncheckedIndex<BaseType, Key>
}

/**
 * Perform a `T[U]` operation if `T` supports indexing.
 */
type UncheckedIndex<T, U extends string | number> = [T] extends [Record<string | number, any>]
  ? T[U]
  : never

/**
 * Get a property of an object or array. Works when indexing arrays using number-literal-strings,
 * for example, `PropertyOf<number[], '0'> = number`, and when indexing objects with number keys.
 *
 * Note:
 * - Returns `unknown` if `Key` is not a property of `BaseType`, since TypeScript uses structural
 *   typing, and it cannot be guaranteed that extra properties unknown to the type system will
 *   exist at runtime.
 * - Returns `undefined` from nullish values, to match the behaviour of most deep-key libraries
 *   like `lodash`, `dot-prop`, etc.
 */
type PropertyOf<BaseType, Key extends string, Options extends GetOptions = {}> = BaseType extends
  | null
  | undefined
  ? undefined
  : Key extends keyof BaseType
  ? StrictPropertyOf<BaseType, Key, Options>
  : BaseType extends [] | [unknown, ...unknown[]]
  ? unknown // It's a tuple, but `Key` did not extend `keyof BaseType`. So the index is out of bounds.
  : BaseType extends {
      [n: number]: infer Item
      length: number // Note: This is needed to avoid being too lax with records types using number keys like `{0: string; 1: boolean}`.
    }
  ? ConsistsOnlyOf<Key, StringDigit> extends true
    ? Strictify<Item, Options>
    : unknown
  : Key extends keyof WithStringKeys<BaseType>
  ? StrictPropertyOf<WithStringKeys<BaseType>, Key, Options>
  : unknown

/**
 * Get a deeply-nested property from an object using a key path, like Lodash's `.get()` function.
 *
 * Use-case: Retrieve a property from deep inside an API response or some other complex object.
 *
 * @example
 * ```
 * import { get } from 'lodash';
 *
 * const get = <
 *   BaseType,
 *   Path extends string | readonly string[]
 * >(object: BaseType, path: Path): Get<BaseType, Path> =>
 *   lodash.get(object, path);
 *
 * interface ApiResponse {
 *   hits: {
 *     hits: Array<{
 *       _id: string
 *       _source: {
 *         name: Array<{
 *           given: string[]
 *           family: string
 *         }>
 *         birthDate: string
 *       }
 *     }>
 *   }
 * }
 *
 * const getName = (apiResponse: ApiResponse) =>
 *   get(apiResponse, 'hits.hits[0]._source.name');
 *   //=> Array<{given: string[]; family: string}> | undefined
 *
 * // Path also supports a readonly array of strings
 * const getNameWithPathArray = (apiResponse: ApiResponse) =>
 *   get(apiResponse, ['hits','hits', '0', '_source', 'name'] as const);
 *   //=> Array<{given: string[]; family: string}> | undefined
 *
 * // Non-strict mode:
 * Get<string[], '3', {strict: false}> //=> string
 * Get<Record<string, string>, 'foo', {strict: true}> // => string
 * ```
 */
export type Get<
  BaseType,
  Path extends string | readonly string[],
  Options extends GetOptions = {},
> = GetWithPath<BaseType, Path extends string ? ToPath<Path> : Path, Options>

/**
 * @type Simplify
 * Useful to flatten the type output to improve type hints shown in editors. And also
 * to transform an interface into a type to aide with assignability.
 * @see type-fest
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts
 */
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

/**
 * @type IsEqual
 * Returns a boolean for whether the two given types are equal.
 * @see type-fest
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/is-equal.d.ts
 */
export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2
  ? true
  : false

type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
  ? never
  : KeyType extends ExcludeType
  ? never
  : KeyType

/**
 * @type Except
 * Filter out keys from an object.
 * @see type-fest
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/except.d.ts
 */
type ExceptOptions = {
  /**
	Disallow assigning non-specified properties.

	Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.

	@default false
	*/
  requireExactProps?: boolean
}
export type Except<
  ObjectType,
  KeysType extends keyof ObjectType,
  Options extends ExceptOptions = { requireExactProps: false },
> = {
  [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType]
} & (Options['requireExactProps'] extends true ? Partial<Record<KeysType, never>> : {})

/**
 * @type SetRequired
 * Create a type that makes the given keys required. The remaining keys are kept as is.
 * The sister of the `SetOptional` type.
 * @see type-fest
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/set-required.d.ts
 */
export type SetRequired<BaseType, Keys extends keyof BaseType> =
  // `extends unknown` is always going to be the case and is used to convert any
  // union into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  BaseType extends unknown
    ? Simplify<
        // Pick just the keys that are optional from the base type.
        Except<BaseType, Keys> &
          // Pick the keys that should be required from the base type and make them required.
          Required<Pick<BaseType, Keys>>
      >
    : never

/**
 * @type ConditionalExcept
 * Exclude keys from a shape that matches the given `Condition`.
 * @see type-fest
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/conditional-except.d.ts
 */
export type ConditionalExcept<Base, Condition> = Except<Base, ConditionalKeys<Base, Condition>>
