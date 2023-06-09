import { memoize } from './collection'

/**
 * Camelize a hyphen-delimited string.
 */
const camelCaseRE = /-(\w)/g
export const camelCase = memoize((str: string): string =>
  str.replace(camelCaseRE, (_, c) => (c ? c.toUpperCase() : '')),
)

export const capitalize = memoize(
  (str: string): string => str.charAt(0).toUpperCase() + str.slice(1),
)

const kebabCaseRE = /\B([A-Z])/g
export const kebabCase = memoize((str: string): string =>
  str.replace(kebabCaseRE, '-$1').toLowerCase(),
)
