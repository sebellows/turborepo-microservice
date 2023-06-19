import { ColorVariantKey } from '@trms/theme'
import { pick } from '@trms/utils'

import { forwardRefAs } from '../shared'

import { Box, BoxProps } from './Box'
import { TextOverflowBlock } from './TextOverflowBlock'

export type TextProps = {
  muted?: boolean
  variant?: ColorVariantKey
} & BoxProps

export const Text = forwardRefAs<'p', TextProps>(
  (
    { as: Tag = 'p', children: childrenProp, ...props },
    ref,
  ) => {
    let children = childrenProp
    if (props?.textOverflow || props?.truncate || props?.lineClamp) {
      const overflowProps = pick(props, 'lineClamp', 'textOverflow', 'truncate')
      children = <TextOverflowBlock {...overflowProps}>{children}</TextOverflowBlock>
    }

    return <Box as={Tag} data-ui='text' ref={ref} {...props}>{children}</Box>
  },
)
