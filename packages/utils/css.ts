type DimensionValue = string | number | undefined

const ROOT_FONT_SIZE = 16

// const units = ['px', 'em', 'rem'] as const
// type UnitSuffix = (typeof units)[number]

// export const toUnit = (
//   value: string | number | undefined,
//   unit: UnitSuffix = 'px',
//   baseFontSize = ROOT_FONT_SIZE,
// ): string => {
//   if (!value) return '0'

//   const prevUnit = typeof value === 'string' && units.find(u => value.endsWith(u))
//   let numericValue: number

//   if (prevUnit) {
//     numericValue = parseFloat(value.slice(0, -prevUnit.length))
//   } else {
//     numericValue = +value
//   }

//   switch (unit) {
//     case 'px':
//       return toPx(numericValue, baseFontSize)
//     case 'em':
//       return toEm(numericValue, baseFontSize)
//     case 'rem':
//       return toRem(numericValue, baseFontSize)
//     default:
//       throw new Error(`Invalid unit specified in toUnit(). Unit must be "px", "em", or "rem"`)
//   }
// }

/**
 * Convert pixel value to em units
 */
export function toPx(value: DimensionValue, baseFontSize: number = ROOT_FONT_SIZE) {
  if (!value) return '0'

  let numericValue = +value
  let isRelativeUnit = false

  if (typeof value === 'string') {
    isRelativeUnit = value.endsWith('em')

    numericValue = parseFloat(value)
  }

  numericValue = isRelativeUnit ? numericValue * baseFontSize : numericValue / baseFontSize

  return `${numericValue}px`
}

const toRelativeUnit =
  <U extends 'em' | 'rem'>(unit: U) =>
  (value: DimensionValue, baseFontSize: number = ROOT_FONT_SIZE): '0' | `${number}${U}` => {
    if (!value) return '0'

    let numericValue = +value

    if (typeof value === 'string') {
      numericValue = parseFloat(value)
    }

    numericValue = numericValue / baseFontSize

    return `${numericValue}${unit}`
  }

/**
 * Convert pixel value to em units
 */
export const toEm = toRelativeUnit('em')

/**
 * Convert pixel value to rem units
 */
export const toRem = toRelativeUnit('rem')
