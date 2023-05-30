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
export const Type = Function;

export function isType(v: any): v is Type<any> {
  return typeof v === "function";
}

// export type Injectable = unknown

export interface Type<T = any> extends Function {
  [x: string]: any;
  new (...args: any[]): T;
}

export type Closure<T extends any = void, TArgs extends unknown[] = any[]> = (
  ...args: TArgs
) => T;

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
export type AsyncClosure<
  T extends any = void,
  Args extends unknown[] = any[]
> = (...args: Args) => Promise<T | never>;

export type Booleanish = boolean | "true" | "false";

export type Length<T extends readonly any[] | string> = T["length"];

/**
 * Similar to type-fest's FixedLengthArray type but without being strictly
 * for arrays. Can be used on strings and other types that have a `length`.
 */
export type FixedLength<
  T extends readonly any[] | string,
  L extends number
> = T & {
  readonly length: L;
};

/**
 * Similar to type-fest's FixedLengthArray type but without being strictly
 * for arrays. Can be used on strings and other types that have a `length`.
 */
export type FixedByteLength<
  T extends Float32Array | Float64Array,
  L extends number
> = T & {
  readonly byteLength: L;
};

/**
 * Concatenate the keys of two objects using string literals.
 * @see {@link https://stackoverflow.com/a/72031355}
 */
export type MergeKeys<ObjA, ObjB, Sep extends string = ""> = {
  [P in `${Exclude<keyof ObjA, symbol>}${Sep}${Exclude<
    keyof ObjB,
    symbol
  >}`]: string;
};

export type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType
> = ObjectType[ValueType];

// export type ReplaceProps<ObjA, Inner extends ObjA, P> = Omit<ObjA<Inner>, P> & P;
export type ReplaceKeys<
  T extends {},
  U extends Record<PropertyKey, keyof T>
> = Omit<T, ValueOf<U>> & {
  [K in keyof U]: T[U[K]];
};

export type ConditionalRecord<
  ObjA,
  V extends unknown = ValueOf<ObjA>
> = Partial<Record<keyof ObjA, V>>;

export type ConditionalKeys<Base, Condition> = NonNullable<
  // Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
  {
    // Map through all the keys of the given base type.
    [Key in keyof Base]: Base[Key] extends Condition // Pick only keys with types extending the given `Condition` type.
      ? // Retain this key since the condition passes.
        Key
      : // Discard this key since the condition fails.
        never;

    // Convert the produced object into a union type of the keys which passed the conditional test.
  }[keyof Base]
>;
