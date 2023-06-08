export const Breakpoints = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type Breakpoint = (typeof Breakpoints)[number]

const camelCase = (str: string) =>
  str.split('-').reduce((acc, part, i) => {
    if (i > 0) {
      part = part.charAt(0).toUpperCase() + part.slice(1)
    }
    acc += part
    return acc
  }, '')

const setPropertyMap = <TArray extends readonly string[], TPrefix extends string = string>(
  arr: TArray,
  classPrefix: TPrefix,
) => {
  return arr.reduce((klass, value) => {
    const key = value.includes('-') ? camelCase(value) : value
    klass[`${key}`] = `${classPrefix}-${value}`
    return klass
  }, {} as Record<TArray[number], `${TPrefix}-${TArray[number]}`>)
}

export type WithBreakpoint<T> = Record<Breakpoint, T>

export const SpacingValues = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
] as const
export type SpacingNumber = (typeof SpacingValues)[number]

export const SpacingClasses = [
  'gap',
  'gapX',
  'gapY',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'me',
  'ms',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'pe',
  'ps',
  'px',
  'py',
  'inset',
  'insetX',
  'insetY',
  'spaceX',
  'spaceY',
  'start',
  'end',
  'top',
  'right',
  'bottom',
  'left',
] as const
export type SpacingClass = (typeof SpacingClasses)[number]

/**
 * Can be either: `8` | `{ md: 8, lg: 12 }`
 */
export type SpacingValue = string | SpacingNumber | WithBreakpoint<SpacingNumber>

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { mb: 8, mt: { sm: 8, lg: 16 }, p: 4 }
 */
export type SpacingProps = Record<SpacingClass, SpacingValue>

export const RelativeSpacingValues = [
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
  '1/6',
  '2/6',
  '3/6',
  '4/6',
  '5/6',
  '1/12',
  '2/12',
  '3/12',
  '4/12',
  '5/12',
  '6/12',
  '7/12',
  '8/12',
  '9/12',
  '10/12',
  '11/12',
  'full',
  'screen',
  'min',
  'max',
  'fit',
] as const
export type RelativeSpacingValue = (typeof RelativeSpacingValues)[number]

export const Dimensions = ['w', 'minW', 'maxW', 'h', 'minH', 'maxH'] as const
export type DimensionClass = (typeof Dimensions)[number]
export type DimensionValue =
  | number
  | string
  | SpacingNumber
  | RelativeSpacingValue
  | WithBreakpoint<SpacingNumber | RelativeSpacingValue>

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { w: '5/12', h: { sm: 'max', lg: 'min' }, minW: 96 }
 */
export type DimensionProps = Record<DimensionClass, DimensionValue>

/**************************************************
 * LAYOUT
 **************************************************/

const DisplayValues = [
  'block',
  'inline-block',
  'inline',
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
  'hidden',
  'table',
  'inline-table',
] as const
const Positions = ['absolute', 'fixed', 'relative', 'static', 'sticky'] as const

/**************************************************
 * FLEXBOX & GRID
 **************************************************/

export const Range6 = ['1', '2', '3', '4', '5', '6'] as const
export const Range10 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const
export const Range12 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const

export const LayoutRows = [...Range6, 'none'] as const
export type LayoutRow = (typeof LayoutRows)[number]

export const LayoutRowSpans = [...Range6, 'auto', 'full'] as const
export type LayoutRowSpan = (typeof LayoutRowSpans)[number]

export const LayoutRowPositions = [...Range6, '7', 'auto'] as const
export type LayoutRowPosition = (typeof LayoutRowPositions)[number]

export const LayoutCols = [...Range12, 'none'] as const
export type LayoutCol = (typeof LayoutCols)[number]

export const LayoutColSpans = [...Range12, 'auto', 'full'] as const
export type LayoutColSpan = (typeof LayoutColSpans)[number]

export const LayoutColPositions = [...Range12, '13', 'auto'] as const
export type LayoutColPosition = (typeof LayoutColPositions)[number]

export const OrderValues = [...Range12, 'first', 'last', 'none'] as const
export type OrderValue = (typeof OrderValues)[number]

const _BaseAlignments = ['start', 'end', 'center'] as const
const _DispersedAlignments = ['between', 'around', 'evenly'] as const

const JustifyAlignments = [..._BaseAlignments, 'stretch'] as const
const ItemAlignments = [..._BaseAlignments, 'stretch', 'baseline'] as const
const ContentAlignments = [..._BaseAlignments, ..._DispersedAlignments, 'none'] as const
const FlexValues = ['1', 'auto', 'initial', 'none'] as const
const FlexDirections = ['row', 'row-reverse', 'col', 'col-reverse'] as const
const FlexWrap = ['wrap', 'wrap-reverse', 'nowrap'] as const
const PlaceContent = [...ItemAlignments, ..._DispersedAlignments] as const
const PlaceSelf = [..._BaseAlignments, 'auto', 'stretch'] as const

/**************************************************
 * TYPOGRAPHY
 **************************************************/

const FontSizes = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
  'display1', // custom
  'display2', // custom
] as const
const FontWeights = [
  'thin',
  'extralight',
  'light',
  'normal',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
]
const Tracking = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
const Leading = [
  ...Range10,
  'none', // 1
  'tight', // 1.25
  'snug', // 1.375
  'normal', // 1.5
  'relaxed', // 1.625
  'loose', // 2
]
const TextAlignments = ['left', 'right', 'center', 'justify', 'start', 'end'] as const

const display = setPropertyMap(DisplayValues, '')
const position = setPropertyMap(Positions, '')

const fontFamily = setPropertyMap(['sans', 'serif', 'mono'], 'font')
const fontSizes = setPropertyMap(FontSizes, 'text')
const fontStyle = {
  italic: 'italic',
  regular: 'not-italic',
}
const fontWeight = setPropertyMap(FontWeights, 'font')
const leading = setPropertyMap(Leading, 'leading')
const tracking = setPropertyMap(Tracking, 'tracking')
const lineClamp = setPropertyMap(LayoutRows, 'line-clamp')
const listPosition = {
  inside: 'list-inside',
  outside: 'list-outside',
}
const listStyle = setPropertyMap(['none', 'disc', 'decimal'], 'list')
const textAlign = setPropertyMap(TextAlignments, 'text')

const alignItems = setPropertyMap(ItemAlignments, 'items')
const flexContent = setPropertyMap(ContentAlignments, 'content')
const justify = setPropertyMap(JustifyAlignments, 'justify-items')
const flex = setPropertyMap(FlexValues, 'flex')
const flexDirection = setPropertyMap(FlexDirections, 'flex')
const flexWrap = setPropertyMap(FlexWrap, 'flex')
const alignSelf = setPropertyMap(ItemAlignments, 'self')
const placeContent = setPropertyMap(PlaceContent, 'place-content')
const placeItems = setPropertyMap(ItemAlignments, 'place-items')
const placeSelf = setPropertyMap(PlaceSelf, 'place-self')
const grow = {
  grow: 'grow',
  zero: 'grow-0',
}
const shrink = {
  grow: 'shrink',
  zero: 'shrink-0',
}

const order = setPropertyMap(OrderValues, 'order')
const gridCol = setPropertyMap(LayoutCols, 'grid-cols')
const gridRow = setPropertyMap(LayoutRows, 'grid-rows')
const colSpan = setPropertyMap(LayoutColSpans, 'col-span')
const colStart = setPropertyMap(LayoutColPositions, 'col-start')
const colEnd = setPropertyMap(LayoutColPositions, 'col-end')
const rowSpan = setPropertyMap(LayoutRowSpans, 'row-span')
const rowStart = setPropertyMap(LayoutRowPositions, 'row-start')
const rowEnd = setPropertyMap(LayoutRowPositions, 'row-end')

export const tailwind = {
  display,
  position,
  alignItems,
  alignSelf,
  flexContent,
  justify,
  flex,
  flexDirection,
  flexWrap,
  grow,
  shrink,
  order,
  gridCol,
  gridRow,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
}
