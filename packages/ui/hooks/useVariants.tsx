import { useMemo } from 'react'
import { ColorVariantKey, ColorVariantKeys, variants } from '@trms/theme'

const isValidVariant = (variant: ColorVariantKey) => ColorVariantKeys.includes(variant)

export const useVariant = (
  initialVariant: ColorVariantKey,
  inverted?: boolean,
  deps: any[] = [],
) => {
  const variant = useMemo(() => {
    const variantKey = isValidVariant(initialVariant) ? initialVariant : 'default'
    const variant = inverted ? variants.inverted[variantKey] : variants[variantKey]

    return variant
  }, deps)

  return variant
}
