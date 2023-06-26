import { Children, Fragment, ReactNode, isValidElement } from "react";
import { classNames } from '@trms/utils'

import { forwardRefAs, getChildTag } from "../../shared";

import { Box, BoxProps } from "../Box";
import { Divider } from "../Divider";
import { WithBreakpoint } from "@trms/theme";

// import './Stack.style.css'

type StackOrientation = 'horizontal' | 'vertical'

export type StackProps = {
  /** Each element in the stack. */
  children: ReactNode;
  grid?: boolean
  /** Causes items in the stack to be oriented horizontally, instead of vertically */
  orientation?: StackOrientation | WithBreakpoint<StackOrientation>;
  /** The placement, if any, of the dividing elements. */
  dividers?: "none" | "around" | "between" | "start" | "end";
  /** Classes to apply to child wrapper elements */
  childClassName?: string | string[]
} & BoxProps;

export const Stack = forwardRefAs<"div", StackProps>(
  (
    {
      className,
      cols = '1',
      display,
      grid = true,
      orientation = 'vertical',
      children,
      dividers = "none",
      gap = "none",
      childClassName,
      ...props
    },
    ref
  ) => {
    const ChildWrapper = getChildTag(props?.as || 'div');
    const classes = classNames(className, `stack-${orientation}`);

    return (
      <Box
        ref={ref}
        className={classes}
        {...props}
        display={grid ? 'grid' : 'flex'}
        cols={grid && cols}
        gap={gap}
      >
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
  }
);
