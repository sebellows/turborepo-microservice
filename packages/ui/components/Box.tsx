import { classNames } from '@trms/utils'

import { forwardRefAs } from '../shared/react.utils'
import { UIComponentProps, useUIProps } from '../styles/style.props'
import { ColorVariantKey } from '../theme/color.types'

export type UIThemeProps = {
  variant?: ColorVariantKey
}

export type BoxProps = {
  className?: string | undefined
} & UIComponentProps &
  UIThemeProps

export const Box = forwardRefAs<'div', BoxProps>((props, ref) => {
  const { as: Tag = 'div', children, className, variant = 'default', ...rest } = props
  const [uiProps, nonUIProps] = useUIProps(rest)
  const classes = classNames(uiProps, className)

  return <Tag data-ui="box" className={classes} ref={ref} {...nonUIProps} />
})
