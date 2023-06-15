import { classNames } from '@trms/utils'
import { ColorVariantKey, UIComponentProps } from '@trms/theme'

import { forwardRefAs } from '../shared'
import { useTW, useVariant } from '../hooks'

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
  const { as: Tag = 'div', children, className, excludeProps = ['muted'], muted, interactive, inverted, variant, ...rest } = props
  const [uiProps, nonUIProps] = useTW(rest, excludeProps)
  const variantScheme = useVariant(variant)
  let variantClasses: string[] = []
  if (muted) {
    if (interactive) {
      variantClasses = variantScheme?.mutedInteractive ?? []
    } else {
      variantClasses = variantScheme?.muted ?? []
    }
  } 

  return (
    <Tag
      data-ui="box"
      className={classNames(uiProps, variantClasses, className)}
      ref={ref}
      {...nonUIProps}
    >
      {children}
    </Tag>
  )
})
