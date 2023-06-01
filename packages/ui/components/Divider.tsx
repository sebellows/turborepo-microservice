"use client";

import { jsx } from "../shared/styles/css";

import { MarginProps, resolveThemeColor, useTheme } from "../theme";

import { Box } from "./Box";

// type ColorType = ResponsiveProp<keyof Theme["palette"]>;

const orientationMap = {
  horizontal: "width",
  vertical: "height",
};

type DividerProps = {
  children?: never;
  color?: string;
  orientation?: keyof typeof orientationMap;
  className?: string;
} & MarginProps;

export const Divider = ({
  orientation = "vertical",
  color,
  ...props
}: DividerProps) => {
  const {
    theme: { colors },
    scheme,
  } = useTheme();

  const dimension = orientationMap[orientation];
  const styles = {
    // default the background color to the theme border color
    backgroundColor: resolveThemeColor(colors, color, scheme.border),
    flexShrink: 0,
    [dimension]: 1,
  };

  // if the color prop is defined, pass it as the background to the box
  return <Box css={styles} background={color} {...props} />;
};
