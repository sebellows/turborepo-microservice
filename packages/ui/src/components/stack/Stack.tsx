import { Children, Fragment, ReactNode, isValidElement } from "react";
import { classNames } from '@trms/utils'

import { forwardRefAs, getChildTag } from "../../shared";

import { Box, BoxProps } from "../Box";
import { Divider } from "../Divider";

// import './Stack.style.css'

export type StackProps = {
  /** Each element in the stack. */
  children: ReactNode;
  /** Causes items in the stack to be oriented horizontally, instead of vertically */
  horizontal?: boolean;
  /** The placement, if any, of the dividing elements. */
  dividers?: "none" | "around" | "between" | "start" | "end";
} & BoxProps;

export const Stack = forwardRefAs<'div', StackProps>(
  (
    {
      className,
      horizontal = false,
      alignItems = 'stretch',
      children,
      dividers = 'none',
      gap = 'none',
      ...props
    },
    ref,
  ) => {
    const orientation = horizontal ? 'horizontal' : 'vertical'
    const dimension = horizontal ? 'width' : 'height'
    // const { dimension, flexDirection, marginProperty } = orientationMap[orientation]
    const ChildWrapper = getChildTag(props.as)
    const classes = classNames(className, !horizontal && 'stack-vertical')

    return (
      <Box
        ref={ref}
        className={classes}
        alignItems={alignItems}
        display="flex"
        flexDirection={orientation === 'horizontal' ? 'row' : 'col'}
        gap={gap}
        {...{ [dimension]: 'fit-content' }}
        {...props}
      >
        {['around', 'start'].includes(dividers) && <Divider orientation={orientation} />}
        {Children.toArray(children)
          .filter(child => isValidElement(child))
          .map((child, index) => {
            return (
              <Fragment key={index}>
                {dividers !== 'none' && index ? <Divider orientation={orientation} /> : null}

                {/* wrap the child to avoid unwanted or unexpected "stretch" on things like buttons */}
                <ChildWrapper className="empty:hidden">{child}</ChildWrapper>
              </Fragment>
            )
          })}
        {['around', 'end'].includes(dividers) && <Divider orientation={orientation} />}
      </Box>
    )
  },
)
