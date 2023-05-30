/** @jsx jsx */

import { jsx } from "../shared/styles";
import { AsProp } from "../shared/types";
import { forwardRefAs } from "../shared/utils/react";
import { useBoxStyles } from "../theme";
import { BoxProps } from "../theme/types";

export const Box = forwardRefAs<"div", BoxProps>(
  ({ as: Tag = "div", ...props }, ref) => {
    const {
      background,
      foreground,
      height,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginY,
      marginX,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingY,
      paddingX,
      rounded,
      roundedBottom,
      roundedLeft,
      roundedRight,
      roundedTop,
      textAlign,
      width,
      ...attrs
    } = props as BoxProps;

    const boxStyles = useBoxStyles({
      background,
      foreground,
      height,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginY,
      marginX,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingY,
      paddingX,
      rounded,
      roundedBottom,
      roundedLeft,
      roundedRight,
      roundedTop,
      textAlign,
      width,
    });

    return <Tag css={boxStyles} ref={ref} {...attrs} />;
  }
);
