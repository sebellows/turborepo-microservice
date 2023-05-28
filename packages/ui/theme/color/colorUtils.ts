import { get } from "lodash";
import { ColorTintKey, ColorVariantKey, PaletteKey } from "../types";
import { colors } from "../themes/base/colors";

const { palette, variants } = colors;

type ColorPaletteTintKey<
  K extends PaletteKey,
  T extends ColorTintKey = ColorTintKey
> = `${K}.${T}`;

const getPaletteTint = <K extends PaletteKey>(
  colorName: K | ColorPaletteTintKey<K>,
  colorTint?: ColorTintKey
) => {
  let hue: K,
    tint: ColorTintKey,
    isPaths = colorName.includes(".");

  if (!colorTint && isPaths) {
    let keys = colorName.split(".");
    hue = keys[0] as K;
    tint = keys[1] as ColorTintKey;
  } else if (colorTint && !isPaths) {
    hue = colorName as K;
    tint = colorTint;
  } else {
    throw new Error(
      `The theme color palette cannot resolve the passed hue and/or tint of ${colorName}`
    );
  }

  if (!(hue in palette)) {
    throw new Error(
      `The theme color palette does not contain a hue named "${hue}"`
    );
  }

  if (!(tint in palette[hue])) {
    throw new Error(
      `The color palette hue "${hue}" does not contain a tint of "${tint}"`
    );
  }

  const color = get(palette, [hue, tint], null);

  if (!color) {
    throw new Error(
      `Cannot resolve color palette hue "${hue}" with tint "${tint}"`
    );
  }

  return color;
};

// type ColorVariantKey = keyof Exclude<keyof ColorVariants, symbol>;
type ColorVariantTintKey<
  K extends ColorVariantKey,
  T extends ColorTintKey = ColorTintKey
> = `${K}.${T}`;

const getVariantTint = <K extends ColorVariantKey>(
  colorName: K | ColorVariantTintKey<K>,
  colorTint?: ColorTintKey
) => {
  let variant: K,
    tint: ColorTintKey,
    isPaths = colorName.includes(".");

  if (!colorTint && isPaths) {
    let keys = colorName.split(".");
    variant = keys[0] as K;
    tint = keys[1] as ColorTintKey;
  } else if (colorTint && !isPaths) {
    variant = colorName as K;
    tint = colorTint;
  } else {
    throw new Error(
      `The theme color variant and/or tint "${colorName}" cannot be resolved.`
    );
  }

  if (!(variant in variants)) {
    throw new Error(
      `The theme color variants do not contain a variant named "${variant}".`
    );
  }

  if (!(tint in variants[variant])) {
    throw new Error(
      `The theme color variant "${variant}" does not contain a tint of "${tint}"`
    );
  }

  const color = get(variants, [variant, tint], null);

  if (!color) {
    throw new Error(
      `Cannot resolve the theme color variant "${variant}" with tint "${tint}"`
    );
  }

  return color;
};

export default {
  color: getPaletteTint,
  variant: getVariantTint,
};
