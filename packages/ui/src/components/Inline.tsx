import { Children } from "react";
import { isNil } from '@trms/utils'
import { negateUiValue } from '@trms/theme'

import { forwardRefAs, getChildTag } from "../shared";

import { Box, BoxProps } from './Box'

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
