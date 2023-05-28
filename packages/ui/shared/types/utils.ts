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
