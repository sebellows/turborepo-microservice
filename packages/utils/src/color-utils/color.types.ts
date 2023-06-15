import Color from 'color'

export const COLOR_MODELS = [
  'ansi16',
  'ansi256',
  'apple',
  'cmyk',
  'gray',
  'hcg',
  'hex',
  'hsl',
  'hsv',
  'hwb',
  'keyword',
  'lab',
  'lch',
  'rgb',
  'xyz',
] as const

export type ColorModel = (typeof COLOR_MODELS)[number]

export type ColorConverters = Pick<Color, ColorModel>

function makeColorProvider<T extends ColorParam = ColorParam>(
  obj?: T,
  model?: ColorModel,
): Color<T> {
  return Color<T>(obj, model)
}

export type ColorProvider<T extends ColorParam = ColorParam> = typeof Color<T>
export type ColorProviderInstance<T extends ColorParam = ColorParam> = ReturnType<
  typeof makeColorProvider<T>
>

type ColorObject = ReturnType<typeof Color>

export type ColorParam = ColorObject | string | ArrayLike<number> | number | { [key: string]: any }

class VAlpha {
  readonly num: number

  get value(): number {
    return this.num
  }

  constructor(num: number) {
    if (num < 0 || num > 1) {
      throw new Error(`VAlpha number out of range. Require value between 0 and 1.`)
    }

    this.num = num
  }
}

export const alphaValue = (num: number) => new VAlpha(num).value

export type AlphaValue = ReturnType<typeof alphaValue>

type ColorProviderModule = typeof Color
export const ColorProviderModule: ColorProviderModule = Color
