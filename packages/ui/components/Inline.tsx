import { Children } from "react";
import { isNil, isPlainObject } from '@trms/utils'

import { forwardRefAs, getChildTag } from "../shared";

import { Box, BoxProps } from "./Box";
import { WithBreakpoint, negateUiValue } from "../styles";

type InlineProps = BoxProps;

export const Inline = forwardRefAs<"div", InlineProps>(
  ({ children, gap = 0, align, flexWrap = 'wrap', ...props }, ref) => {
    const boxClasses = {
      align,
      display: 'flex',
      flexWrap,
      gap,
      ml: negateUiValue(gap),
      mt: negateUiValue(gap),
      ...props,
    }

    const wrapperClasses = {
      display: 'flex',
      flexWrap: 'wrap',
      pl: gap,
      pt: gap,
    }
    const ChildWrapper = getChildTag(props.as);

    return (
      <Box ref={ref} {...boxClasses}>
        {Children.map(children, child =>
          !isNil(child) ? (
            <Box
              as={ChildWrapper}
              display='flex'
              flexWrap='wrap'
              pl={gap}
              pt={gap}
            >
              {child}
            </Box>
          ) : null,
        )}
      </Box>
    )
  }
);
