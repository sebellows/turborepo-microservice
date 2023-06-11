import { palette } from './palette'
import { ColorVariantKey, PaletteKey } from './color.types'

type VariantsConfig = Record<ColorVariantKey, PaletteKey>
const variantsConfig: VariantsConfig = {
  default: 'gray',
  primary: 'orange',
  secondary: 'purple',
  info: 'cyan',
  neutral: 'gray',
  success: 'green',
  danger: 'red',
  warning: 'yellow',
}

const VariantColorSchemeKeys = [
  'bg',
  'bgInteractive',
  'muted',
  'mutedInteractive',
  'border',
  'link',
  'text',
  'foreground',
  'navLink',
] as const
type VariantColorSchemeKey = (typeof VariantColorSchemeKeys)[number]
type VariantColorScheme = Record<VariantColorSchemeKey, string[]>
type VariantColorSchemes = Record<ColorVariantKey, VariantColorScheme>

const variantClasses = Object.entries(variantsConfig).reduce((acc, [variant, hue]) => {
  const color = palette[hue]

  acc[`${variant}`] = {
    bg: [`bg-${color}-600`, `dark:bg-${color}-400`],
    bgInteractive: [
      `bg-${color}-600`,
      `dark:bg-${color}-400`,
      `hover:bg-${color}-700`,
      `dark:hover:bg-${color}-500`,
      `active:bg-${color}-800`,
      `dark:active:bg-${color}-600`,
      `disabled:bg-${color}-600`,
      `dark:disabled:bg-${color}-400`,
      'disabled:pointer-events-none',
    ],
    muted: [`bg-${color}-200`, `dark:bg-${color}-200`],
    mutedInteractive: [
      `bg-${color}-200`,
      `dark:bg-${color}-200`,
      `hover:bg-${color}-300`,
      `dark:hover:bg-${color}-300`,
      `active:bg-${color}-400`,
      `dark:active:bg-${color}-400`,
      `disabled:bg-${color}-100`,
      `dark:disabled:bg-${color}-100`,
      'disabled:pointer-events-none',
    ],
    border: [`border-${color}-900/12`],
    foreground: [`text-neutral-900 dark:text-neutral-50`],
    text: [`text-${color}-600`, `dark:text-${color}-400`],
    link: [
      'text-black',
      'dark:text-white',
      'underline',
      'hover:text-neutral-900',
      'dark:hover:text-neutral-200',
      'active:text-neutral-700',
      'dark:active:text-neutral-300',
      'disabled:text-black',
      'dark:disabled:text-white',
      `disabled:opacity-0.5`,
      'disabled:pointer-events-none',
    ],
    navLink: [
      'text-black',
      'dark:text-white',
      'no-underline',
      'hover:text-neutral-900',
      'dark:hover:text-neutral-200',
      'active:text-neutral-700',
      'dark:active:text-neutral-300',
      'disabled:text-black',
      'dark:disabled:text-white',
      'disabled:opacity-0.5',
      'disabled:pointer-events-none',
    ],
  }

  return acc
}, {}) as VariantColorSchemes

const variantClassesInverted = Object.entries(variantsConfig).reduce((acc, [variant, hue]) => {
  const color = !hue ? palette.gray : palette[hue]

  acc[variant] = {
    bg: [`bg-neutral-50`, `dark:bg-neutral-900`],
    bgInteractive: [
      `hover:bg-neutral-100`,
      `dark:hover:bg-neutral-800`,
      `focus:bg-neutral-200`,
      `dark:focus:bg-neutral-700`,
      `active:bg-neutral-300`,
      `dark:active:bg-neutral-600`,
      `disabled:bg-neutral-50`,
      `dark:disabled:bg-neutral-900`,
      'disabled:pointer-events-none',
    ],
    muted: [`bg-${color}-200`, `dark:bg-${color}-700`],
    mutedInteractive: [
      `hover:bg-neutral-300`,
      `dark:hover:bg-neutral-800`,
      `focus:bg-neutral-400`,
      `dark:focus:bg-neutral-700`,
      `active:bg-neutral-500`,
      `dark:active:bg-neutral-600`,
      `disabled:bg-neutral-200`,
      `dark:disabled:bg-neutral-700`,
      'disabled:pointer-events-none',
    ],
    border: [`border-${color}-600`, `dark:border-${color}-400`],
    foreground: [`bg-${color}-600`, `dark:bg-${color}-400`],
    text: [`text-${color}-600`, `dark:text-${color}-400`],
    link: [
      'text-white',
      'dark:text-black',
      'underline',
      'hover:text-neutral-200',
      'dark:hover:text-neutral-900',
      'active:text-neutral-300',
      'dark:active:text-neutral-700',
      'disabled:text-white',
      'dark:disabled:text-black',
      `disabled:opacity-0.5`,
      'disabled:pointer-events-none',
    ],
    navLink: [
      'text-black',
      'dark:text-white',
      'no-underline',
      'hover:text-neutral-900',
      'dark:hover:text-neutral-200',
      'active:text-neutral-700',
      'dark:active:text-neutral-300',
      'disabled:text-black',
      'dark:disabled:text-white',
      'disabled:opacity-0.5',
      'disabled:pointer-events-none',
    ],
  }

  return acc
}, {}) as VariantColorSchemes

const base = {
  bg: ['bg-neutral-50', 'dark:bg-neutral-900'],
  bgInteractive: [
    'bg-neutral-50',
    'dark:bg-neutral-900',
    'hover:bg-neutral-200',
    'dark:hover:bg-neutral-800',
    'active:bg-neutral-300',
    'dark:active:bg-neutral-700',
    'disabled:bg-neutral-200',
    'dark:disabled:bg-neutral-800',
    'disabled:pointer-events-none',
  ],
  muted: ['bg-neutral-200', 'dark:bg-neutral-200'],
  mutedInteractive: [
    'bg-neutral-200',
    'dark:bg-neutral-700',
    'hover:bg-neutral-300',
    'dark:hover:bg-neutral-600',
    'active:bg-neutral-400',
    'dark:active:bg-neutral-500',
    'disabled:bg-neutral-300',
    'dark:disabled:bg-neutral-600',
    'disabled:pointer-events-none',
  ],
  border: ['border-neutral-900/12'],
  foreground: ['text-neutral-900 dark:text-neutral-50'],
  text: ['text-neutral-900', 'dark:text-neutral-50'],
  link: [
    'text-primary-600',
    'dark:text-primary-400',
    'underline',
    'hover:text-primary-700',
    'dark:hover:text-primary-300',
    'active:text-primary-800',
    'dark:active:text-primary-200',
    'disabled:text-primary-600',
    'dark:disabled:text-primary-400',
    'disabled:opacity-0.5',
    'disabled:pointer-events-none',
  ],
  navLink: [
    'text-neutral-800',
    'dark:text-neutral-100',
    'no-underline',
    'hover:text-neutral-900',
    'dark:hover:text-neutral-200',
    'active:text-neutral-950',
    'dark:active:text-neutral-300',
    'disabled:text-neutral-800',
    'dark:disabled:text-neutral-100',
    'disabled:opacity-0.5',
    'disabled:pointer-events-none',
  ],
} as VariantColorScheme

export const variants = {
  ...variantClasses,
  inverted: variantClassesInverted,
}

export const colors = {
  ...palette,
}
