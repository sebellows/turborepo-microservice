import { BlendFn, Color, multiply, screen } from '@trms/utils'

import { palette } from './palette'
import { ColorVariantKey, PaletteKey } from './color.types'

const { black, gray: neutral, white } = palette

const baseLight = neutral['50']
const baseDark = neutral['900']
const borderLightTranslucent = Color(black).alpha(0.12)
const borderDarkTranslucent = Color(white).alpha(0.12)

type VariantsConfig = Record<ColorVariantKey, PaletteKey | null>
const DefaultVariants: VariantsConfig = {
  default: null,
  primary: 'orange',
  secondary: 'purple',
  info: 'cyan',
  neutral: 'gray',
  success: 'green',
  danger: 'red',
  warning: 'yellow',
}

const setVariants = (variants: VariantsConfig = DefaultVariants) => {
  return Object.entries(variants).reduce((acc, [variant, hue]) => {
    if (!hue) return acc

    const color = palette[hue]

    acc[`${variant}`] = {
      bg: [`bg-${color}-600`, `dark:bg-${color}-400`],
      bgAction: [
        `bg-${color}-600`,
        `hover:bg-${color}-700`,
        `active:bg-${color}-800`,
        `disabled:bg-${color}-600`,
        `dark:bg-${color}-400`,
        `dark:hover:bg-${color}-500`,
        `dark:active:bg-${color}-600`,
        `dark:disabled:bg-${color}-400`,
        `disabled:point-events-none`,
      ],
      translucent: [`bg-${color}-200`, `dark:bg-${color}-200`],
      translucentAction: [
        `bg-${color}-200`,
        `dark:bg-${color}-200`,
        `hover:bg-${color}-300`,
        `dark:hover:bg-${color}-300`,
        `active:bg-${color}-400`,
        `dark:active:bg-${color}-400`,
        `disabled:bg-${color}-100`,
        `dark:disabled:bg-${color}-100`,
        `disabled:point-events-none`,
      ],
      border: [`border-${color}-900/12`],
      text: [`text-neutral-900 dark:text-neutral-50`],
      invertedText: [`text-${color}-600`, `dark:text-${color}-400`],
      link: [
        `text-black`,
        'dark:text-white',
        'underline',
        `hover:text-neutral-900`,
        `dark:hover:text-neutral-200`,
        `active:text-neutral-700`,
        `dark:active:text-neutral-300`,
        `disabled:text-black`,
        `dark:disabled:text-white`,
        `disabled:opacity-0.5`,
        'disabled:pointer-events-none',
      ],
      navLink: [
        `text-black`,
        'dark:text-white',
        'no-underline',
        `hover:text-neutral-900`,
        `dark:hover:text-neutral-200`,
        `active:text-neutral-700`,
        `dark:active:text-neutral-300`,
        `disabled:text-black`,
        `dark:disabled:text-white`,
        `disabled:opacity-0.5`,
        'disabled:pointer-events-none',
      ],
    }

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
