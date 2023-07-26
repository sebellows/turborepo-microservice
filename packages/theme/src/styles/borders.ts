import { ColorBaseKeys, ColorPaletteKeys, ColorTintKeys, ColorVariantKeys } from '../types'
import { setPropertyMap, setUnitValuePropertyMap } from './style.utils'

const Radius = ['DEFAULT', 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const
const BorderWidth = ['DEFAULT', '0', '2', '4', '8'] as const
const BorderStyle = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] as const

const radius = setPropertyMap(Radius, 'rounded')
// const radiusS = setPropertyMap(Radius, 'rounded-s')
// const radiusE = setPropertyMap(Radius, 'rounded-e')
const radiusT = setPropertyMap(Radius, 'rounded-t')
const radiusR = setPropertyMap(Radius, 'rounded-r')
const radiusB = setPropertyMap(Radius, 'rounded-b')
const radiusL = setPropertyMap(Radius, 'rounded-l')
// const radiusSS = setPropertyMap(Radius, 'rounded-ss')
// const radiusSE = setPropertyMap(Radius, 'rounded-se')
// const radiusEE = setPropertyMap(Radius, 'rounded-ee')
// const radiusES = setPropertyMap(Radius, 'rounded-es')
// const radiusTL = setPropertyMap(Radius, 'rounded-tl')
// const radiusTR = setPropertyMap(Radius, 'rounded-tr')
// const radiusBR = setPropertyMap(Radius, 'rounded-br')
// const radiusBL = setPropertyMap(Radius, 'rounded-bl')

const border = setPropertyMap(BorderWidth, 'border')
const borderX = setPropertyMap(BorderWidth, 'border-x')
const borderS = setPropertyMap(BorderWidth, 'border-s')
const borderE = setPropertyMap(BorderWidth, 'border-e')
const borderT = setPropertyMap(BorderWidth, 'border-t')
const borderR = setPropertyMap(BorderWidth, 'border-r')
const borderB = setPropertyMap(BorderWidth, 'border-b')
const borderL = setPropertyMap(BorderWidth, 'border-l')

const borderStyle = setPropertyMap(BorderStyle, 'border')

const borderColor = {
  ...setPropertyMap(ColorBaseKeys, 'border'),
  ...setUnitValuePropertyMap(ColorPaletteKeys, ColorTintKeys, 'border'),
  ...setUnitValuePropertyMap(ColorVariantKeys, ColorTintKeys, 'border'),
}

export const borders = {
  radius,
  radiusT,
  radiusR,
  radiusB,
  radiusL,

  border,
  borderX,
  borderS,
  borderE,
  borderT,
  borderR,
  borderB,
  borderL,

  borderColor,
  borderStyle,
}
