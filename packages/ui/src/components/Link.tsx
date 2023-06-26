import { classNames } from '@trms/utils'

import { forwardRefAs } from '../shared'
import { useVariant } from '../hooks'
import { BoxProps } from './Box'

type LinkProps = { isCta?: boolean } & BoxProps

export const Link = forwardRefAs<'a', LinkProps>(
  ({ as: Tag = 'a', className, inverted, isCta = false, muted, variant = 'default', ...props }, ref) => {
    const [_variantScheme, variantClasses] = useVariant(variant, {
      inverted,
      muted,
      schemeKeys: ['cta', 'link'],
    })
    const classes = classNames(isCta ? variantClasses?.cta : variantClasses?.link, className)

    return <Tag className={classes} ref={ref} {...props} />
  },
)
