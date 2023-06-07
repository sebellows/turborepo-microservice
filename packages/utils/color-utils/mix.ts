import { Color } from './color'

import { set } from '../collection'

import { ColorParam } from './color.types'

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => string

const clamp = (num: number) => Math.max(Math.min(num, 255), 0)

/** Create a blend mode function */
const blend = (channelFn: (a: number, b: number) => number): BlendFn => {
  return function <T extends ColorParam = ColorParam>(source: T, destination: T): string {
    const s = Color(source).to.rgb().object()
    const d = Color(destination as ColorParam)
      .to.rgb()
      .object()
    const rgb = Object.entries(s).reduce((acc, [key, value]) => {
      set(acc, key, Math.round(clamp(channelFn(value / 255, d[key] / 255)) * 255))
      return acc
    }, {}) as T
    return Color(rgb as ColorParam).toString()
  }
}

export const multiplyChannel = (a: number, b: number): number => a * b

/**
 * Apply a `multiply` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingmultiply
 */
export const multiply = blend(multiplyChannel) as BlendFn

const screenChannel = (a: number, b: number): number => a + b - a * b

/**
 * Apply the `screen` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 */
export const screen = blend(screenChannel) as BlendFn
