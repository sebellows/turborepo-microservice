import { ColorVariantKey } from '@trms/theme'
import { classNames, pick } from '@trms/utils'

import { forwardRefAs } from '../shared'

import { Box, BoxProps } from './Box'
import { TextOverflowBlock } from './TextOverflowBlock'
import { useVariant } from '../hooks'

export type TextProps = {
  muted?: boolean
  variant?: ColorVariantKey
} & BoxProps

export const Text = forwardRefAs<'p', TextProps>(
  (
    {
      as: Tag = 'p',
      children: childrenProp,
      className,
      interactive,
      inverted,
      muted,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const [_variantScheme, variantClasses] = useVariant(variant, { muted, interactive, inverted, schemeKeys: ['text'] })

    let children = childrenProp
    if (props?.textOverflow || props?.truncate || props?.lineClamp) {
      const overflowProps = pick(props, 'lineClamp', 'textOverflow', 'truncate')
      children = <TextOverflowBlock {...overflowProps}>{children}</TextOverflowBlock>
    }

    return <Box as={Tag} data-ui='text' className={classNames(!props?.textColor && variantClasses, className)} ref={ref} {...props}>{children}</Box>
  },
)
