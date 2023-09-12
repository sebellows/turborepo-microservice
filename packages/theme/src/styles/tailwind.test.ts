import { propsToTwClasses } from './tailwind'

describe('propsToTwClasses', () => {
  it('generates an array of Tailwind CSS classes from a prop whose value is a breakpoint object', () => {
    const klasses = propsToTwClasses({ cols: { xs: '1', md: '3' } })
    expect(klasses).toStrictEqual(['xs:grid-cols-1', 'md:grid-cols-3'])
  })

  it('generates an array of classes from props', () => {
    const klasses = propsToTwClasses({
      display: 'flex',
      justify: 'center',
      alignItems: 'center',
      grow: '1',
    })
    expect(klasses).toEqual(['flex', 'justify-center', 'items-center', 'grow'])
  })

  it('generates an array of color-based classes from props', () => {
    const klasses = propsToTwClasses({
      bg: 'primary.500',
      textColor: 'gray.100',
    })
    expect(klasses).toEqual(['bg-primary-500', 'text-gray-100'])
  })
})
