import { ColorVariantKey, ColorPaletteKey } from './types/color.types'

type VariantsConfig = Record<ColorVariantKey, ColorPaletteKey>
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
  'borderInteractive',
  'link',
  'text',
  'fg',
  'fgInteractive',
  'cta',
] as const
export type VariantColorSchemeKey = (typeof VariantColorSchemeKeys)[number]
export type VariantColorScheme = Record<VariantColorSchemeKey, string[]>
export type VariantColorSchemes = Record<ColorVariantKey, VariantColorScheme>

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
  border: ['border-neutral-950/12'],
  fg: ['text-neutral-900', 'dark:text-neutral-50'],
  fgInteractive: [
    'text-neutral-900',
    'hover:text-neutral-800',
    'active:text-neutral-800',
    'disabled:text-neutral-900',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-neutral-50',
    'dark:hover:text-neutral-200',
    'dark:active:text-neutral-200',
    'dark:disabled:text-neutral-50',
  ],
  text: ['text-neutral-900', 'dark:text-neutral-50'],
  link: [
    'text-black',
    'hover:text-neutral-800',
    'active:text-neutral-800',
    'disabled:text-black',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-white',
    'dark:hover:text-neutral-200',
    'dark:active:text-neutral-200',
    'dark:disabled:text-white',
  ],
  cta: [
    'text-black',
    'border-0',
    'border-b-2',
    'border-current',
    'border-solid',
    'hover:text-neutral-800',
    'active:text-neutral-800',
    'disabled:text-black',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-white',
    'dark:hover:text-neutral-200',
    'dark:active:text-neutral-200',
    'dark:disabled:text-white',
  ],
} as VariantColorScheme

const baseInverted = {
  bg: ['bg-neutral-900', 'dark:bg-neutral-50'],
  bgInteractive: [
    'bg-neutral-900',
    'hover:bg-neutral-950',
    'active:bg-neutral-950',
    'disabled:bg-neutral-900',
    'disabled:pointer-events-none',
    'dark:bg-neutral-50',
    'dark:hover:bg-neutral-200',
    'dark:active:bg-neutral-200',
    'dark:disabled:bg-neutral-50',
  ],
  muted: ['bg-neutral-800', 'dark:bg-neutral-200'],
  mutedInteractive: [
    'bg-neutral-800',
    'hover:bg-neutral-900',
    'active:bg-neutral-900',
    'disabled:bg-neutral-800',
    'disabled:pointer-events-none',
    'dark:bg-neutral-200',
    'dark:hover:bg-neutral-300',
    'dark:active:bg-neutral-300',
    'dark:disabled:bg-neutral-200',
  ],
  border: ['border-neutral-950/12'],
  borderInteractive: [
    'border-neutral-950/12',
    `hover:border-neutral-950/20`,
    `active:border-neutral-950/20`,
    `disabled:border-neutral-950/30`,
    'disabled:pointer-events-none',
    `dark:border-neutral-50/12`,
    `dark:hover:border-neutral-50/20`,
    `dark:active:border-neutral-50/20`,
    `dark:disabled:border-neutral-50/30`,
  ],
  fg: ['text-neutral-50', 'dark:text-neutral-900'],
  fgInteractive: [
    'text-neutral-50',
    'hover:text-neutral-200',
    'active:text-neutral-200',
    'disabled:text-neutral-95000',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-neutral-900',
    'dark:hover:text-neutral-950',
    'dark:active:text-neutral-950',
    'dark:disabled:text-neutral-900',
  ],
  text: ['text-neutral-50', 'dark:text-neutral-900'],
  link: [
    'text-white',
    'hover:text-neutral-200',
    'active:text-neutral-200',
    'disabled:text-white',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-black',
    'dark:hover:text-neutral-800',
    'dark:active:text-neutral-800',
    'dark:disabled:text-black',
  ],
  cta: [
    'text-white',
    'hover:text-neutral-200',
    'active:text-neutral-200',
    'disabled:text-white',
    'border-0',
    'border-b-2',
    'border-current',
    'border-solid',
    `disabled:opacity-0.5`,
    'disabled:pointer-events-none',
    'dark:text-black',
    'dark:hover:text-neutral-800',
    'dark:active:text-neutral-800',
    'dark:disabled:text-black',
  ],
} as VariantColorScheme

const variantClasses = Object.entries(variantsConfig).reduce((acc, [variant, hue]) => {
  const color = hue

  if (variant === 'default' || variant === 'neutral') {
    acc[variant] = base
  } else {
    acc[`${variant}`] = {
      bg: [`bg-${color}-500`, `dark:bg-${color}-400`],
      bgInteractive: [
        `bg-${color}-500`,
        `hover:bg-${color}-600`,
        `active:bg-${color}-700`,
        `disabled:bg-${color}-500`,
        'disabled:pointer-events-none',
        `dark:bg-${color}-400`,
        `dark:hover:bg-${color}-500`,
        `dark:active:bg-${color}-600`,
        `dark:disabled:bg-${color}-400`,
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
      border: [`border-${color}-500`, `dark:border-${color}-400`],
      borderInteractive: [
        `border-${color}-500`,
        `hover:border-${color}-700`,
        `active:border-${color}-700`,
        `disabled:border-${color}-500`,
        'disabled:pointer-events-none',
        `dark:border-${color}-400`,
        `dark:hover:border-${color}-600`,
        `dark:active:border-${color}-600`,
        `dark:disabled:border-${color}-400`,
      ],
      fg: [`text-${color}-500`, `dark:text-${color}-400`],
      fgInteractive: [
        `text-${color}-500`,
        `hover:text-${color}-700`,
        `active:text-${color}-700`,
        `disabled:text-${color}-500`,
        'disabled:pointer-events-none',
        `dark:text-${color}-400`,
        `dark:hover:text-${color}-600`,
        `dark:active:text-${color}-600`,
        `dark:disabled:text-${color}-400`,
      ],
      text: base.text,
      link: base.link,
      cta: base.cta,
    }
  }

  return acc
}, {}) as VariantColorSchemes

const variantClassesInverted = Object.entries(variantsConfig).reduce((acc, [variant, hue]) => {
  const color = hue
  if (variant === 'default' || variant === 'neutral') {
    acc[variant] = baseInverted
  } else {
    acc[variant] = {
      bg: [`bg-neutral-900`, `dark:bg-neutral-50`],
      bgInteractive: [
        `hover:bg-neutral-800`,
        `dark:hover:bg-neutral-100`,
        `focus:bg-neutral-700`,
        `dark:focus:bg-neutral-200`,
        `active:bg-neutral-600`,
        `dark:active:bg-neutral-300`,
        `disabled:bg-neutral-900`,
        `dark:disabled:bg-neutral-50`,
        'disabled:pointer-events-none',
      ],
      muted: [`bg-${color}-700`, `dark:bg-${color}-200`],
      mutedInteractive: [
        `hover:bg-${color}-800`,
        `dark:hover:bg-${color}-300`,
        `focus:bg-${color}-700`,
        `dark:focus:bg-${color}-400`,
        `active:bg-${color}-600`,
        `dark:active:bg-${color}-500`,
        `disabled:bg-${color}-700`,
        `dark:disabled:bg-${color}-200`,
        'disabled:pointer-events-none',
      ],
      border: [`border-${color}-400`, `dark:border-${color}-500`],
      borderInteractive: [
        `border-${color}-400`,
        `hover:border-${color}-600`,
        `active:border-${color}-600`,
        `disabled:border-${color}-400`,
        'disabled:pointer-events-none',
        `dark:border-${color}-500`,
        `dark:hover:border-${color}-700`,
        `dark:active:border-${color}-700`,
        `dark:disabled:border-${color}-500`,
      ],
      fg: [`bg-${color}-400`, `dark:bg-${color}-500`],
      fgInteractive: [
        `text-${color}-400`,
        `hover:text-${color}-600`,
        `active:text-${color}-600`,
        `disabled:text-${color}-400`,
        'disabled:pointer-events-none',
        `dark:text-${color}-500`,
        `dark:hover:text-${color}-700`,
        `dark:active:text-${color}-700`,
        `dark:disabled:text-${color}-500`,
      ],
      text: [`text-neutral-50`, `dark:text-neutral-900`],
      link: [
        'text-white',
        'hover:text-neutral-200',
        'active:text-neutral-200',
        'disabled:text-white',
        `disabled:opacity-0.5`,
        'disabled:pointer-events-none',
        'dark:text-black',
        'dark:hover:text-neutral-800',
        'dark:active:text-neutral-800',
        'dark:disabled:text-black',
      ],
      cta: [
        'text-white',
        'border-0',
        'border-b-2',
        'border-current',
        'border-solid',
        'hover:text-neutral-200',
        'active:text-neutral-200',
        'disabled:text-white',
        `disabled:opacity-0.5`,
        'disabled:pointer-events-none',
        'dark:text-black',
        'dark:hover:text-neutral-800',
        'dark:active:text-neutral-800',
        'dark:disabled:text-black',
      ],
    }
  }

  return acc
}, {}) as VariantColorSchemes

export const variants = {
  ...variantClasses,
  inverted: variantClassesInverted,
}
