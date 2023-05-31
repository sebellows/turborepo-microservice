import { jsx } from "../shared/styles/css";
import { Children } from "react";

import { forwardRefAs, isNil } from "../shared";
import { getChildTag, Theme, useTheme } from "../theme";

import { Box, BoxProps } from "./Box";

const alignment = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
};

type InlineProps = {
  /** The value of the "align-items" property. */
  align?: keyof typeof alignment;
  /** The size of the gap between each item. */
  gap?: keyof Theme["spacing"];
} & BoxProps;

export const Inline = forwardRefAs<"div", InlineProps>(
  ({ align = "start", children, flexWrap = "wrap", gap = "none", ...props }, ref) => {
    const {
      theme: { spacing },
    } = useTheme();
    const resolvedAlign = alignment[align];
    const resolvedGap = spacing[gap];
    const ChildWrapper = getChildTag(props.as);

    return (
      <Box
        css={{
          alignItems: resolvedAlign,
          display: "flex",
          flexWrap,
          marginLeft: -resolvedGap,
          marginTop: -resolvedGap,
        }}
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
