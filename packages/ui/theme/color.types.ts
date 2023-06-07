export const BaseColorKeys = ['black', 'white', 'current', 'transparent'] as const
export type BaseColorKey = (typeof BaseColorKeys)[number]
export type BaseColors = Record<BaseColorKey, string>

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

export interface ColorPaletteBase {
  black: string
  white: string
}

export interface ColorPalette {
  blue: ColorTints
  cyan: ColorTints
  gray: ColorTints
  green: ColorTints
  indigo: ColorTints
  magenta: ColorTints
  orange: ColorTints
  purple: ColorTints
  red: ColorTints
  teal: ColorTints
  yellow: ColorTints
}
export type PaletteKey = keyof ColorPalette
// export type PaletteConfig = Record<string | PaletteKey, Record<string, string>>;

export const ColorVariantKeys = [
  'default', // actually, this will just be "neutral"
  'neutral',
  'info',
  'primary',
  'success',
  'warning',
  'danger',
] as const
export type ColorVariantKey = (typeof ColorVariantKeys)[number]
export type ColorVariants = Record<ColorVariantKey, ColorTints>
