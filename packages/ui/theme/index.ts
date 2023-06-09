import { boxShadow, breakpoints, fontFamily, fontSize, zIndex } from './styles'
import { colors } from './colors'

module.exports = {
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
