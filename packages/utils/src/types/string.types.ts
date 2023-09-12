/**
 * Source: Type-Fest
 * @link https://github.com/sindresorhus/type-fest/
 */

/**
 * Create a type with the keys of the given type changed to `string` type.
 *
 * @example
 * ```
 * type Car = {
 *   model: string;
 *   speed: number;
 * }
 *
 * const carForm: Stringified<Car> = {
 *   model: 'Foo',
 *   speed: '101'
 * }
 */
export type Stringified<ObjectType> = { [KeyType in keyof ObjectType]: string }

type StringKeyOptions = {
  /**
   * To allow numbers as well as strings when accessing properties, set
   * `strict` to false.
   *
   * @default true
   */
  strict?: boolean
}
type Strictify<Options extends StringKeyOptions> = Options['strict'] extends false
  ? string | number
  : string

/**
 * Get keys of the given type as strings.
 *
 * Use-cases:
 * - Get string keys from a type which may have number keys.
 * - Makes it possible to index using strings retrieved from template types.
 */
export type StringKeyOf<BaseType, Options extends StringKeyOptions = {}> = `${Extract<
  keyof BaseType,
  Strictify<Options>
>}`

export type Whitespace =
  | '\u{9}' // '\t'
  | '\u{A}' // '\n'
  | '\u{B}' // '\v'
  | '\u{C}' // '\f'
  | '\u{D}' // '\r'
  | '\u{20}' // ' '
  | '\u{85}'
  | '\u{A0}'
  | '\u{1680}'
  | '\u{2000}'
  | '\u{2001}'
  | '\u{2002}'
  | '\u{2003}'
  | '\u{2004}'
  | '\u{2005}'
  | '\u{2006}'
  | '\u{2007}'
  | '\u{2008}'
  | '\u{2009}'
  | '\u{200A}'
  | '\u{2028}'
  | '\u{2029}'
  | '\u{202F}'
  | '\u{205F}'
  | '\u{3000}'
  | '\u{FEFF}'

export type WordSeparators = '-' | '_' | Whitespace

/**
 * Remove spaces from the left side.
 */
type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V

/**
 * Remove spaces from the right side.
 */
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V

/**
 * Remove leading and trailing spaces from a string.
 *
 * @example
 * ```
 * import type {Trim} from 'type-fest';
 *
 * Trim<' foo '>
 * //=> 'foo'
 * ```
 *
 * @category String
 * @category Template literal
 */
export type Trim<V extends string> = TrimLeft<TrimRight<V>>

/** Returns a boolean for whether the string is lowercased. */
export type IsLowerCase<T extends string> = T extends Lowercase<T> ? true : false

/** Returns a boolean for whether the string is uppercased. */
export type IsUpperCase<T extends string> = T extends Uppercase<T> ? true : false

/**
 * Type for a non-empty string. Good for conditional setting of template-literals.
 *
 * @example
 * ```
 * const guestList: string[] = []
 *
 * function addToGuestList<Name extends string>(
 *   name: NonEmptyString<Name>
 * ): string {
 *   guestList.push(name)
 * }
 * ```
 */
export type NonEmptyString<T extends string> = '' extends T ? never : T

/**
 * Returns a boolean for whether the string is numeric.
 *
 * This type is a workaround for [Microsoft/TypeScript#46109](https://github.com/microsoft/TypeScript/issues/46109#issuecomment-930307987).
 */
export type IsNumeric<T extends string> = T extends `${number}`
  ? Trim<T> extends T
    ? true
    : false
  : false

type SkipEmptyWord<Word extends string> = Word extends '' ? [] : [Word]

type RemoveLastCharacter<
  Sentence extends string,
  Character extends string,
> = Sentence extends `${infer LeftSide}${Character}` ? SkipEmptyWord<LeftSide> : never

/**
 * Split a string (almost) like Lodash's `_.words()` function.
 *
 * - Split on each word that begins with a capital letter.
 * - Split on each {@link WordSeparators}.
 * - Split on numeric sequence.
 *
 * @example
 * ```
 * type Words0 = SplitWords<'helloWorld'>; // ['hello', 'World']
 * type Words1 = SplitWords<'helloWORLD'>; // ['hello', 'WORLD']
 * type Words2 = SplitWords<'hello-world'>; // ['hello', 'world']
 * type Words3 = SplitWords<'--hello the_world'>; // ['hello', 'the', 'world']
 * type Words4 = SplitWords<'lifeIs42'>; // ['life', 'Is', '42']
 * ```
 *
 * @internal
 * @category Change case
 * @category Template literal
 */
export type SplitWords<
  Sentence extends string,
  LastCharacter extends string = '',
  CurrentWord extends string = '',
> = Sentence extends `${infer FirstCharacter}${infer RemainingCharacters}`
  ? FirstCharacter extends WordSeparators
    ? // Skip word separator
      [...SkipEmptyWord<CurrentWord>, ...SplitWords<RemainingCharacters>]
    : LastCharacter extends ''
    ? // Fist char of word
      SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>
    : // Case change: non-numeric to numeric, push word
    [false, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
    ? [
        ...SkipEmptyWord<CurrentWord>,
        ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>,
      ]
    : // Case change: numeric to non-numeric, push word
    [true, false] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
    ? [
        ...SkipEmptyWord<CurrentWord>,
        ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>,
      ]
    : // No case change: concat word
    [true, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
    ? SplitWords<RemainingCharacters, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
    : // Case change: lower to upper, push word
    [true, true] extends [IsLowerCase<LastCharacter>, IsUpperCase<FirstCharacter>]
    ? [
        ...SkipEmptyWord<CurrentWord>,
        ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>,
      ]
    : // Case change: upper to lower, brings back the last character, push word
    [true, true] extends [IsUpperCase<LastCharacter>, IsLowerCase<FirstCharacter>]
    ? [
        ...RemoveLastCharacter<CurrentWord, LastCharacter>,
        ...SplitWords<RemainingCharacters, FirstCharacter, `${LastCharacter}${FirstCharacter}`>,
      ]
    : // No case change: concat word
      SplitWords<RemainingCharacters, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
  : [...SkipEmptyWord<CurrentWord>]

export type CamelCaseOptions = {
  /**
	Whether to preserved consecutive uppercase letter.

	@default true
	*/
  preserveConsecutiveUppercase?: boolean
}

/**
 * Convert an array of words to camel-case.
 */
type CamelCaseFromArray<
  Words extends string[],
  Options extends CamelCaseOptions,
  OutputString extends string = '',
> = Words extends [infer FirstWord extends string, ...infer RemainingWords extends string[]]
  ? Options['preserveConsecutiveUppercase'] extends true
    ? `${Capitalize<FirstWord>}${CamelCaseFromArray<RemainingWords, Options>}`
    : `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<RemainingWords, Options>}`
  : OutputString

/**
 * Convert a string literal to camel-case.
 *
 * This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result.
 *
 * By default, consecutive uppercase letter are preserved. See {@link CamelCaseOptions.preserveConsecutiveUppercase preserveConsecutiveUppercase} option to change this behaviour.
 *
 * @example
 * ```
 * import type {CamelCase} from 'type-fest';
 *
 * // Simple
 *
 * const someVariable: CamelCase<'foo-bar'> = 'fooBar';
 *
 * // Advanced
 *
 * type CamelCasedProperties<T> = {
 * 	[K in keyof T as CamelCase<K>]: T[K]
 * };
 *
 * interface RawOptions {
 * 	'dry-run': boolean;
 * 	'full_family_name': string;
 * 	foo: number;
 * 	BAR: string;
 * 	QUZ_QUX: number;
 * 	'OTHER-FIELD': boolean;
 * }
 *
 * const dbResult: CamelCasedProperties<RawOptions> = {
 * 	dryRun: true,
 * 	fullFamilyName: 'bar.js',
 * 	foo: 123,
 * 	bar: 'foo',
 * 	quzQux: 6,
 * 	otherField: false
 * };
 * ```
 *
 * @category Change case
 * @category Template literal
 */
export type CamelCase<
  Type,
  Options extends CamelCaseOptions = { preserveConsecutiveUppercase: true },
> = Type extends string
  ? string extends Type
    ? Type
    : Uncapitalize<
        CamelCaseFromArray<
          SplitWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>,
          Options
        >
      >
  : Type
