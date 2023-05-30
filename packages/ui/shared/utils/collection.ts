import { Get, ValueOf } from "type-fest";

import { Closure } from "../types";

import { cloneDeep } from "./clone";
import { hasOwn } from "./common";
import {
  is,
  isDefined,
  isEmpty,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  isSymbol,
  isUndefined,
  typeOf,
} from "./lang";

export function getSymbol<
  BaseType,
  Path extends PropertyKey,
  TDefault extends unknown = any
>(obj: BaseType, path: Path, defaultValue?: TDefault) {
  const syms = Object.getOwnPropertySymbols(obj);
  const values = syms.valueOf();

  if (Array.isArray(values) && values.includes(path)) {
    return obj[path as PropertyKey];
  }

  return defaultValue;
}

export function get<
  BaseType,
  Path extends string | readonly string[],
  TDefault extends unknown = any
>(obj: BaseType, path: Path, defaultValue?: TDefault): any {
  let i = 0,
    key: PropertyKey,
    value = undefined,
    currObj: any = obj;
  // currValue: unknown
  let paths: string[] = [];
  if (Array.isArray(path)) {
    paths = path;
  } else if (typeof path === "string") {
    paths = (path as string).split(".");
  }

  paths = paths.reduce((acc, p) => {
    if (/\[(\d+)\]/.test(p)) {
      let [p1, p2] = p.split("[");
      p2 = p2.slice(0, -1);
      acc.push(p1, p2);
    } else {
      acc.push(p);
    }
    return acc;
  }, [] as string[]);

  if (!paths.length) return defaultValue;

  const len = paths.length;

  for (let p of paths) {
    ++i;
    key = isNaN(+p) ? p : +p;

    if (currObj[key]) {
      currObj = currObj[key];

      value = currObj;
    } else if (i == len) {
      value = currObj;
    }
  }

  if (isUndefined(value) && isDefined(defaultValue)) {
    return defaultValue;
  }

  return value;
}

/**
 * Get the last item in a array.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr.length ? arr[arr.length - 1] : undefined;
}

/**
 * Create a new array of a certain length and populate it with values.
 *
 * @param start - A starting index for an array or the total length of the array.
 * @param stop - [Optional] Number for the last index in the array
 * @param step - [Optional] Number by which to increment values. Default is 1.
 * @param value - [Optional] A shared value to apply to each index in the array
 * @returns A new array of the desired length with a given value.
 */
export function range<T>(
  start: number,
  stop?: number,
  step = 1,
  value: T | undefined = undefined
): (T | number)[] {
  if (!stop) {
    stop = start;
    start = 0;
  }

  return Array.from({ length: (stop - start) / step }, (_, i) => {
    let index = i;

    if (step > 1) {
      index = ++i;
    }

    return value ?? start + index * step;
  });
}

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500;

/** Create a memoized version of a pure function. */
export const memoize = <T>(
  fn: (str: string) => T,
  cap: number | boolean = false
) => {
  const memoized = function (str: string) {
    const key = str;
    let cache = memoized.cache as Record<string, any>;

    if (cap) {
      const cacheSize =
        isNumber(cap) && Number.isInteger(cap) ? cap : MAX_MEMOIZE_SIZE;
      if (Object.keys(cache).length === cacheSize) {
        cache = {};
      }
    }

    if (cache[key]) {
      return cache[key];
    }

    const result = fn(str);
    memoized.cache = { ...cache, [key]: result } || cache;

    return result;
  };

  memoized.cache = {};

  return memoized;
};

/** Used to match backslashes in property paths. */
const escapeCharRE = /\\(\\)?/g;

/** Used to match property names within property paths. */
const deepPropRE = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const plainPropRE = /^\w*$/;
const propNameRE =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Converts `value` to a string key if it's not a string or symbol. */
function toKey(value: string | Symbol): string | Symbol {
  if (isString(value) || isSymbol(value)) {
    return value;
  }
  // eslint-disable-next-line eqeqeq
  return `${value}` == "0" && 1 / Number(value) == -Infinity
    ? "-0"
    : `${value}`;
}

/** Checks if `value` is a property name and not a property path. */
function isKey<T extends Object>(value: any, object: T): boolean {
  if (Array.isArray(value)) return false;

  if (
    value == null ||
    is(value, "boolean") ||
    isNumber(value) ||
    isSymbol(value)
  ) {
    return true;
  }

  return (
    plainPropRE.test(value) ||
    !deepPropRE.test(value) ||
    (object != null && value in Object(object))
  );
}

/** Converts `string` to a property path array. */
const stringToPath = memoize((str: string): string[] => {
  const result: string[] = [];
  if (str.charCodeAt(0) === 46 /* '.' */) {
    result.push("");
  }
  str.replace(
    propNameRE,
    (match: string, num: number, quote: string, substr: string): string => {
      const replacement = quote
        ? substr.replace(escapeCharRE, "$1")
        : num || match;
      result.push(replacement as string);
      return String(replacement);
    }
  );
  return result;
}, true);

/**
 * Converts `value` to a property path array.
 *
 * @example
 * ```
 * toPath('a[0].b.c'); // => ['a', '0', 'b', 'c']
 * ```
 */
export function toPath(
  value: string | Symbol | (string | Symbol)[]
): (string | Symbol)[] {
  if (Array.isArray(value)) {
    return value.map(toKey);
  }
  return isSymbol(value) ? [value] : stringToPath(String(value));
}

/** Convert a value to a string that is actually rendered. */
export const toString = (val: unknown): string => {
  return val == null
    ? ""
    : Array.isArray(val) ||
      (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
};

/** Casts `value` to a path array if it's not one. */
function castPath<T extends Object>(value: any, obj: T): string[] {
  if (Array.isArray(value)) return value;

  if (isKey(value, obj)) return [value];

  return stringToPath(toString(value));
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties.
 */
export function set<T>(
  obj: T,
  path: string | Symbol | (string | Symbol)[],
  value: any,
  customizer?: Function
): T {
  if (!isObject(obj) || isNil(obj)) return obj;

  const paths = castPath(path, obj);

  let i = -1;
  let nested: Record<string, any> = obj;

  while (!isNil(nested) && ++i < paths.length) {
    let key = toKey(String(paths[i])) as keyof typeof nested;
    let newValue = value;

    if (i !== paths.length - 1) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (isNil(newValue)) {
        newValue = isObject(objValue)
          ? objValue
          : isNumber(paths[i + 1])
          ? []
          : {};
      }
    }

    nested[key] = newValue;
    nested = nested[key];
  }

  return obj;
}

export function chunk<T>(arr: T[], size: number): Array<T[]> {
  const chunks: Array<T[]> = [];
  let index = 0;

  do {
    const items = arr.slice(index, index + size);

    chunks.push(items);
    index += size;
  } while (index < arr.length);

  return chunks;
}

type Comparators = "==" | "===" | "!=" | "<>" | "!==" | "<" | "<=" | ">" | ">=";
export function where<T extends object>(
  obj: T,
  key: string,
  operator: Comparators | boolean | ((item: any, i: number) => boolean),
  value?: any
): any;
export function where<T extends object>(
  obj: T,
  key: string,
  operator: any,
  value?: any
): any {
  let comparisonOperator = operator;
  let comparisonValue = value;

  const items = Object.values(obj);

  if (operator === undefined || operator === true) {
    return items.filter((item) => get(item, key));
  }

  if (operator === false) {
    return items.filter((item) => !get(item, key));
  }

  if (typeof operator === "function") {
    return items.find(operator);
  }

  if (value === undefined) {
    comparisonValue = operator;
    comparisonOperator = "===";
  }

  const collection = items.filter((item) => {
    switch (comparisonOperator) {
      case "==":
        return (
          get(item, key) === Number(comparisonValue) ||
          get(item, key) === comparisonValue.toString()
        );

      case "!=":
      case "<>":
        return (
          get(item, key) !== Number(comparisonValue) &&
          get(item, key) !== comparisonValue.toString()
        );

      case "!==":
        return get(item, key) !== comparisonValue;

      case "<":
        return get(item, key) < comparisonValue;

      case "<=":
        return get(item, key) <= comparisonValue;

      case ">":
        return get(item, key) > comparisonValue;

      case ">=":
        return get(item, key) >= comparisonValue;

      case "===":
      default:
        return get(item, key) === comparisonValue;
    }
  });

  return collection;
}

/**
 * Create a closure for returning a value.
 */
export function toClosure<T, TArgs extends unknown[] = any>(
  value: T,
  ...args: TArgs
): Closure<T, TArgs> {
  return args.length
    ? () => ((..._args: TArgs) => value).apply(args)
    : () => value;
}

/**
 * Check if an object or a property (including nested) is defined.
 * @param obj
 * @param key - [Optional] Property key or key-path using dot notation
 * @param options - [Optional] Configuration for rules that should be considered to define "exists"
 * @param options.omitEmpty - [Optional] Omit empty values as a factor in determining "exists" (defaults to true)
 * @returns
 */
export function exists<O extends object>(
  obj: O,
  key?: string,
  options?: { omitEmpty?: boolean }
): boolean {
  const omitEmpty = options?.omitEmpty ?? true;

  if (isNil(obj)) {
    return false;
  }

  const type = typeOf(obj);
  let hasKey = false;
  let empty = true;
  let value: any;

  switch (type) {
    case "object":
      if (key) {
        value = get(obj, key);
      }
      hasKey = !!value;
      empty = isEmpty(value);
      break;
    case "array":
      let isstring = isNaN(+key!);
      hasKey = isstring ? (obj as unknown[]).includes(key) : !!obj[+key!];
      empty = !(obj as unknown[]).length;
      break;
    case "map":
      const map = obj as Map<any, any>;
      hasKey = exists(Object.fromEntries(map.entries()), key);
      empty = map.size === 0;
      break;
    case "set":
      const set = obj as Set<any>;
      hasKey = set.has(key);
      empty = set.size === 0;
      break;
    default:
    // do nothing
  }

  return omitEmpty ? !empty && hasKey : hasKey;
}

function merge<O extends object, T extends Partial<O>>(target: T, obj: O) {
  for (const key in obj) {
    if (key === "__proto__" || !hasOwn(obj, key)) {
      continue;
    }

    const oldVal = obj[key];
    const newVal = target[key];

    if (isObject(newVal) && isObject(oldVal)) {
      target[key] = merge(newVal, oldVal);
    } else if (Array.isArray(newVal)) {
      const oldValArray = Array.isArray(oldVal) ? oldVal : [oldVal];
      target[key] = [newVal, oldValArray].flat() as any;
    } else {
      const init = Array.isArray(oldVal) ? [] : {};
      target[key] = cloneDeep(oldVal, init);
    }
  }

  return target;
}

export function mergeDeep<T extends unknown = {}>(orig: T, ...objs: any[]) {
  if (!isObject(orig) && !Array.isArray(orig)) {
    orig = {} as T;
  }

  const target = cloneDeep(orig);
  const len = objs.length;
  let idx = -1;

  while (++idx < len) {
    const val = objs[idx];

    if (isObject(val) || Array.isArray(val)) {
      merge(target, val);
    }
  }
  return target;
}

export function pick<O extends {}, K extends string = string>(
  o: O,
  ...keys: K[]
): Record<K, Get<O, K>>;
export function pick<O extends {}, K extends keyof O = keyof O>(
  o: O,
  ...keys: K[]
): ValueOf<O, K>[] {
  return keys.reduce((acc, key) => {
    if (o[key]) {
      acc.push(o[key] as ValueOf<O, K>);
    }
    return acc;
  }, [] as ValueOf<O, K>[]);
}
