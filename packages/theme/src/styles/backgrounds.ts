import { ColorBaseKeys, ColorPaletteKeys, ColorTintKeys, ColorVariantKeys } from '../types'
import { setPropertyMap, setUnitValuePropertyMap } from './style.utils'

export const bg = {
  ...setPropertyMap(ColorBaseKeys, 'bg'),
  ...setUnitValuePropertyMap(ColorPaletteKeys, ColorTintKeys, 'bg'),
  ...setUnitValuePropertyMap(ColorVariantKeys, ColorTintKeys, 'bg'),
}
