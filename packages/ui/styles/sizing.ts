import { WithBreakpoint } from './breakpoints'
import { SpacingNumber } from './spacing'
import { setUnitValuePropertyMap } from './style.utils'

export const SizingValues = [
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
  '1/6',
  '2/6',
  '3/6',
  '4/6',
  '5/6',
  '1/12',
  '2/12',
  '3/12',
  '4/12',
  '5/12',
  '6/12',
  '7/12',
  '8/12',
  '9/12',
  '10/12',
  '11/12',
  'full',
  'screen',
  'min',
  'max',
  'fit',
] as const
export type SizingValueOption = (typeof SizingValues)[number]

export const SizingClasses = ['w', 'minW', 'maxW', 'h', 'minH', 'maxH'] as const
export type SizingClass = (typeof SizingClasses)[number]
// export type SizingValue =
//   | number
//   | string
//   | SpacingNumber
//   | SizingValueOption
//   | WithBreakpoint<SpacingNumber | SizingValueOption>

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { w: '5/12', h: { sm: 'max', lg: 'min' }, minW: 96 }
 */
// export type SizingProps = Record<SizingClass, SizingValue>

export const sizing = setUnitValuePropertyMap(SizingClasses, SizingValues)
