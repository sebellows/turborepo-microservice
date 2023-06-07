import { Type } from '../types'
import {
  COLOR_MODELS,
  ColorConverters,
  ColorModel,
  ColorParam,
  ColorProvider,
  ColorProviderInstance,
  ColorProviderModule,
} from './color.types'

function makeColor<T extends ColorParam = ColorParam>(obj?: T, model?: ColorModel) {
  return new ColorService(obj, model)
}
export type ColorServiceInstance<T extends ColorParam> = ReturnType<typeof makeColor<T>>

export function defineConverters(context: Type<ColorService>) {
  const converters = Object.keys(COLOR_MODELS).reduce((models, model) => {
    models[model] = context.color[model]

    return models
  }, {}) as ColorConverters

  Object.defineProperty(context, 'to', { get: () => converters })
}

let converters: ColorConverters
;(function applyConverters() {
  converters = Object.keys(COLOR_MODELS).reduce((models, model) => {
    models[model] = ColorProviderModule[model]

    return models
  }, {}) as ColorConverters
})()

export class ColorService<T extends ColorParam = ColorParam> {
  static Provider: ColorProvider = ColorProviderModule

  readonly color: ColorProviderInstance<T>
  private _model?: ColorModel

  get model() {
    const colorModel = (this.color as ColorProviderInstance<T> & { model: ColorModel }).model
    return colorModel || this._model
  }

  readonly to = converters

  constructor(obj?: T, model?: ColorModel) {
    this.color = ColorService.Provider(obj, model)

    if (model && !COLOR_MODELS.some(c => c === model)) {
      throw new Error('Unknown model: ' + model)
    }

    this._model = model
  }

  static isValidColor(color: string) {
    const el = document.createElement('div')
    el.style.backgroundColor = color
    return el.style.backgroundColor ? true : false
  }

  // to(model: ColorModel, ...color: number[]): ColorService
  // to(model: ColorModel, color: T): ColorService
  // to(model: ColorModel, color: any): ColorService {
  //   if (Array.isArray(color)) {
  //     const val = this.color[model](...color)
  //     return new ColorService(val)
  //   }

  //   return new ColorService(this.color[model](color))
  // }

  toString(places?: number): string {
    return places ? this.color.string(places) : this.color.toString()
  }

  toJSON(): string {
    // return this.color.toJSON()
    return JSON.stringify(this.color[this.model]())
  }

  toPercentageString(places?: number): string {
    return this.color.percentString(places)
  }

  toArray(): number[] {
    return this.color.array()
  }

  toObject(): { alpha?: number | undefined } & { [key: string]: number } {
    return this.color.object()
  }

  getUnitsAsArray(): number[] {
    return this.color.unitArray()
  }

  getUnitsAsObject(): { r: number; g: number; b: number; alpha?: number | undefined } {
    return this.color.unitObject()
  }

  round(places?: number): ColorService<ColorProviderInstance<ColorParam>> {
    return makeColor(this.color.round(places))
  }

  alpha<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.alpha(val)) : this.color.alpha()
  }

  red<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.red(val)) : this.color.red()
  }

  green<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.green(val)) : this.color.green()
  }

  blue<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.blue(val)) : this.color.blue()
  }

  hue<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.hue(val)) : this.color.hue()
  }

  saturationl<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.saturationl(val)) : this.color.saturationl()
  }

  lightness<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.lightness(val)) : this.color.lightness()
  }

  saturationv<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.saturationv(val)) : this.color.saturationv()
  }

  value<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.value(val)) : this.color.value()
  }

  chroma<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.chroma(val)) : this.color.chroma()
  }

  gray<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.gray(val)) : this.color.gray()
  }

  white<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.white(val)) : this.color.white()
  }

  wblack<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.wblack(val)) : this.color.wblack()
  }

  cyan<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.cyan(val)) : this.color.cyan()
  }

  magenta<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.magenta(val)) : this.color.magenta()
  }

  yellow<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.yellow(val)) : this.color.yellow()
  }

  black<V extends number | undefined>(
    val?: V,
  ): number | ColorService<ColorProviderInstance<ColorParam>> {
    return val ? makeColor(this.color.black(val)) : this.color.black()
  }

  keyword<V extends string>(val?: V): string | ColorService<ColorProviderInstance<V>> {
    return val ? makeColor(this.color.keyword(val)) : this.color.keyword()
  }

  hex<V extends string>(val: V): string | ColorService<ColorProviderInstance<V>> {
    return val ? makeColor(this.color.hex(val)) : this.color.hex()
  }

  hexa<V extends string>(val: V): string | ColorService<ColorProviderInstance<V>> {
    return val ? makeColor(this.color.hexa(val)) : this.color.hexa()
  }

  /**
   * Get the rgb number value.
   *
   * @example
   * let lilac = Color('#a74dd7')
   * let rgbNums = lilac.rgbNumber() // output: 10964439
   */
  rgbNumber(): number {
    return this.color.rgbNumber()
  }

  luminosity(): number {
    return this.color.luminosity()
  }

  contrast(color2: ColorProviderInstance): number {
    return this.color.contrast(color2)
  }

  level(color2: ColorProviderInstance): 'AAA' | 'AA' | '' {
    return this.color.level(color2)
  }

  isDark(): boolean {
    return this.color.isDark()
  }

  isLight(): boolean {
    return this.color.isLight()
  }

  negate(): ColorProviderInstance {
    return this.color.negate()
  }

  lighten(ratio: number): ColorProviderInstance {
    return this.color.lighten(ratio)
  }

  darken(ratio: number): ColorProviderInstance {
    return this.color.darken(ratio)
  }

  saturate(ratio: number): ColorProviderInstance {
    return this.color.saturate(ratio)
  }

  desaturate(ratio: number): ColorProviderInstance {
    return this.color.desaturate(ratio)
  }

  whiten(ratio: number): ColorProviderInstance {
    return this.color.whiten(ratio)
  }

  blacken(ratio: number): ColorProviderInstance {
    return this.color.blacken(ratio)
  }

  grayscale(): ColorProviderInstance {
    return this.color.grayscale()
  }

  fade(ratio: number): ColorProviderInstance {
    return this.color.fade(ratio)
  }

  opaquer(ratio: number): ColorProviderInstance {
    return this.color.opaquer(ratio)
  }

  rotate(degrees: number): ColorProviderInstance {
    return this.color.rotate(degrees)
  }

  mix(mixinColor: ColorProviderInstance, weight?: number): ColorProviderInstance {
    return this.color.mix(mixinColor, weight)
  }
}

export const Color = makeColor
