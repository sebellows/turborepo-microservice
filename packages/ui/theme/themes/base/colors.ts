import { set } from "lodash";

import { BaseColors, ColorPalette, ColorVariants } from "../../types";

import { palette } from "./palette";

const baseColors: BaseColors = {
  black: "#000000",
  white: "#ffffff",
  current: "currentColor",
  transparent: "transparent",
};

const variantConfig: Record<string, keyof ColorPalette> = {
  neutral: "gray",
  info: "cyan",
  primary: "blue",
  success: "green",
  warning: "orange",
  danger: "red",
};

// let variants: ColorVariants
const generateColorVariants = (): ColorVariants => {
  return Object.entries(variantConfig).reduce(
    (acc, [variant, paletteColor]) => {
      set(acc, variant, palette[paletteColor]);

      return acc;
    },
    {} as ColorVariants
  );
};

const variants = generateColorVariants();

export const colors = {
  base: baseColors,
  palette,
  variants,
};
