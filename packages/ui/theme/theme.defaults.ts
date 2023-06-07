import { toEm, toRem } from '@trms/utils'

export const fontFamily = {
  display: [
    'Yeseva One',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
  ],
}

export const fontSize = {
  display1: [
    toRem(30),
    {
      lineHeight: toRem(36),
      letterSpacing: `-${toEm(0.6, 30)}`,
      weight: '400',
    },
  ],
  display2: [
    toRem(24),
    {
      lineHeight: toRem(32),
      letterSpacing: `-${toEm(0.3, 24)}`,
      weight: '400',
    },
  ],
}

export const breakpoints = {
  sm: '600px', // smallest tablet dimensions are 601x962/600x1024
  md: '960px',
  lg: '1440px',
  xl: '1920px',
}

export const zIndex = {
  100: '100', // Cards
  200: '200', // Inline dialogs (popover)
  300: '300', // Tooltip
  400: '400', // Modals
  500: '500', // Toasts (notifications)
}

export const spacing = {
  0: toRem(0),
  '2xs': toRem(2),
  xs: toRem(4),
  sm: toRem(8),
  md: toRem(12),
  lg: toRem(16),
  xl: toRem(24),
  '2xl': toRem(32),
  '3xl': toRem(48),
  '4xl': toRem(64),
  '5xl': toRem(96),
}
