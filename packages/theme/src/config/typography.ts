import { toEm, toRem } from "@trms/utils";
import { TailwindTheme } from "../types";

export const fontFamily = {
  display: [
    "Yeseva One",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
};

export const fontSize: TailwindTheme["fontSize"] = {
  display1: [
    toRem(30),
    {
      lineHeight: toRem(36),
      letterSpacing: `-${toEm(0.6, 30)}`,
      fontWeight: "400",
    },
  ],
  display2: [
    toRem(24),
    {
      lineHeight: toRem(32),
      letterSpacing: `-${toEm(0.3, 24)}`,
      fontWeight: "400",
    },
  ],
};
