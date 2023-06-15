export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

export type ColorTints = {
  [key in ColorTintKey]: string
}

export type ColorPaletteKey =
  | 'blue'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'magenta'
  | 'orange'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'

export const ColorVariantKeys = [
  'danger',
  'default', // actually, this will just be "neutral"
  'info',
  'neutral',
  'primary',
  'secondary',
  'success',
  'warning',
] as const
export type ColorVariantKey = (typeof ColorVariantKeys)[number]
