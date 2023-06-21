import { classNames } from '@trms/utils'
import { ColorVariantKey, UIComponentProps } from '@trms/theme'

import { forwardRefAs } from '../shared'
import { useTW } from '../hooks'

export type UIThemeProps = {
  interactive?: boolean
  inverted?: boolean
  muted?: boolean
  variant?: ColorVariantKey
}

export type BoxProps = {
  className?: string | undefined
  excludeProps?: string[]
  role?: string
  type?: string
} & UIComponentProps &
  UIThemeProps

export const Box = forwardRefAs<'div', BoxProps>((props, ref) => {
  const {
    as: Tag = "div",
    className,
    excludeProps = ["muted", 'interactive', 'inverted', 'variant'],
    ...rest
  } = props;
  const [uiProps, nonUIProps] = useTW(rest, excludeProps)

  return (
    <Tag
      data-ui="box"
      className={classNames(uiProps, className)}
      ref={ref}
      {...nonUIProps}
    />
  )
})
