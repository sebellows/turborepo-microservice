import { isPlainObject, isRegExp, memoize } from '@trms/utils'
import { BorderUnitClasses } from './borders'
import { Breakpoints } from './breakpoints'
import { SizeClasses } from './sizing'
import { MarginClasses, PaddingClasses } from './spacing'
import { UIComponentProps, UI_COMPONENT_PROPS } from './style.props'

export const TailwindPrefixes = [
  ...Breakpoints,
  'dark',
  'hover',
  'focus',
  'active',
  'after',
  'before',
  'first',
  'last',
  'odd',
  'even',
  'disabled',
  'invalid',
  'read-only',
  'indeterminate',
  'checked',
  'file',
  'marker',
  'placeholder',
  'selection',
  'first-line',
  'first-letter',
  'backdrop',
  'motion-reduce',
  'motion-safe',
  'contrast-more',
  'portrait',
  'landscape',
  'print',
  /supports-\[.+?\]/,
  /group-\w+?-\w+/,
  /peer-\w+?-\w+/,
]
const bps = Breakpoints.map(String)
const unitClasses = ['text', BorderUnitClasses, MarginClasses, PaddingClasses, SizeClasses].flat()
const customUnitRE = /\[\d+?\.?\d+(px|%|rem|em|vw|vh)\]/i

type FilteredPool = { regexes: RegExp[]; indices: (number | string)[] }
const _filter = <TItems extends (number | string | RegExp)[]>(items: TItems) => {
  const pool: FilteredPool = {
    regexes: [],
    indices: [],
  }
  for (const item of items) {
    if (isRegExp(item)) pool.regexes.push(item as RegExp)
    else pool.indices.push(item as string | number)
  }
  return pool
}
const filterProps = memoize(_filter)

/**
 * VSCode/TS complains about typeof 'string' not being assignable to '"string" | "string"'
 * when verifying as `ReadonlyArray.includes(string)`. Workaround is to create a custom
 * `includes` function that accepts a readonly array and then we can imply that the
 * string we're checking is readonly (wink, wink). Rest parameters need to be used due to
 * only arrays being allowed to have `readonly` applied.
 */
export const includes = (
  constProps: readonly (number | string | RegExp)[],
  ...props: readonly (number | string)[]
) => {
  const pool = filterProps(constProps)
  const { regexes, indices } = pool

  const propIncluded = (prop: number | string) => {
    return regexes.some(regex => regex.test(String(prop))) || indices.includes(prop)
  }

  const included = props.some(propIncluded)

  return included
}

const containsTailwindPrefixObject = <T extends Record<string, any>>(value: T) => {
  try {
    const hasBreakpoint = Object.keys(value).some(val => includes(TailwindPrefixes, val))
    return hasBreakpoint
  } catch (err) {
    return false
  }
}

/**
 * Returns an array of Tailwind classes from passed props to a component.
 *
 * @example
 * const MyComponent = ({ textColor: 'primary.500', bg: 'white', mx: 'auto', ...props }) => {
 *   const classes = propsToTwClasses({ textColor, bg, mx })
 *   console.log(classes) // => ['text-primary-500', 'bg-white', 'mx-auto']
 *
 *   return (
 *     <div className={classes}>
 *       <!-- [...] -->
 *     </div>
 *   )
 * }
 */
export const propsToTwClasses = (props: Partial<UIComponentProps>) => {
  try {
    const classSet = new Set<string>()
    const result = Object.entries(props).reduce((classes, [prop, value]) => {
      if (prop in UI_COMPONENT_PROPS) {
        if (typeof value === 'string' && value in UI_COMPONENT_PROPS[prop]) {
          // For color properties, value will already be in dot-syntax, so we can't use `get`
          const twClass = UI_COMPONENT_PROPS[prop][value]

          if (twClass) {
            classes.add(twClass)
          } else if (customUnitRE.test(value) && unitClasses.includes(prop)) {
            classes.add(prop + value)
          }
        }

        if (isPlainObject(value) && containsTailwindPrefixObject(value)) {
          const sortedBps = Object.entries(value).sort(
            (a, b) => bps.indexOf(a[0]) - bps.indexOf(b[0]),
          )

          sortedBps.forEach(([bp, bpValue]) => {
            if (includes(TailwindPrefixes, bp)) {
              const bpClass = UI_COMPONENT_PROPS[prop][bpValue]

              if (bpClass) {
                classes.add(`${bp}:${bpClass}`)
              } else if (customUnitRE.test(bpValue) && unitClasses.includes(prop)) {
                classes.add(`${bp}:${prop}${bpValue}`)
              }
            }
          })
        }
      }

      return classes
    }, classSet)

    const classResults = Array.from(result)

    return classResults
  } catch (err) {
    console.error('propsToTwClasses=>Error', err)
    throw new Error(`Failed to map properties`)
  }
}
