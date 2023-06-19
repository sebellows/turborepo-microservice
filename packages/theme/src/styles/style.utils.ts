import {
  camelCase,
  get,
  isPlainObject,
  isRegExp,
  kebabCase,
  memoize,
  NonEmptyString,
} from "@trms/utils";

import { isWithBreakpoint, WithBreakpoint } from "./breakpoints";
import { TailwindPrefixes } from "./tailwind";
import { UIComponentProps } from "./style.props";

const containsTailwindPrefixObject = <T extends Record<string, any>>(
  value: T
) => {
  try {
    const hasBreakpoint = Object.keys(value).some((val) =>
      includes(TailwindPrefixes, val)
    );
    return hasBreakpoint;
  } catch (err) {
    return false;
  }
};

type FilteredPool = { regexes: RegExp[]; indices: (number | string)[] };
const _filter = <TItems extends (number | string | RegExp)[]>(
  items: TItems
) => {
  // const parsedItems = JSON.parse(items);
  // console.log('filterProps', parsedItems)
  const pool: FilteredPool = {
    regexes: [],
    indices: [],
  };
  for (const item of items) {
    if (isRegExp(item)) pool.regexes.push(item);
    else pool.indices.push(item);
  }
  return pool;
};
const filterProps = memoize(_filter);

/**
 * VSCode/TS complains about typeof 'string' not being assignable to '"string" | "string"'
 * when verifying as `ReadonlyArray.includes(string)`. Workaround is to create a custom
 * `includes` function that accepts a readonly array and then we can imply that the
 * string we're checking is readonly (wink, wink). Sadly, we need to pass it as rest
 * parameters because `readonly (number | string)` won't work.
 */
export const includes = (
  constProps: readonly (number | string | RegExp)[],
  ...props: readonly (number | string)[]
) => {
  const pool = filterProps(constProps);
  const { regexes, indices } = pool;

  const propIncluded = (prop: number | string) => {
    return (
      regexes.some((regex) => regex.test(String(prop))) ||
      indices.includes(prop)
    );
  };

  const included = props.some(propIncluded);

  return included;
};

export const propsToTwClasses = (props: Partial<UIComponentProps>) => {
  try {
    const result = Object.entries(props).reduce((classes, [prop, value]) => {
      if (prop in UIComponentProps) {
        if (typeof value === "string" && value in UIComponentProps[prop]) {
          const twClass = get(UIComponentProps, [prop, value], undefined);
          classes.push(twClass);
        }
        if (isPlainObject(value) && containsTailwindPrefixObject(value)) {
          Object.entries(value).forEach(([bp, bpValue]) => {
            if (includes(TailwindPrefixes, bp)) {
              const bpClass = get(UIComponentProps, [prop, bpValue]);
              classes.push(`${bp}:${bpClass}`);
            }
          });
        }
      }

      return classes;
    }, [] as string[]);
    return result;
  } catch (err) {
    console.error("propsToTwClasses=>Error", err);
    throw new Error(`Failed to map properties`);
  }
};

type SetPropertyMapReturnType<
  TArray extends readonly string[],
  TPrefix extends string = ""
> = {
  [K in TArray[number]]: TPrefix extends NonEmptyString<TPrefix>
    ? `${TPrefix}-${K}`
    : K;
};
// Record<
//   TArray[number],
//   TPrefix extends string ? `${TPrefix}-${TArray[number]}` : TArray[number]
// >;

/**
 * @internal
 * This is used to generate the property->value->className maps that are iterated through
 * in order to grab the correct TW class corresponding to property-value shorthand.
 *
 * @param arr - A readonly array of Tailwind utility class suffixes/values
 * @param classPrefix - The prefix/base class of the utility class name
 * @param replaceMap - An object mapping values from `arr` to an alternate prefix. Required for
 * cases like "Grid Column Start / End" where every other class is `col-span-<arr[index]>`, but
 * some one-off has to drop part of the prefix class for some reason and be `col-auto` 🤬.
 * @returns an object mapping a Tailwind suffix/value to the full Tailwind utility class name.
 */
export function setPropertyMap<
  TArray extends readonly string[],
  TPrefix extends string
>(
  arr: TArray,
  classPrefix: TPrefix,
  replacerMap?: Partial<Record<TArray[number], string>>
): SetPropertyMapReturnType<TArray, TPrefix> {
  const alt = replacerMap ?? {};
  try {
    const result = arr.reduce((klass, value) => {
      const key = value?.includes("-") ? camelCase(value) : value;
      let klassValue = value;
      if (classPrefix.length > 0) {
        if (value.length && alt[value]) {
          klassValue = alt[value];
        } else {
          klassValue =
            !value.length || value === "DEFAULT"
              ? String(classPrefix)
              : `${classPrefix}-${value}`;
        }
      }
      klass[`${key}`] = klassValue;
      return klass;
    }, {} as SetPropertyMapReturnType<TArray, TPrefix>);
    return result;
  } catch (err) {
    console.error("setPropertyMap->Error", err);
    throw new Error(`Could not set property map`);
  }
}

type UnitValueClassMap<
  TKeys extends readonly string[],
  TValues extends readonly string[]
> = {
  [Key in TKeys[number]]: {
    [ValueKey in TValues[number]]: `${Key}-${ValueKey}`;
  };
};

/**
 * @internal
 * This will map an array of Tailwind class utility prefixes that are used as "props"
 * with an array of suffixes (which are the possible values to those props), resolving
 * in the corresponding Tailwind class name.
 */
export function setUnitValuePropertyMap<
  TPrefixes extends readonly string[],
  TValues extends readonly string[]
>(prefixes: TPrefixes, values: TValues): UnitValueClassMap<TPrefixes, TValues> {
  const result = prefixes.reduce((klasses, prefix) => {
    klasses[prefix] = values.reduce((acc, value) => {
      const pathPrefix = kebabCase?.(prefix) ?? prefix;
      acc[value] = `${pathPrefix}-${value}`;
      return acc;
    }, {});
    return klasses;
  }, {} as UnitValueClassMap<TPrefixes, TValues>);
  return result;
}

export const isUnit = (value: string) =>
  ["px", "em", "rem"].some((unit) => value.endsWith(unit));

export const extractUnit = (value: string) => {
  const unit = ["px", "em", "rem"].find((suffix) => value.endsWith(suffix));

  return unit;
};

export const negateUiValue = <T extends string | number>(
  value: T | WithBreakpoint<T>
) => {
  if (isWithBreakpoint(value)) {
    const bpObj: WithBreakpoint<T> = {};
    for (const bp in value) {
      bpObj[bp] = value[bp] <= 0 ? value[bp] : -value[bp];
    }
    return bpObj;
  } else if (typeof value === "number") {
    return value <= 0 ? value : -value;
  }

  return value.startsWith("-") || value.startsWith("0") ? value : `-${value}`;
};
