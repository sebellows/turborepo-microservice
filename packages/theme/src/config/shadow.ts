import { Color } from '@trms/utils'

const OUTLINE_COLOR = '#8690A0'
const SHADOW_COLOR = '#1C1D1E'
const boxShadowTints = {
  dark: [
    Color(OUTLINE_COLOR).alpha(0.4),
    Color(SHADOW_COLOR).alpha(0.4),
    Color(SHADOW_COLOR).alpha(0.28),
    Color(SHADOW_COLOR).alpha(0.24),
  ],
  light: [
    Color(OUTLINE_COLOR).alpha(0.4),
    Color(SHADOW_COLOR).alpha(0.2),
    Color(SHADOW_COLOR).alpha(0.14),
    Color(SHADOW_COLOR).alpha(0.12),
  ],
}

const elevations = {
  sm: ['0 0 0 1px', '0 2px 1px -1px', '0 1px 1px 0', '0 1px 3px 0'],
  DEFAULT: ['0 0 0 1px', '0 3px 1px -2px', '0 2px 2px 0', '0 1px 5px 0'],
  md: ['0 0 0 1px', '0 3px 5px -1px', '0 6px 10px 0', '0 1px 18px 0'],
  lg: ['0 0 0 1px', '0 7px 8px -4px', '0 12px 17px 2px', '0 5px 22px 4px'],
  xl: ['0 0 0 1px', '0 9px 11px -5px', '0 18px 28px 2px', '0 7px 34px 6px'],
  '2xl': ['0 0 0 1px', '0 11px 15px -7px', '0 24px 38px 3px', '0 9px 46px 8px'],
  inner: ['inset 0 1px 3px 0'],
  none: ['0 0'],
}

function toBoxShadow(shadows: string[], dark?: boolean) {
  const tints = dark ? boxShadowTints.dark : boxShadowTints.light
  return shadows
    .reduce((style, shadow, i) => {
      style.push(`${shadow} ${tints[i]}`)
      return style
    }, [] as string[])
    .join(', ')
}

type ShadowConfig = Record<keyof typeof elevations, string>

const boxShadowThemeConfig = (): ShadowConfig => {
  return Object.entries(elevations).reduce((utils, [suffix, shadow]) => {
    utils[suffix] = toBoxShadow(shadow)
    return utils
  }, {}) as ShadowConfig
}

export const boxShadow = boxShadowThemeConfig()
