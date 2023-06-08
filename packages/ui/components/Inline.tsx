import { Children } from "react";

import { BreakpointObj, forwardRefAs, getChildTag } from "../shared";

import { Box, BoxProps, parseBoxStyles } from "./Box";
import { isNil } from "@trms/utils";

type InlineProps = BoxProps;

// const resolveStyles = ({ align = "start", flexWrap = "wrap", gap = 0, ...props }: InlineProps) => {
//   const resolvedAlign = `items-${align}`;
//   const resolvedGap = ['gap', axis, gap].filter(isNil).join('-');
// }

export const Inline = forwardRefAs<"div", InlineProps>(
  ({ gap = 0, align, flexWrap = 'wrap', ...props }, ref) => {
    let resolvedGap: number | BreakpointObj 
    const boxClasses = {
      align,
      flexWrap,
      gap,
      ml: -gap,
      mt: -gap,
    }

    const propClasses = parseBoxStyles<InlineProps>({
      align: 'start',
      flexWrap: 'wrap',
      gap: 0,
      ml: -resolvedGap,
      mt: -resolvedGap,
      ...props,
    })
    const ChildWrapper = getChildTag(props.as);

    return (
      <Box ref={ref} {...boxClasses} {...props}>
        {Children.map(children, child =>
          !isNil(child) ? (
            <ChildWrapper
              css={{
                display: 'flex',
                flexWrap: 'wrap',
                paddingLeft: resolvedGap,
                paddingTop: resolvedGap,
              }}
            >
              {child}
            </ChildWrapper>
          ) : null,
        )}
      </Box>
    )
  }
);
