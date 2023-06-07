import { isNil, isPlainObject, isPrimitive } from '@trms/utils'

export const SpacingValues = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
] as const
export type SpacingNumber = (typeof SpacingValues)[number]

export const SpacingKeys = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'inset',
  'inset-x',
  'inset-y',
  'start',
  'end',
  'top',
  'right',
  'bottom',
  'left',
] as const
export type SpacingKey = (typeof SpacingKeys)[number]

export const Breakpoints = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
export type Breakpoint = (typeof Breakpoints)[number]

// type ReadonlyKey = (readonly string[])[number]
// export type WithBreakpoint<Key extends ReadonlyKey, Prefix extends Breakpoint = 'none'> = Prefix extends 'none' ? Key : `${Prefix}:${Key}`

export type BreakpointObj = Record<Breakpoint, SpacingNumber>
/**
 * Can be either: `8` | `{ md: 8, lg: 12 }`
 */
export type SpacingValue = SpacingNumber | BreakpointObj

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { mb: 8, mt: { sm: 8, lg: 16 }, p: 4 }
 */
export type SpacingProps = Record<SpacingKey, SpacingValue>

/**
 * Make the readonly versions usable in a function VSCode/TS complaining about
 * typeof 'string' not being assignable to '"string" | "string"'.
 */
const _spacingKeys = SpacingKeys.map(k => String(k))
const _spacingValues = SpacingValues.map(k => Number(k))
const _breakpoints = Breakpoints.map(k => String(k))

function resolveSpacingValue(value: number | string) {
  if (typeof value === 'string') {
    if (value === 'auto') return value

    if (['px', 'em', 'rem'].some(unit => value.endsWith(unit))) {
      return `[${value}]`
    }
  }
  if (typeof value === 'number') {
    if (_spacingValues.includes(value)) {
      return value.toString()
    } else {
      return `[${value}px]`
    }
  }

  return `${value}`
}

export function resolveSpacingClasses(props: SpacingProps): string[] {
  const spacingClasses: string[] = []

  for (const prop in props) {
    const value = props[prop]

    if (isNil(value) || !_spacingKeys.includes(prop)) continue

    let klasses: string[] = []
    let prefix = prop

    if (isPrimitive(value)) {
      klasses.push(`${prefix}-${value}`)
      continue
    }
    if (isPlainObject(value)) {
      for (let bp in value as BreakpointObj) {
        if (_breakpoints.includes(bp) && bp !== 'none') {
          klasses.push(`${bp}:${prefix}-${value[bp]}`)
        }
      }
    }

    spacingClasses.push(...klasses)
  }

  return spacingClasses
}
