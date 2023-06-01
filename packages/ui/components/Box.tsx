"use client";

import { jsx } from "../shared/styles/css";
import { forwardRefAs } from "../shared/utils";
import {
  ColorProps,
  DimensionType,
  MarginProps,
  PaddingProps,
  RadiiProps,
  ResponsiveProp,
  TextAlignment,
  useBoxStyles,
} from "../theme";

export type BaseBoxProps = {
  /** text-align */
  textAlign?: TextAlignment;
  /** height */
  height?: ResponsiveProp<DimensionType>;
  /** width */
  width?: ResponsiveProp<DimensionType>;
};

export type BoxProps = ColorProps &
  RadiiProps &
  MarginProps &
  PaddingProps &
  BaseBoxProps & { css?: any };

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
