import { boxShadow, fontFamily, fontSize, screens, zIndex } from "./config";
import { palette } from "./palette";
import { TailwindTheme } from "./types";

export const theme: Partial<TailwindTheme> = {
  boxShadow,
  screens,
  colors: {
    ...palette,
    neutral: palette.gray,
  },
  extend: {
    fontFamily,
    fontSize,
    opacity: {
      "12": "0.125",
    },
    zIndex,
  },
};

export type UiBaseTheme = typeof theme;

type ReplaceThemeProps<
  Inner extends TailwindTheme,
  P extends keyof Inner = keyof Inner
> = Omit<TailwindTheme, P> & Pick<Inner, P>;

export type UiTheme = ReplaceThemeProps<UiBaseTheme>;
