import { PropsWithChildren } from "react"
import { classNames } from '@trms/utils'

import { forwardRefAs, isBlockLevelTag } from "../shared"
import { useUIProps } from "../styles"

import { BoxProps } from './Box'

export type TextOverflowBlockProps = Pick<BoxProps, 'lineClamp' | 'textOverflow' | 'truncate'>

export const TextOverflowBlock = forwardRefAs<'span', PropsWithChildren<TextOverflowBlockProps>>(
  ({ as: Tag = 'span', children, className, ...props }, ref) => {
    const Component = props?.truncate && isBlockLevelTag(Tag) ? Tag : 'div'
    const [classes, nonUIProps] = useUIProps({ textOverflow: 'ellipsis', ...props })

    return (
      <Component ref={ref} className={classNames(classes, className)} {...nonUIProps}>
        {children}
      </Component>
    )
  },
)
