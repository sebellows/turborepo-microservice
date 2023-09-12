import {
  extractUnit,
  isUnit,
  negateUiValue,
  setColorPropertyMap,
  setPropertyMap,
  setUnitValuePropertyMap,
} from './style.utils'

describe('isUnit', () => {
  it('will return TRUE if a given value is in "px" units', () => {
    const isPx = isUnit('5px')
    expect(isPx).toBeTruthy()
  })

  it('will return TRUE if a given value is a percentage ("%")', () => {
    const isPercentage = isUnit('35%')
    expect(isPercentage).toBeTruthy()
  })

  it('will return FALSE if a given value is only a numeric value', () => {
    const isUnitValue = isUnit('100')
    expect(isUnitValue).toBeFalsy()
  })
})

describe('extractUnit', () => {
  it('will return the unit type from a given value', () => {
    const unit = extractUnit('5px')
    expect(unit).toStrictEqual('px')
  })

  it('will return an empty string if the value is not in units', () => {
    const unit = extractUnit('hello')
    expect(unit).toStrictEqual('')
  })
})

describe('negateUiValue', () => {
  it('will convert a positive value into a negative', () => {
    const unit = negateUiValue('50')
    expect(unit).toStrictEqual('-50')
  })

  it('will not covert a value that is already negative, but return as is', () => {
    const unit = negateUiValue('-22')
    expect(unit).toStrictEqual('-22')
  })

  it('will not covert a value that is "0" or a floating point starting with "0", but return as is', () => {
    const unit = negateUiValue('0.35')
    expect(unit).toStrictEqual('0.35')
  })

  it('will not covert each value in a breakpoint object into a negative', () => {
    const unit = negateUiValue({ xs: '4', sm: '8' })
    expect(unit).toEqual({ xs: '-4', sm: '-8' })
  })
})

describe('setPropertyMap', () => {
  it('will generate a value->className map object', () => {
    const map = setPropertyMap(['1', '2', '3'], 'm')
    expect(map).toEqual({ '1': 'm-1', '2': 'm-2', '3': 'm-3' })
  })

  it('will allow a replacement object for conditions where naming strays from the norm', () => {
    const map = setPropertyMap(['1', '2', '3', 'auto'], 'col-span', { auto: 'col' })
    expect(map).toEqual({
      '1': 'col-span-1',
      '2': 'col-span-2',
      '3': 'col-span-3',
      auto: 'col-auto',
    })
  })
})

describe('setUnitValuePropertyMap', () => {
  it('will generate a className map object for multiple class prefixes using the same values', () => {
    const map = setUnitValuePropertyMap(['m', 'mx'], ['1', '2', '3'])
    expect(map).toEqual({
      m: { '1': 'm-1', '2': 'm-2', '3': 'm-3' },
      mx: { '1': 'mx-1', '2': 'mx-2', '3': 'mx-3' },
    })
  })
})

describe('setColorPropertyMap', () => {
  it('will generate a tailwind className map object using dot-syntax of color and tint as keys', () => {
    const map = setColorPropertyMap(['blue', 'orange'], ['100', '200', '300'], 'color')
    expect(map).toEqual({
      'blue.100': 'color-blue-100',
      'blue.200': 'color-blue-200',
      'blue.300': 'color-blue-300',
      'orange.100': 'color-orange-100',
      'orange.200': 'color-orange-200',
      'orange.300': 'color-orange-300',
    })
  })
})
