import { camelCase, isPlainObject, isRegExp, memoize } from '@trms/utils'
import { WithBreakpoint } from './breakpoints'

/**
 * @internal
 * This is used to generate the property->value->className maps that are iterated through
 * in order to grab the correct TW class corresponding to property-value shorthand.
 */
export const setPropertyMap = <
  TArray extends readonly string[],
  TPrefix extends string | undefined = undefined,
>(
  arr: TArray,
  classPrefix?: TPrefix,
) => {
  return arr.reduce((klass, value) => {
    const key = value.includes('-') ? camelCase(value) : value
    klass[`${key}`] = classPrefix ? `${classPrefix}-${value}` : value
    return klass
  }, {} as Record<TArray[number], TPrefix extends string ? `${TPrefix}-${TArray[number]}` : TArray[number]>)
}

type UnitValueClassMap<TKeys extends readonly string[], TValues extends readonly string[]> = {
  [Key in TKeys[number]]: { [ValueKey in TValues[number]]: `${Key}-${ValueKey}` }
}

/**
 * This will map an array of Tailwind class utility prefixes that are used as "props"
 * with an array of suffixes (which are the possible values to those props), resolving
 * in the corresponding Tailwind class name.
 */
export const setUnitValuePropertyMap = <
  TPrefixes extends readonly string[],
  TValues extends readonly string[],
>(
  prefixes: TPrefixes,
  values: TValues,
): UnitValueClassMap<TPrefixes, TValues> => {
  return prefixes.reduce((klasses, prefix) => {
    klasses[prefix] = values.reduce((acc, value) => {
      acc[value] = `${prefix}-${value}`
      return acc
    }, {})
    return klasses
  }, {} as UnitValueClassMap<TPrefixes, TValues>)
}

const unitTypes = ['px', 'em', 'rem', '%', 'vh', 'vw']

/** @internal */
// export function _createUnitValueResolver(propValues: readonly (string | number)[]) {
//   return (value: number | string) => {
//     if (typeof value === 'string') {
//       const strValue = value
//       if (strValue === 'auto') return strValue

//       if (unitTypes.some(unit => strValue.endsWith(unit))) {
//         return `[${strValue}]`
//       }

//       if (!isNaN(parseFloat(value))) {
//         value = parseFloat(value)
//       }
//     }

//     if (typeof value === 'number') {
//       if (includes(propValues, value)) {
//         return value.toString()
//       } else {
//         return `[${value}px]`
//       }
//     }

//     return '0'
//   }
// }

const filterProps = memoize((items: string) => {
  const parsedItems = JSON.parse(items)
  const pool: { regexes: RegExp[]; indices: (number | string)[] } = { regexes: [], indices: [] }
  for (const item of parsedItems) {
    if (isRegExp(item)) pool.regexes.push(item)
    else pool.indices.push(item)
  }
  return pool
})

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
  const { regexes, indices } = filterProps(JSON.stringify(constProps))

  const propIncluded = (prop: number | string) => {
    if (
      (regexes.length && regexes.some(regex => regex.test(String(prop)))) ||
      (indices.length && indices.includes(prop))
    ) {
    }
  }

  return props.every(propIncluded)
}

export const isUnit = (value: string) => ['px', 'em', 'rem'].some(unit => value.endsWith(unit))

export const extractUnit = (value: string) => {
  const unit = ['px', 'em', 'rem'].find(suffix => value.endsWith(suffix))

  return unit
}

export const negateUiValue = <T extends number | string>(value: T | WithBreakpoint<T>) => {
  if (isPlainObject(value)) {
    for (const bp in value) {
      value[bp] = value[bp] <= 0 ? value[bp] : -value[bp]
    }
    return value
  } else if (typeof value === 'number') {
    return value <= 0 ? value : -value
  }

  return value.startsWith('-') || value.startsWith('0') ? value : `-${value}`
}

// export const resolveUnitValue = (value: number | string, unit?: 'px' | 'em' | 'rem') => {
//   if (isNil(value)) return

//   if (typeof value === 'string') {
//     if (isUnit(value)) {
//       return value
//     }
//     if (isNaN(parseFloat(value))) {
//       throw new Error(`Cannot resolve unit value. Value is not numeric.`)
//     }
//   }

//   const strValue = parseFloat(`${value}`)

//   return unit ? `${strValue}${unit}` : `${strValue}`
// }

// export const destructureUnitValue = (value: number | string) => {
//   if (typeof value === 'number') {
//     return value
//   }

//   return [parseFloat(value), extractUnit(value)]
// }

// export const setNegativeProp = (value: SpacingValue) => {
//   if (typeof value === 'number') {
//     return value < 0 || value === 0 ? value : -value
//   }

//   if (isPlainObject(value)) {
//     for (const prop in value) {
//       let valueProp = value[prop]
//       if (isNil(valueProp)) {
//         delete value[prop]
//       } else {
//         value[prop] = valueProp < 0 ? valueProp : -valueProp
//       }
//     }
//     return value
//   }

//   if (isUnit(value)) {
//     return value.startsWith('-') ? value : `-${value}`
//   }

//   throw new TypeError(`Cannot set negative value for spacing property.`)
// }
