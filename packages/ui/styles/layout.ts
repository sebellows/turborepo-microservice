import { SpacingValues } from './spacing'
import { setPropertyMap, setUnitValuePropertyMap } from './style.utils'

export const DisplayValues = [
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

export const Positions = ['absolute', 'fixed', 'relative', 'static', 'sticky'] as const

export const Placement = [
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

export const PlacementValues = [
  ...SpacingValues,
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  'full',
  'auto',
] as const

const display = setPropertyMap(DisplayValues)
const position = setPropertyMap(Positions)
const placement = setUnitValuePropertyMap(Placement, PlacementValues)

export const layout = {
  ...display,
  ...position,
  ...placement,
}
