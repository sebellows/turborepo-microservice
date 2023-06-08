import { isNil, isPlainObject, isPrimitive } from '@trms/utils'

export const Breakpoints = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type Breakpoint = (typeof Breakpoints)[number]

// type ReadonlyKey = (readonly string[])[number]

export type WithBreakpoint<T> = Record<Breakpoint, T>

export const SpacingValues = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
] as const
export type SpacingNumber = (typeof SpacingValues)[number]

export const SpacingClasses = [
  'gap',
  'gap-x',
  'gap-y',
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

/**
 * VSCode/TS complains about typeof 'string' not being assignable to '"string" | "string"'
 * when verifying as `ReadonlyArray.includes(string)`. Workaround is to create a custom
 * `includes` function that accepts a readonly array and then we can imply that the
 * string we're checking is readonly (wink, wink). Sadly, we need to pass it as rest
 * parameters because `readonly (number | string)` won't work.
 */
const includes = (
  constProps: readonly (number | string)[],
  ...props: readonly (number | string)[]
) => {
  if (props.length === 1) {
    // exit faster
    return constProps.includes(props[0])
  }

  return props.every(prop => constProps.includes(prop))
}

export const isUnit = (value: string) => ['px', 'em', 'rem'].some(unit => value.endsWith(unit))

export const extractUnit = (value: string) => {
  const unit = ['px', 'em', 'rem'].find(suffix => value.endsWith(suffix))

  return unit
}

export const resolveUnitValue = (value: number | string, unit?: 'px' | 'em' | 'rem') => {
  if (isNil(value)) return

  if (typeof value === 'string') {
    if (isUnit(value)) {
      return value
    }
    if (isNaN(parseFloat(value))) {
      throw new Error(`Cannot resolve unit value. Value is not numeric.`)
    }
  }

  const strValue = parseFloat(`${value}`)

  return unit ? `${strValue}${unit}` : `${strValue}`
}

export const destructureUnitValue = (value: number | string) => {
  if (typeof value === 'number') {
    return value
  }

  return [parseFloat(value), extractUnit(value)]
}

export const setNegativeProp = (value: SpacingValue) => {
  if (typeof value === 'number') {
    return value < 0 || value === 0 ? value : -value
  }

  if (isPlainObject(value)) {
    for (const prop in value) {
      let valueProp = value[prop]
      if (isNil(valueProp)) {
        delete value[prop]
      } else {
        value[prop] = valueProp < 0 ? valueProp : -valueProp
      }
    }
    return value
  }

  if (isUnit(value)) {
    return value.startsWith('-') ? value : `-${value}`
  }

  throw new TypeError(`Cannot set negative value for spacing property.`)
}

function resolveSpacingValue(value: number | string) {
  if (typeof value === 'string') {
    if (value === 'auto') return value

    if (['px', 'em', 'rem'].some(unit => value.endsWith(unit))) {
      return `[${value}]`
    }
  }
  if (typeof value === 'number') {
    if (includes(SpacingValues, value)) {
      return value.toString()
    } else {
      return `[${value}px]`
    }
  }

  return '0'
}

export const createTailwindResolver =
  <P = {}>(properties: readonly string[], resolver: (...args: any[]) => string) =>
  <InnerP extends P>(props: InnerP): string[] => {
    const propertyClasses: string[] = []

    for (const prop in props) {
      if (isNil(props[prop]) || !includes(properties, prop)) continue

      const value = props[prop]

      let klasses: string[] = []

      if (isPrimitive(value)) {
        klasses.push(`${prop}-${resolver(value)}`)
        continue
      }
      if (isPlainObject(value)) {
        for (let bp in value as WithBreakpoint) {
          if (includes(Breakpoints, bp)) {
            const prefix = bp === 'none' ? '' : `${bp}:`
            const bpValue = resolver(value[bp])
            klasses.push(`${prefix}${prop}-${bpValue}`)
          }
        }
      }

      propertyClasses.push(...klasses)
    }

    return propertyClasses
  }

type ExtensibleSpacingProps<P = {}> = P & Partial<SpacingProps>
export const spacingResolver = createTailwindResolver<ExtensibleSpacingProps>(
  SpacingClasses,
  resolveSpacingValue,
)

export const parseBoxStyles = <P extends BoxProps>(props: P) => {
  let classes: string[] = []

  const {
    align,
    axis,
    display,
    flex,
    flexDirection,
    flexWrap,
    gap: gapProp = 0,
    justify,
    position,
    ...rest
  } = props

  let isFlex = false

  if (display && displayOptions?.[display]) {
    isFlex = ['grid', 'inline-grid', 'flex', 'inline-flex'].some(d => displayOptions[display] === d)
    classes.push(displayOptions[display])
  }
  if (position && positionOptions?.[position]) {
    classes.push(position)
  }
  if (isFlex) {
    if (flexWrap && flexWrapOptions?.[flexWrap]) {
      classes.push(`flex-${flexWrapOptions[flexWrap]}`)
    }
    if (align) {
      classes.push(`items-${alignmentOptions[align]}`)
    }
    if (justify && justifyOptions?.[justify]) {
      classes.push(`justify-${justifyOptions[justify]}`)
    }

    if (flexDirection && directionOptions?.[flexDirection]) {
      classes.push(`flex-${directionOptions[flexDirection]}`)
    }
    if (flex && flexOptions?.[flex]) {
      classes.push(`flex-${flex}`)
    }

    const gap = axis ? `gap-${axis}` : 'gap'
    const spacingClasses = spacingResolver({ [gap]: gapProp, ...rest })
    classes.push(...spacingClasses)
  }
}
