import { boxShadow, breakpoints, fontFamily, fontSize, zIndex } from './config'
import { palette } from './palette'

export const theme = {
  boxShadow,
  breakpoints,
  colors: {
    ...palette,
    neutral: palette.gray,
  },
  extend: {
    fontFamily,
    fontSize,
    opacity: {
      '12': '0.125',
    },
    zIndex,
  },
}
