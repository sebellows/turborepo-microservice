import { classNames } from '@trms/utils'

import { forwardRefAs } from '../shared'
import { useVariant } from '../hooks'
import { UIThemeProps } from './Box'

export const Link = forwardRefAs<'a', UIThemeProps>(
  ({ as: Tag = 'a', className, inverted, muted, variant = 'default', ...props }, ref) => {
    const colorScheme = useVariant(variant, { inverted, muted, schemeKeys: ['link'] });
    const classes = classNames(colorScheme, className)

    return <Tag className={classes} ref={ref} {...props} />
  },
)
