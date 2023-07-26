export const ColorBaseKeys = ['inherit', 'current', 'transparent', 'black', 'white'] as const
export const ColorTintKeys = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const
export type ColorTintKey = (typeof ColorTintKeys)[number]

export type ColorTints = {
  [key in ColorTintKey]: string
}

export const ColorPaletteKeys = [
  'blue',
  'cyan',
  'gray',
  'green',
  'indigo',
  'magenta',
  'orange',
  'purple',
  'red',
  'teal',
  'yellow',
] as const
export type ColorPaletteKey = (typeof ColorPaletteKeys)[number]

export const ColorVariantKeys = [
  'danger',
  'default', // NOTE: just an alias for "neutral"
  'info',
  'neutral',
  'primary',
  'secondary',
  'success',
  'warning',
] as const
export type ColorVariantKey = (typeof ColorVariantKeys)[number]
