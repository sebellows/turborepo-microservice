import { boxShadow, breakpoints, fontFamily, fontSize, zIndex } from './styles'
import { colors } from './colors'

export * from './styles'
export { useVariant } from './useVariants'

export const theme = {
  boxShadow,
  breakpoints,
  colors,
  extend: {
    fontFamily,
    fontSize,
    opacity: {
      '12': '0.125',
    },
    zIndex,
  },
}
