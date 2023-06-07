import { Children, Fragment, ReactNode, isValidElement } from "react";

import {
  getChildTag,
  mapResponsiveProp,
  Theme,
  useMediaQuery,
  useTheme,
} from "../../theme";
import { forwardRefAs } from "../../shared";

import { Box, BoxProps } from "../Box";
import { Divider } from "../Divider";

const alignment = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
};

const orientationMap = {
  horizontal: {
    flexDirection: "row",
    marginProperty: "marginLeft",
    dimension: "width",
  },
  vertical: {
    flexDirection: "column",
    marginProperty: "marginTop",
    dimension: "height",
  },
} as const;

export type StackProps = {
  /** The value of the "align-items" property. */
  align?: keyof typeof alignment;
  /** Each element in the stack. */
  children: ReactNode;
  /** Causes items in the stack to be oriented horizontally, instead of vertically */
  across?: boolean;
  /** The placement, if any, of the dividing elements. */
  dividers?: "none" | "around" | "between" | "start" | "end";
  /** The size of the gap between each element in the stack. */
  gap?: keyof Theme["spacing"];
} & BoxProps;

export const Stack = forwardRefAs<"div", StackProps>(
  (
    {
      across,
      align = "stretch",
      children,
      dividers = "none",
      gap = "none",
      ...props
    },
    ref
  ) => {
    const {
      theme: { spacing },
    } = useTheme();
    const { mq } = useMediaQuery();

    const orientation = across ? "horizontal" : "vertical";
    const { dimension, flexDirection, marginProperty } =
      orientationMap[orientation];
    const ChildWrapper = getChildTag(props.as);

    return (
      <Box
        ref={ref}
        css={mq({
          alignItems: alignment[align],
          display: "flex",
          flexDirection,
          [dimension]: "fit-content",

          "& > * + *": {
            [marginProperty]: mapResponsiveProp(gap, spacing),
          },
        })}
        {...props}
      >
        {["around", "start"].includes(dividers) && (
          <Divider orientation={orientation} />
        )}
        {Children.toArray(children)
          .filter((child) => isValidElement(child))
          .map((child, index) => {
            return (
              <Fragment key={index}>
                {dividers !== "none" && index ? (
                  <Divider orientation={orientation} />
                ) : null}

                {/* wrap the child to avoid unwanted or unexpected "stretch" on things like buttons */}
                <ChildWrapper css={{ ":empty": { display: "none" } }}>
                  {child}
                </ChildWrapper>
              </Fragment>
            );
          })}
        {["around", "end"].includes(dividers) && (
          <Divider orientation={orientation} />
        )}
      </Box>
    );
  }
);
