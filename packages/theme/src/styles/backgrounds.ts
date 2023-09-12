import {
  ColorBaseKey,
  ColorBaseKeys,
  ColorPaletteKeys,
  ColorTintKeys,
  ColorVariantKeys,
} from '../types'
import { ColorValueClassMap, setColorPropertyMap, setPropertyMap } from './style.utils'

type BgPropertyMap = Record<ColorBaseKey, `bg-${ColorBaseKey}`> &
  ColorValueClassMap<typeof ColorPaletteKeys, typeof ColorTintKeys, 'bg'> &
  ColorValueClassMap<typeof ColorVariantKeys, typeof ColorTintKeys, 'bg'>

const bg: BgPropertyMap = {
  ...setPropertyMap(ColorBaseKeys, 'bg'),
  ...setColorPropertyMap(ColorPaletteKeys, ColorTintKeys, 'bg'),
  ...setColorPropertyMap(ColorVariantKeys, ColorTintKeys, 'bg'),
}

export const background = { bg }
