import { PropsWithChildren } from "react";
import { pick } from '@trms/utils'

import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";
import { TextOverflowBlock } from "./TextOverflowBlock";

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = BoxProps

const overflowPropKeys = ['lineClamp', 'textOverflow', 'truncate']

export const Heading = forwardRefAs<HeadingLevel, PropsWithChildren<HeadingProps>>(
  ({ as: Tag = 'h1', children: childrenProp, ...props }, ref) => {
    let children = childrenProp

    if (props?.textOverflow || props?.truncate || props?.lineClamp) {
      const overflowProps = pick(props, 'lineClamp', 'textOverflow', 'truncate')
      children = <TextOverflowBlock {...overflowProps}>{children}</TextOverflowBlock>
    }

    return (
      <Box as={Tag} excludeProps={overflowPropKeys} ref={ref} {...props}>
        {children}
      </Box>
    )
  },
)
