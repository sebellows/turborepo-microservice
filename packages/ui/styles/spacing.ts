import { WithBreakpoint } from './breakpoints'
import {
  // _createUnitValueResolver,
  setUnitValuePropertyMap,
} from './style.utils'

export const SpacingValues = [
  'px', // '1px'
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
] as const
export type SpacingNumber = (typeof SpacingValues)[number]

export const SpacingClasses = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'me',
  'ms',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'pe',
  'ps',
  'px',
  'py',
] as const
export type SpacingClass = (typeof SpacingClasses)[number]

/**
 * Can be either: `8` | `{ md: 8, lg: 12 }`
 */
export type SpacingValue = string | SpacingNumber | WithBreakpoint<SpacingNumber>

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { mb: 8, mt: { sm: 8, lg: 16 }, p: 4 }
 */
export type SpacingProps = Record<SpacingClass, SpacingValue>

// export const resolveSpacingValue = _createUnitValueResolver(SpacingValues)

export const spacing = setUnitValuePropertyMap(SpacingClasses, SpacingValues)

// export const useSpacing = (props: UIComponentProps) => {}
// export function resolveSpacingValue(
//   value: number | string,
//   propValues: readonly (string | number)[] = SpacingValues,
// ) {
//   if (typeof value === 'string') {
//     const strValue = value
//     if (strValue === 'auto') return strValue

//     if (['px', 'em', 'rem'].some(unit => strValue.endsWith(unit))) {
//       return `[${strValue}]`
//     }

//     if (!isNaN(parseFloat(value))) {
//       value = parseFloat(value)
//     }
//   }
//   if (typeof value === 'number') {
//     if (includes(propValues, value)) {
//       return value.toString()
//     } else {
//       return `[${value}px]`
//     }
//   }

//   return '0'
// }
