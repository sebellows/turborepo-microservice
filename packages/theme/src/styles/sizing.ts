import { SpacingValues } from "./spacing";
import { setUnitValuePropertyMap } from "./style.utils";

export const SizingValues = [
  ...SpacingValues,
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4",
  "1/5",
  "2/5",
  "3/5",
  "4/5",
  "1/6",
  "2/6",
  "3/6",
  "4/6",
  "5/6",
  "1/12",
  "2/12",
  "3/12",
  "4/12",
  "5/12",
  "6/12",
  "7/12",
  "8/12",
  "9/12",
  "10/12",
  "11/12",
  "auto",
  "full",
  "screen",
  "min",
  "max",
  "fit",
] as const;
// type SizingValueOption = (typeof SizingValues)[number];

const MinWidthSizingValues = ["0", "full", "min", "max", "fit"] as const;
const MaxWidthSizingValues = [
  "0",
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "full",
  "min",
  "max",
  "fit",
  "prose",
  "screen-sm",
  "screen-md",
  "screen-lg",
  "screen-xl",
  "screen-2xl",
] as const;
const MinHeightSizingValues = [...MinWidthSizingValues, "screen"] as const;
const MaxHeightSizingValues = [
  ...SpacingValues,
  "none",
  "fit",
  "full",
  "max",
  "min",
  "screen",
] as const;

const SizingClasses = ["w", "h"] as const;
const MinWidthSizingClasses = ["min-w"] as const;
const MaxWidthSizingClasses = ["max-w"] as const;
const MinHeightSizingClasses = ["min-h"] as const;
const MaxHeightSizingClasses = ["max-h"] as const;

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { w: '5/12', h: { sm: 'max', lg: 'min' }, minW: 96 }
 */
export const sizing = {
  ...setUnitValuePropertyMap(SizingClasses, SizingValues),
  ...setUnitValuePropertyMap(MinWidthSizingClasses, MinWidthSizingValues),
  ...setUnitValuePropertyMap(MaxWidthSizingClasses, MaxWidthSizingValues),
  ...setUnitValuePropertyMap(MinHeightSizingClasses, MinHeightSizingValues),
  ...setUnitValuePropertyMap(MaxHeightSizingClasses, MaxHeightSizingValues),
};
