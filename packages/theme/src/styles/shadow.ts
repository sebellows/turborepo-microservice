import { setPropertyMap } from './style.utils'

export const ShadowValues = ['DEFAULT', 'sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'] as const
export type ShadowClass = (typeof ShadowValues)[number]

export const shadow = setPropertyMap(ShadowValues, 'shadow')
