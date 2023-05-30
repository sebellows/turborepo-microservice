import { theme } from "../themes/base";
import { ColorTintKey, ColorVariantKey, PaletteKey } from "./color";

export type Theme = typeof theme;

export type ThemeMode = "dark" | "light";

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
}

export type ResponsiveProp<T> = T; // | readonly (T | null)[];

export type DimensionType = number | string;

export type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "start"
  | "end";
export type TextAlignment = ResponsiveProp<TextAlign>;

export type ColorTintType =
  | `${PaletteKey}.${ColorTintKey}`
  | `${ColorVariantKey}.${ColorTintKey}`;
export type ColorType = ResponsiveProp<string | ColorTintType>;
export type ColorProps = {
  /** background-color */
  background?: string;
  /** color */
  foreground?: string;
};

export type RadiiType = ResponsiveProp<keyof Theme["radii"]>;
export type RadiiProps = {
  /** border-radius */
  rounded?: RadiiType;
  /** border-bottom-left-radius and border-bottom-right-radius */
  roundedBottom?: RadiiType;
  /** border-bottom-left-radius and border-top-left-radius */
  roundedLeft?: RadiiType;
  /** border-bottom-right-radius and border-top-right-radius */
  roundedRight?: RadiiType;
  /** border-bottom-left-radius and border-bottom-right-radius */
  roundedTop?: RadiiType;
};

export type SpacingType = ResponsiveProp<keyof Theme["spacing"]>;
export type MarginProps = {
  /** margin */
  margin?: SpacingType;
  /** margin-top */
  marginTop?: SpacingType;
  /** margin-right */
  marginRight?: SpacingType;
  /** margin-bottom */
  marginBottom?: SpacingType;
  /** margin-left */
  marginLeft?: SpacingType;
  /** margin-top and margin-bottom */
  marginY?: SpacingType;
  /** margin-left and margin-right */
  marginX?: SpacingType;
};

export type PaddingProps = {
  /** padding */
  padding?: SpacingType;
  /** padding-top */
  paddingTop?: SpacingType;
  /** padding-right */
  paddingRight?: SpacingType;
  /** padding-bottom */
  paddingBottom?: SpacingType;
  /** padding-left */
  paddingLeft?: SpacingType;
  /** padding-top and padding-bottom */
  paddingY?: SpacingType;
  /** padding-left and padding-right */
  paddingX?: SpacingType;
};

export type BreakpointProps = {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  prefersReducedMotion?: string;
};

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
