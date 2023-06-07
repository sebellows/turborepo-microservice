import { BlendFn, Color, multiply, screen } from '@trms/utils'

import { palette } from './palette'

const { black, gray: neutral, white } = palette

const baseLight = neutral['50']
const baseDark = neutral['900']
const borderLightTranslucent = Color(black).alpha(0.12)
const borderDarkTranslucent = Color(white).alpha(0.12)

const variants = {
  primary: palette.orange,
  secondary: palette.purple,
  info: palette.cyan,
  neutral: palette.gray,
  success: palette.green,
  danger: palette.red,
  warning: palette.yellow,
}

const setTranslucent = (color: string) => Color(color).alpha(0.12)

const setVariants = (base: string, mix: BlendFn) => {
  const fg = mix(base, white)

  return Object.entries(variants).reduce((acc, [variant, tones]) => {
    acc[`${variant}`] = tones['500']
    acc[`${variant}-light`] = mix(base, tones['500'])
    acc[`${variant}-hover`] = mix(base, tones['600'])
    acc[`${variant}-active`] = mix(base, tones['800'])
    acc[`${variant}-disabled`] = mix(base, tones['200'])
    acc[`${variant}-fg`] = fg
    acc[`${variant}-fg-hover`] = tones['400']
    acc[`${variant}-fg-active`] = tones['700']
    acc[`${variant}-fg-disabled`] = fg
    acc[`${variant}-trans`] = setTranslucent(tones['900'])

    return acc
  }, {})
}

const light = {
  base: `${baseLight}`,
  'base-inverted': baseDark,
  'base-hover': neutral['100'],
  'base-active': neutral['200'],
  'base-disabled': baseLight,
  'base-fg': baseDark,
  'base-fg-inverted': baseLight,
  'base-fg-hover': neutral['800'],
  'base-fg-active': neutral['950'],
  'base-fg-disabled': baseDark,
  'base-trans': borderLightTranslucent,
  'base-trans-inverted': borderDarkTranslucent,
  ...setVariants(baseLight, multiply),
}

const dark = {
  base: baseDark,
  'base-inverted': baseLight,
  'base-hover': neutral['800'],
  'base-active': neutral['950'],
  'base-disabled': baseDark,
  'base-fg': baseLight,
  'base-fg-inverted': baseDark,
  'base-fg-hover': neutral['200'],
  'base-fg-active': neutral['400'],
  'base-fg-disabled': baseLight,
  'base-trans': borderDarkTranslucent,
  'base-trans-inverted': borderLightTranslucent,
  ...setVariants(baseDark, screen),
}

export const themes = {
  light,
  dark,
  ...palette,
}
