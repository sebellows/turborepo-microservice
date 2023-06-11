import { get, isPlainObject, pick } from '@trms/utils'
import { ValueOf } from '@trms/utils/types'

import { WithBreakpoint } from './breakpoints'
import { flexgrid } from './flexgrid'
import { layout } from './layout'
import { includes } from './style.utils'
import { TailwindPrefixes } from './tailwind'
import { typography } from './typography'
import { spacing } from './spacing'
import { sizing } from './sizing'
import { useMemo, useState } from 'react'

export const UIComponentProps = {
  ...layout,
  ...flexgrid,
  ...sizing,
  ...spacing,
  ...typography,
}

export type UIPropertyMap = typeof UIComponentProps
// Key of UIComponentProps: `flex`, `leading`, `alignItems`, etc.
export type UIPropertyKey = keyof UIPropertyMap
// i.e., key of UIComponentProps.flex: `none`, `1`, `auto`, etc.
export type UIPropertyValue<K extends UIPropertyKey> = keyof UIPropertyMap[K]
// i.e., `flex-none`, `flex-1`, etc.
export type UIPropertyClass<
  K extends UIPropertyKey,
  K2 extends keyof UIPropertyMap[K] = keyof UIPropertyMap[K],
> = ValueOf<UIPropertyMap[K], K2>

/**
 * @example
 * <h1 fontWeight='thin'>The Title</h1>
 * OR
 * <h1 fontWeight={{ xs: 'extrabold', md: 'heavy', '2xl': 'thin' }}>The Title</h1>
 */
export type UIComponentProps = {
  [K in UIPropertyKey]:  // keyof typeof UIComponentProps
    | UIPropertyValue<K> // keyof UIPropertyMap[K]
    | WithBreakpoint<UIPropertyValue<K>> // <keyof UIPropertyMap[K]>
}

const containsTailwindPrefixObject = <T extends Record<string, any>>(value: T) => {
  try {
    const hasBreakpoint = Object.keys(value).some(val => includes(TailwindPrefixes, val))
    return hasBreakpoint
  } catch (err) {
    return false
  }
}

export const mapProps = (props: Partial<UIComponentProps>) => {
  return Object.entries(props).reduce((classes, [prop, value]) => {
    if (prop in UIComponentProps) {
      if (typeof value === 'string' && value in UIComponentProps[prop]) {
        const twClass = get(UIComponentProps, [prop, value])
        classes.push(twClass)
      }
      if (isPlainObject(value) && containsTailwindPrefixObject(value)) {
        Object.entries(value).forEach(([bp, bpValue]) => {
          const bpClass = get(UIComponentProps, [prop, bpValue])
          classes.push(`${bp}:${bpClass}`)
        })
      }
    }

    return classes
  }, [] as string[])
}

export const UI_PROP_KEYS = Object.keys(UIComponentProps)

export const useUIProps = <P = {}>(
  props: P & Partial<UIComponentProps>,
  omits?: string[],
  deps: any[] = [],
) => {
  const [nonUIProps, setNonUIProps] = useState<P | null>(null)
  const uiClasses = useMemo(() => {
    const keys = omits ? UI_PROP_KEYS.filter(k => omits.indexOf(k) === -1) : UI_PROP_KEYS
    const uiProps = pick(props, ...keys)
    if (!nonUIProps) {
      const extraKeys = Object.keys(props).filter(key => UI_PROP_KEYS.indexOf(key) === -1)
      const extra = pick(props, ...extraKeys) as P
      setNonUIProps(extra)
    }
    return mapProps(uiProps)
  }, deps)

  return [uiClasses, nonUIProps]
}
