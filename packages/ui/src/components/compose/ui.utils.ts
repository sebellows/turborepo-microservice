import { StyleTransformFunction } from "./ui.types";
import { UiTheme } from "@trms/theme";
import { PropValue } from "../../shared";

/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export function getThemeValue<
  TVal extends PropValue,
  Theme extends UiTheme,
  K extends keyof Theme | undefined
>(
  value: TVal | undefined,
  {
    theme,
    transform,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal>;
    themeKey?: K;
  }
) {
  if (transform) return transform({ value, theme, themeKey });
  if (isThemeKey(theme, themeKey)) {
    if (value && theme[themeKey][value as string] === undefined)
      throw new Error(
        `Value '${value}' does not exist in theme['${String(themeKey)}']`
      );

    return value ? theme[themeKey][value as string] : value;
  }

  return value;
}

function isThemeKey<Theme extends UiTheme>(
  theme: Theme,
  K: keyof Theme | undefined
): K is keyof Theme {
  return theme[K as keyof Theme];
}

/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
// export const getResponsiveValue = <
//   TVal extends PropValue,
//   Theme extends RootTheme,
//   K extends keyof Theme | undefined
// >(
//   propValue: ResponsiveValue<TVal, RootTheme["screens"]>,
//   {
//     theme,
//     transform,
//     dimensions,
//     themeKey,
//   }: {
//     theme: Theme;
//     transform?: StyleTransformFunction<Theme, K, TVal>;
//     dimensions: Dimensions;
//     themeKey?: K;
//   }
// ):
//   | (K extends keyof Theme ? ValueOf<Theme[K]> : never)
//   | TVal
//   | null
//   | undefined => {
//   const val = isResponsiveObjectValue(propValue, theme)
//     ? getBreakpointClass({
//         value: propValue,
//         breakpoints: theme.screens,
//         dimensions,
//       })
//     : propValue;

//   return getThemeValue(val, { theme, transform, themeKey });
// };

// /**
//  * Returns actual value for given `responsiveValue`, `breakpoints`, and current `dimensions`.
//  */
// export const getBreakpointClass = <
//   Theme extends RootTheme,
//   TVal extends string
// >({
//   property,
//   value,
//   breakpoints,
//   dimensions,
// }: {
//   property: StringKeyOf<UIComponentProps>;
//   value: AtLeastOneResponsiveValue<TVal, RootTheme["screens"]>;
//   breakpoints: Theme["screens"];
//   dimensions: Dimensions;
// }): TVal | undefined => {
//   const classes: string[] = [];

//   const sortedBreakpoints = Object.entries(value).sort((valA, valB) => {
//     const valAWidth = parseInt(valA[1]);
//     const valBWidth = parseInt(valB[1]);

//     return valAWidth - valBWidth;
//   });

//   Object.entries(value).forEach(([bp, bpValue]) => {
//     const bpClass = get(UIComponentProps, [property, bpValue as string]);
//     classes.push(`${bp}:${bpClass}`);
//   });

//   return classes.join(" ") as TVal;

//   // const { width, height } = dimensions;
//   // return sortedBreakpoints.reduce<TVal | undefined>((acc, [key, value]) => {
//   //   if (isPlainObject(value)) {
//   //     if (
//   //       width >= value.width &&
//   //       height >= value.height &&
//   //       responsiveValue[key] !== undefined
//   //     ) {
//   //       return responsiveValue[key] as TVal;
//   //     }
//   //   } else if (width >= value && responsiveValue[key] !== undefined) {
//   //     return responsiveValue[key] as TVal;
//   //   }

//   //   return acc;
//   // }, undefined);
// };

// // function getWidth(value: BaseTheme["screens"]) {
// //   return isPlainObject(value) ? value.width : value;
// // }

// export const isResponsiveObjectValue = <Theme extends RootTheme, TVal>(
//   value: ResponsiveValue<TVal, Theme["screens"]>,
//   theme: Theme
// ): value is AtLeastOneResponsiveValue<TVal, Theme["screens"]> => {
//   if (!value || typeof value !== "object") return false;

//   return getKeys(value).every(
//     (key) => theme.breakpoints[key as string] !== undefined
//   );
// };
