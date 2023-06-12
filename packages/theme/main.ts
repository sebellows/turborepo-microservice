import { boxShadow, breakpoints, fontFamily, fontSize, zIndex } from './styles'
import { colors } from './color.schemes'

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
