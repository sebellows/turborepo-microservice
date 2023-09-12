import { Children, Fragment, ReactNode, isValidElement, useMemo } from 'react'
import { classNames } from '@trms/utils'
import { WithBreakpoint } from '@trms/theme'

import { forwardRefAs, getChildTag } from '../shared'

import { Box, BoxProps } from './Box'
import { Divider } from './Divider'

type StackOrientation = 'horizontal' | 'vertical'

export type StackProps = {
  /** Each element in the stack. */
  children: ReactNode
  /** Stack display options are "grid" or "flex" only! */
  display?: 'grid' | 'flex'
  /** Causes items in the stack to be oriented horizontally, instead of vertically */
  orientation?: StackOrientation | WithBreakpoint<StackOrientation>
  /** The placement, if any, of the dividing elements. */
  dividers?: 'none' | 'around' | 'between' | 'start' | 'end'
  /** Classes to apply to child wrapper elements */
  childClassName?: string | string[]
} & Omit<BoxProps, 'display'>

export const Stack = forwardRefAs<'div', StackProps>(
  (
    {
      className,
      display: initialDisplay = 'grid',
      orientation = 'vertical',
      children,
      dividers = 'none',
      gap = 'none',
      childClassName,
      ...props
    },
    ref,
  ) => {
    const ChildWrapper = getChildTag(props?.as || 'div')
    const classes = classNames(className, `stack-${orientation}`)

    const display = useMemo(() => {
      if (!['grid', 'flex'].includes(initialDisplay)) {
        throw new TypeError(`Stack component can only have a display value of "grid" or "flex".`)
      }

      return initialDisplay
    }, [initialDisplay])

    console.log('Stack', '\norientation: ', orientation, '\ncols: ', props.cols, '\nprops: ', props)

    return (
      <Box ref={ref} className={classes} {...props} display={display} gap={gap}>
        {['around', 'start'].includes(dividers) && <Divider orientation={orientation} />}
        {Children.toArray(children)
          .filter(child => isValidElement(child))
          .map((child, index) => {
            return (
              <Fragment key={index}>
                {dividers !== 'none' && index ? <Divider orientation={orientation} /> : null}

                {/* wrap the child to avoid unwanted or unexpected "stretch" on things like buttons */}
                <ChildWrapper className={classNames('empty:hidden', childClassName)}>
                  {child}
                </ChildWrapper>
              </Fragment>
            )
          })}
        {['around', 'end'].includes(dividers) && <Divider orientation={orientation} />}
      </Box>
    )
  },
)
