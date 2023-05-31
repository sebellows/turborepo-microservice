import { CSSProperties } from "react";
import { CSSObject } from "@emotion/react";

import { useMediaQuery } from "../mq";
import { useTheme } from "./useTheme";
import {
  ColorProps,
  DimensionType,
  MarginProps,
  PaddingProps,
  RadiiProps,
  Theme,
} from "../types";
import { mapResponsiveProp, toRem } from "../utils";
import { get, isPlainObject } from "../../shared/utils";
import { BoxProps } from "../../components/Box";
import { isNil } from "lodash";
import { isValidColor } from "../color";

export const toUnit = (
  value: DimensionType | undefined,
  unit = "px"
): string => {
  if (value == null) {
    return "0";
  }

  if (typeof value === "number") {
    return `${value}${unit}`;
  }

  if (!value.endsWith(unit)) {
    return `${value}${unit}`;
  }

  return value;
};

export const useBoxStyles = ({
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
}: BoxProps) => {
  const { theme } = useTheme();
  const { mq } = useMediaQuery();

  const resolvedColors = useColors(
    {
      background,
      foreground,
    },
    theme
  );

  const resolvedMargin = useMargin(
    {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginY,
      marginX,
    },
    theme
  );

  const resolvedPadding = usePadding(
    {
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingY,
      paddingX,
    },
    theme
  );

  const resolvedRounding = useRadii(
    { rounded, roundedTop, roundedRight, roundedBottom, roundedLeft },
    theme
  );

  return mq({
    ...resolvedColors,
    ...resolvedMargin,
    ...resolvedPadding,
    ...resolvedRounding,
    boxSizing: "border-box",
    height: toUnit(height),
    textAlign: textAlign,
    width: toUnit(width),
  });
};

// Utils
// ------------------------------

export function fillCSSObject(
  keys: string[],
  value: string | number | CSSObject
): CSSObject {
  return keys.reduce<CSSObject>((style, key) => {
    style[key] = value;

    return style;
  }, {});
}

export function responsive<T>(
  media: Partial<Theme["breakpoints"]> | number[],
  values: T[],
  callback: (value: T, index?: number, array?: T[]) => CSSObject
): CSSObject[] {
  const statements = values?.map(callback) || [];
  const breakpoints = isPlainObject(media) ? Object.values(media) : media;

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement;

    return {
      [`@media screen and (min-width: ${breakpoints[mediaIndex - 1]}px)`]:
        statement,
    };
  });
}

export const resolveThemeColor =
  (themeColors: Theme["colors"], value?: string, defaultColor?: string) => {
    if (!value) {
      return defaultColor ?? themeColors.base.current;
    }

    let colorValue: string | undefined;
    const paths = value.split(".");

    // Set a default tint for the hue, if one is missing
    let [scheme, hue, tint = "500"] = paths;

    if (scheme === "base") {
      colorValue = get(themeColors, paths);
    } else if (scheme === "palette" || scheme === "variants") {
      colorValue = get(themeColors, [scheme, hue, tint]);
    } else if (isValidColor(scheme)) {
      // A valid color (hex, rgb, hsl, html color name, etc.) was passed
      colorValue = scheme
    }

    if (!colorValue) {
      throw new Error(`Could not resolve color value of ${value}`)
    }

    return colorValue;
  };

const resolveThemeColorProp =
  (colors: Theme["colors"], prop: keyof CSSProperties) =>
  (value: string): CSSObject => {
    const paths = value.split(".");
    let colorValue: string = colors.base.current;
    // Set a default tint for the hue, if one is missing
    let [scheme, hue, tint = "500"] = paths;

    if (paths.length === 1) {
      // We will assume that this is a custom set color (rgb(a), hex, hsl, etc.)
      colorValue = value;
    } else if (scheme === "base") {
      colorValue = get(colors, paths);
    } else if (scheme === "palette" || scheme === "variants") {
      colorValue = get(colors, [scheme, hue, tint]);
    }

    return { [prop]: colorValue };
  };

/**
 * @internal
 */
export function responsiveColor<T>(
  theme: Theme,
  values: T[],
  callback: (value: T, index?: number, array?: T[]) => CSSObject
): CSSObject[] {
  const { breakpoints, colors } = theme;
  const statements = values?.map(callback) || [];

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement;

    return {
      [`@media screen and (min-width: ${breakpoints[mediaIndex - 1]}px)`]:
        statement,
    };
  });
}

// type BreakpointKey = keyof Theme["breakpoints"];
type SpacingKey = keyof Theme["spacing"];

export const useResponsiveSpace = (
  props: string[],
  spaceKeys: SpacingKey[] = []
): CSSObject[] | null => {
  const { theme } = useTheme();

  if (!Array.isArray(spaceKeys)) {
    throw new Error("the property must be array of numbers");
  }

  if (spaceKeys.length === 0) {
    return null;
  }

  return responsive(theme.breakpoints, spaceKeys, (spaceKey) =>
    fillCSSObject(props, toRem(theme.spacing[spaceKey]))
  );
};

function useColors(
  { background, foreground }: ColorProps,
  { breakpoints, colors }: Theme
): Pick<CSSObject, "backgroundColor" | "color"> {
  let backgroundColor: CSSObject = { backgroundColor: undefined };
  let color: CSSObject = { color: undefined };

  const bgResolver = resolveThemeColorProp(colors, "backgroundColor");
  const fgResolver = resolveThemeColorProp(colors, "color");

  if (background) {
    backgroundColor = responsive<string>(
      breakpoints,
      [background],
      bgResolver
    )[0];
  }
  if (foreground) {
    color = responsive<string>(breakpoints, [foreground], fgResolver)[0];
  }

  return Object.assign({}, backgroundColor, color);
}

function useRadii(
  { rounded, roundedTop, roundedRight, roundedBottom, roundedLeft }: RadiiProps,
  { radii }: Theme
) {
  let borderBottomLeftRadius = roundedBottom || roundedLeft || rounded;
  let borderBottomRightRadius = roundedBottom || roundedRight || rounded;
  let borderTopLeftRadius = roundedTop || roundedLeft || rounded;
  let borderTopRightRadius = roundedTop || roundedRight || rounded;

  return {
    borderBottomLeftRadius:
      borderBottomLeftRadius &&
      mapResponsiveProp(borderBottomLeftRadius, radii),
    borderBottomRightRadius:
      borderBottomRightRadius &&
      mapResponsiveProp(borderBottomRightRadius, radii),
    borderTopLeftRadius:
      borderTopLeftRadius && mapResponsiveProp(borderTopLeftRadius, radii),
    borderTopRightRadius:
      borderTopRightRadius && mapResponsiveProp(borderTopRightRadius, radii),
  };
}

function usePadding(
  {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX,
  }: PaddingProps,
  { spacing }: Theme
) {
  let pb = paddingBottom || paddingY || padding;
  let pt = paddingTop || paddingY || padding;
  let pl = paddingLeft || paddingX || padding;
  let pr = paddingRight || paddingX || padding;

  return {
    paddingBottom: pb && mapResponsiveProp(pb, spacing),
    paddingTop: pt && mapResponsiveProp(pt, spacing),
    paddingLeft: pl && mapResponsiveProp(pl, spacing),
    paddingRight: pr && mapResponsiveProp(pr, spacing),
  };
}

function useMargin(
  {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX,
  }: MarginProps,
  { spacing }: Theme
) {
  let mb = marginBottom || marginY || margin;
  let mt = marginTop || marginY || margin;
  let ml = marginLeft || marginX || margin;
  let mr = marginRight || marginX || margin;

  return {
    marginBottom: mb && mapResponsiveProp(mb, spacing),
    marginTop: mt && mapResponsiveProp(mt, spacing),
    marginLeft: ml && mapResponsiveProp(ml, spacing),
    marginRight: mr && mapResponsiveProp(mr, spacing),
  };
}
