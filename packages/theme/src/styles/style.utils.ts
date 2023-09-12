import { camelCase, kebabCase, NonEmptyString } from '@trms/utils'

import { ColorPaletteKeys, ColorTintKey, ColorTintKeys, ColorVariantKeys } from '../types'
import { isWithBreakpoint, WithBreakpoint } from './breakpoints'

type SetPropertyMapReturnType<TArray extends readonly string[], TPrefix extends string = ''> = {
  [K in TArray[number]]: TPrefix extends NonEmptyString<TPrefix> ? `${TPrefix}-${K}` : K
}

/**
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
export function setPropertyMap<TArray extends readonly string[], TPrefix extends string>(
  arr: TArray,
  classPrefix: TPrefix,
  replacerMap?: Partial<Record<TArray[number], string>>,
): SetPropertyMapReturnType<TArray, TPrefix> {
  const alt = replacerMap ?? {}
  try {
    const result = arr.reduce((klass, value) => {
      const key = value?.includes('-') ? camelCase(value) : value
      let klassValue = value
      if (classPrefix.length > 0) {
        if (value.length && alt[value]) {
          klassValue = `${alt[value]}-${value}`
        } else {
          klassValue =
            !value.length || value === 'DEFAULT' ? String(classPrefix) : `${classPrefix}-${value}`
        }
      }
      klass[`${key}`] = klassValue
      return klass
    }, {} as SetPropertyMapReturnType<TArray, TPrefix>)
    return result
  } catch (err) {
    console.error('setPropertyMap->Error', err)
    throw new Error(`Could not set property map`)
  }
}

type UnitValueClassMap<
  TKeys extends readonly string[],
  TValues extends readonly string[],
  TClassPrefix extends string = '',
> = {
  [Key in TKeys[number]]: {
    [ValueKey in TValues[number]]: TClassPrefix extends NonEmptyString<TClassPrefix>
      ? `${TClassPrefix}-${Key}-${ValueKey}`
      : `${Key}-${ValueKey}`
  }
}

/**
 * @internal
 * This will map an array of Tailwind class utility prefixes that are used as "props"
 * with an array of suffixes (which are the possible values to those props), resolving
 * in the corresponding Tailwind class name.
 */
export function setUnitValuePropertyMap<
  TPrefixes extends readonly string[],
  TValues extends readonly string[],
  TClassPrefix extends string = '',
>(
  prefixes: TPrefixes,
  values: TValues,
  classPrefix?: TClassPrefix,
): UnitValueClassMap<TPrefixes, TValues, TClassPrefix> {
  const result = prefixes.reduce((klasses, prefix) => {
    klasses[prefix] = values.reduce((acc, value) => {
      const pathPrefix = kebabCase?.(prefix) ?? prefix
      acc[value] = classPrefix?.length
        ? `${classPrefix}-${pathPrefix}-${value}`
        : `${pathPrefix}-${value}`
      return acc
    }, {})
    return klasses
  }, {} as UnitValueClassMap<TPrefixes, TValues, TClassPrefix>)
  return result
}

export type ColorValueClassMap<
  TColorKeys extends readonly string[],
  TTintKeys extends readonly string[],
  TClassPrefix extends string,
> = Record<
  `${TColorKeys[number]}.${TTintKeys[number]}`,
  `${TClassPrefix}-${TColorKeys[number]}-${TTintKeys[number]}`
>

// TColorKeys extends typeof ColorPaletteKeys | typeof ColorVariantKeys,
export function setColorPropertyMap<
  TColorKeys extends readonly string[],
  TTintKeys extends readonly string[],
  TClassPrefix extends string,
>(
  prefixes: TColorKeys,
  values: TTintKeys,
  classPrefix: TClassPrefix,
): ColorValueClassMap<TColorKeys, TTintKeys, TClassPrefix> {
  const result = {} as ColorValueClassMap<TColorKeys, TTintKeys, TClassPrefix>
  prefixes.forEach(prefix => {
    values.forEach(value => {
      result[`${prefix}.${value}`] = `${classPrefix}-${prefix}-${value}`
    })
  })
  return result
}

const unitRE = /(px|%|rem|em|vw|vh)$/i

export const isUnit = (value: string) => unitRE.test(value)

export const extractUnit = (value: string): string => {
  const unit = value.match(unitRE)?.[0] ?? ''

  return unit
}

export const negateUiValue = <T extends string | number>(value: T | WithBreakpoint<T>) => {
  if (isWithBreakpoint(value)) {
    const bpObj: WithBreakpoint<T> = {}
    for (const bp in value) {
      if (typeof value[bp] === 'number') {
        bpObj[bp] = value[bp] <= 0 ? value[bp] : -value[bp]
      } else {
        bpObj[bp] =
          value[bp].startsWith('-') || value[bp].startsWith('0') ? value[bp] : `-${value[bp]}`
      }
    }
    return bpObj
  } else if (typeof value === 'number') {
    return value <= 0 ? value : -value
  }

  return value.startsWith('-') || value.startsWith('0') ? value : `-${value}`
}
