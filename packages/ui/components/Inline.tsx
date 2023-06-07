import { Children } from "react";

import { forwardRefAs } from "../shared";

import { Box, BoxProps, parseBoxStyles } from "./Box";

type InlineProps = BoxProps;

// const resolveStyles = ({ align = "start", flexWrap = "wrap", gap = 0, ...props }: InlineProps) => {
//   const resolvedAlign = `items-${align}`;
//   const resolvedGap = ['gap', axis, gap].filter(isNil).join('-');
// }

export const Inline = forwardRefAs<"div", InlineProps>(
  (props, ref) => {
    const propClasses = parseBoxStyles<InlineProps>({
      align: "start",
      flexWrap: "wrap",
      gap: 0,
      ...props
    })
    const ChildWrapper = getChildTag(props.as);

    return (
      <Box
        // css={{
        //   alignItems: resolvedAlign,
        //   display: "flex",
        //   flexWrap,
        //   marginLeft: -resolvedGap,
        //   marginTop: -resolvedGap,
        // }}
        ref={ref}
        {...props}
      >
        {Children.map(children, (child) =>
          !isNil(child) ? (
            <ChildWrapper
              css={{
                display: "flex",
                flexWrap: "wrap",
                paddingLeft: resolvedGap,
                paddingTop: resolvedGap,
              }}
            >
              {child}
            </ChildWrapper>
          ) : null
        )}
      </Box>
    );
  }
);
