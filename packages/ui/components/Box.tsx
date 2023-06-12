import { classNames } from '@trms/utils'
import { ColorVariantKey } from '@trms/theme'

import { forwardRefAs } from '../shared'
import { UIComponentProps } from '../styles'
import { useTW } from '../hooks'

export type UIThemeProps = {
  variant?: ColorVariantKey
}

export type BoxProps = {
  className?: string | undefined
  excludeProps?: string[]
} & UIComponentProps &
  UIThemeProps

export const Box = forwardRefAs<'div', BoxProps>((props, ref) => {
  const { as: Tag = 'div', children, className, excludeProps = [], variant = 'default', ...rest } = props
  const [uiProps, nonUIProps] = useTW(rest, excludeProps)
  const classes = classNames(uiProps, className)

  return <Tag data-ui="box" className={classes} ref={ref} {...nonUIProps} />
})
