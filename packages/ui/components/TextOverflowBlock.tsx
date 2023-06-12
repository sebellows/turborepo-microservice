import { PropsWithChildren } from "react"
import { classNames } from '@trms/utils'

import { useTW } from '../hooks'
import { forwardRefAs, isBlockLevelTag } from "../shared"

import { BoxProps } from './Box'

export type TextOverflowBlockProps = Pick<BoxProps, 'lineClamp' | 'textOverflow' | 'truncate'>

export const TextOverflowBlock = forwardRefAs<'span', PropsWithChildren<TextOverflowBlockProps>>(
  ({ as: Tag = 'span', children, className, ...props }, ref) => {
    const Component = props?.truncate && isBlockLevelTag(Tag) ? Tag : 'div'
    const [classes, nonUIProps] = useTW({ textOverflow: 'ellipsis', ...props })

    return (
      <Component ref={ref} className={classNames(classes, className)} {...nonUIProps}>
        {children}
      </Component>
    )
  },
)
