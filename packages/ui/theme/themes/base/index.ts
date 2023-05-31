"use client";

import { CSSProperties } from "@emotion/serialize";

import { identityType, toRem } from "../../utils";
import { ReplaceKeys } from "../../../shared";

import { colors } from "./colors";

// const { color, variant } = colorUtils;

const { base } = colors;

type TextProperties = Pick<
  CSSProperties,
  | "color"
  | "fontFamily"
  | "fontSize"
  | "letterSpacing"
  | "textTransform"
  | "fontWeight"
>;

export const TextStyleMap = {
  family: "fontFamily",
  tracking: "letterSpacing",
  size: "fontSize",
  transform: "textTransform",
  weight: "fontWeight",
} as const;

export type TextStyle = ReplaceKeys<TextProperties, typeof TextStyleMap>;

const typography = {
  fontFamily: {
    monospace:
      'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSize: {
    xxxs: 9,
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display1: 36,
    display2: 48,
    display3: 64,
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
  lineHeight: {
    tighter: 1,
    tight: 1.2,
    base: 1.4,
    loose: 1.6,
    looser: 1.8,
  },
  letterSpacing: {
    tighter: -0.32,
    tight: -0.16,
    base: 0,
    loose: 0.16,
    looser: 0.32,
  },
  textTransform: {
    none: "none",
    capitalize: "capitalize",
    lower: "lowercase",
    upper: "uppercase",
  },
};

const breakpoints = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px )",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)",
  prefersReducedMotion: "(prefers-reduced-motion: reduce)",
};

const elevation = {
  e100: 100, // Cards
  e200: 200, // Inline dialogs (popover)
  e300: 300, // Tooltip
  e400: 400, // Modals
  e500: 500, // Toasts (notifications)
};

const radii = {
  none: 0,
  xsmall: 4,
  small: 6,
  medium: 8,
  large: 12,
  full: 9999,
};

const sizing = {
  "2xs": 16,
  xs: 20,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 42,
  "2xl": 48,
};

const spacing = {
  none: 0,
  "2xs": 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
};

const shadow = {
  s100: `0px 1px 2px rgba(0, 0, 0, 0.2)`, // Cards
  s200: `0px 2px 4px rgba(0, 0, 0, 0.2)`, // Inline dialogs (popover)
  s300: `0px 2px 8px rgba(0, 0, 0, 0.2)`, // Tooltip
  s400: `0px 4px 16px rgba(0, 0, 0, 0.2)`, // Modals
  s500: `-8px 8px 32px rgba(0, 0, 0, 0.2)`, // Toasts (notifications)
};

const animation = {
  duration0: "0ms",
  duration50: "40ms",
  duration100: "130ms",
  duration200: "160ms",
  duration300: "190ms",
  duration400: "220ms",
  duration500: "250ms",
  duration600: "300ms",
  duration700: "350ms",
  duration800: "400ms",
  duration900: "450ms",
  duration1000: "500ms",
  spring: `cubic-bezier(0.2, 0, 0, 1.6)`,
  easeInOut: "cubic-bezier(.45, 0, .40, 1)",
  easeIn: `cubic-bezier(0.2, 0, 0, 1)`,
  easeOut: `cubic-bezier(0.165, 0.840, 0.440, 1)`,
  linear: "cubic-bezier(0, 0, 1, 1)",
};

const opacity = {
  full: 1,
  none: 0,
  disabled: 0.65,
};

/**
 * Alias Tokens
 */

type HeadingProperties = Pick<
  CSSProperties,
  "color" | "fontFamily" | "fontSize" | "textTransform" | "fontWeight"
>;

export const HeadingStyleMap = {
  color: "color",
  family: "fontFamily",
  size: "fontSize",
  transform: "textTransform",
  weight: "fontWeight",
} as const;

export type HeadingStyle = ReplaceKeys<
  HeadingProperties,
  typeof HeadingStyleMap
>;

const headingStyles: { [key: string]: HeadingStyle } = {
  h1: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize["3xl"]),
    transform: "none",
    weight: typography.fontWeight.heavy,
  },
  h2: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize["2xl"]),
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h3: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize.xl),
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h4: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize.lg),
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h5: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize.md),
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h6: {
    color: "variant.neutral.900",
    family: typography.fontFamily.heading,
    size: toRem(typography.fontSize.sm),
    transform: "uppercase",
    weight: typography.fontWeight.bold,
  },
};

type ControlSize = {
  borderRadius: number;
  borderWidth: number;
  gutter: number;
  paddingX: number;
  paddingY: number;
  height: number;
  gap: number;
  fontSize: number | string;
  indicatorBoxSize: number | string;
  indicatorFontSize: number | string;
};

const controlSizes: { [key: string]: ControlSize } = {
  small: {
    borderRadius: radii.xsmall,
    borderWidth: 1,
    gutter: spacing.xs,
    paddingX: spacing.md,
    paddingY: spacing.xs,
    height: sizing.md,
    gap: spacing.sm,
    fontSize: typography.fontSize.sm,
    indicatorBoxSize: sizing.xs,
    indicatorFontSize: typography.fontSize["3xs"],
  },
  medium: {
    borderRadius: radii.small,
    borderWidth: 1,
    gutter: spacing.xs,
    paddingX: spacing.lg,
    paddingY: spacing.xs,
    height: sizing.lg,
    gap: spacing.md,
    fontSize: typography.fontSize.md,
    indicatorBoxSize: sizing.sm,
    indicatorFontSize: typography.fontSize["2xs"],
  },
  large: {
    borderRadius: radii.medium,
    borderWidth: 1,
    gutter: spacing.sm,
    paddingX: spacing.lg,
    paddingY: spacing.sm,
    height: sizing["2xl"],
    gap: spacing.md,
    fontSize: typography.fontSize.lg,
    indicatorBoxSize: sizing.md,
    indicatorFontSize: typography.fontSize.sm,
  },
};

type Mode = {
  background: string;
  backgroundMuted: string;
  backgroundDim: string;
  backgroundHover: string;
  border: string;
  borderCritical: string;
  borderFocus: string;
  focusRing: string;
  foreground: string;
  foregroundMuted: string;
  foregroundDim: string;
  foregroundDisabled: string;
  linkColor: string;
  linkHoverColor: string;
  overlayBackground: string;
  loaderDark: string;
  loaderLight: string;
};
type Modes = {
  light: Mode;
  dark: Mode;
  [key: string]: Mode;
};

const modes: Modes = {
  light: {
    background: "white",
    backgroundMuted: "variant.neutral.100",
    backgroundDim: "variant.neutral.200",
    backgroundHover: "palette.blue.50",
    border: "variant.neutral.300",
    borderCritical: "variant.danger.400",
    borderFocus: "palette.blue.400",
    focusRing: "palette.blue.200",
    foreground: "variant.neutral.800",
    foregroundMuted: "variant.neutral.900",
    foregroundDim: "variant.neutral.700",
    foregroundDisabled: "variant.neutral.500",
    linkColor: "palette.blue.500",
    linkHoverColor: "palette.blue.600",
    overlayBackground: "rgba(18,18,18, 0.3)", // blanket behind modal dialogs
    loaderDark: "variant.neutral.500",
    loaderLight: "variant.neutral.200",
  },
  dark: {
    background: "black",
    backgroundMuted: "variant.neutral.600",
    backgroundDim: "variant.neutral.700",
    backgroundHover: "palette.blue.50",
    border: "variant.neutral.300",
    borderCritical: "variant.danger.400",
    borderFocus: "palette.blue.400",
    focusRing: "palette.blue.200",
    foreground: "variant.neutral.100",
    foregroundMuted: "variant.neutral.200",
    foregroundDim: "variant.neutral.300",
    foregroundDisabled: "variant.neutral.600",
    linkColor: "palette.blue.500",
    linkHoverColor: "palette.blue.600",
    overlayBackground: "rgba(18,18,18, 0.3)", // blanket behind modal dialogs
    loaderDark: "variant.neutral.200",
    loaderLight: "variant.neutral.500",
  },
};

/**

Tones have 3 backgrounds:
- pass-through (colors.background or colors.backgroundMuted)
- tint (tone.tint)
- fill (tone.fill)

Tones have 2 foregrounds that should work on these backgrounds:
- foreground (should work on pass-through and tint)
- fillForeground (should work on fill)

*/

type ToneColor = [string, string, string];
type Tone = {
  focusRing: string;
  border: ToneColor;
  fill: ToneColor;
  tint: ToneColor;
  foreground: ToneColor;
  fillForeground: ToneColor;
};

const tones = identityType<{ [key: string]: Tone }>()({
  // a.k.a., the "active" state
  primary: {
    focusRing: "variant.primary.200",
    border: [
      "variant.primary.300",
      "variant.primary.400",
      "variant.primary.500",
    ],
    fill: ["variant.primary.600", "variant.primary.700", "variant.primary.800"],
    tint: ["variant.primary.50", "variant.primary.100", "variant.primary.200"],
    foreground: [
      "variant.primary.600",
      "variant.primary.700",
      "variant.primary.800",
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  neutral: {
    focusRing: "variant.neutral.300",
    border: [
      "variant.neutral.300",
      "variant.neutral.400",
      "variant.neutral.500",
    ],
    fill: ["variant.neutral.600", "variant.neutral.700", "variant.neutral.800"],
    tint: ["variant.neutral.200", "variant.neutral.300", "variant.neutral.400"],
    foreground: [
      "variant.neutral.700",
      "variant.neutral.800",
      "variant.neutral.900",
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  success: {
    focusRing: "palette.green.200",
    border: [
      "variant.success.300",
      "variant.success.400",
      "variant.success.500",
    ],
    fill: ["variant.success.600", "variant.success.700", "variant.success.800"],
    tint: ["variant.success.50", "variant.success.100", "variant.success.200"],
    foreground: [
      "variant.success.600",
      "variant.success.700",
      "variant.success.800",
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  warning: {
    focusRing: "variant.warning.200",
    border: [
      "variant.warning.300",
      "variant.warning.400",
      "variant.warning.500",
    ],
    fill: ["variant.warning.400", "variant.warning.500", "variant.warning.600"],
    tint: ["variant.warning.50", "variant.warning.100", "variant.warning.200"],
    foreground: [
      "variant.warning.600",
      "variant.warning.700",
      "variant.warning.900",
    ],
    fillForeground: [base.black, base.black, base.black],
  },
  danger: {
    focusRing: "variant.danger.200",
    border: ["variant.danger.300", "variant.danger.400", "variant.danger.500"],
    fill: ["variant.danger.500", "variant.danger.600", "variant.danger.700"],
    tint: ["variant.danger.50", "variant.danger.100", "variant.danger.200"],
    foreground: [
      "variant.danger.600",
      "variant.danger.700",
      "variant.danger.800",
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  info: {
    focusRing: "variant.info.200",
    border: ["variant.info.300", "variant.info.400", "variant.info.500"],
    fill: ["variant.info.500", "variant.info.600", "variant.info.700"],
    tint: ["variant.info.50", "variant.info.100", "variant.info.200"],
    foreground: ["variant.info.600", "variant.info.700", "variant.info.800"],
    fillForeground: [base.white, base.white, base.white],
  },
});

type SelectableColor = {
  border: string;
  fill: string;
  fillForeground: string;
  foreground: string;
  tint: string;
};

const selectableColors = identityType<{ [key: string]: SelectableColor }>()({
  orange: {
    border: "palette.orange.400",
    fill: "palette.orange.500",
    fillForeground: "white",
    foreground: "palette.orange.600",
    tint: "palette.orange.200",
  },
  gray: {
    border: "palette.gray.600",
    fill: "palette.gray.700",
    fillForeground: "white",
    foreground: "palette.gray.700",
    tint: "palette.gray.300",
  },
  blue: {
    border: "palette.blue.400",
    fill: "palette.blue.500",
    fillForeground: "white",
    foreground: "palette.blue.600",
    tint: "palette.blue.200",
  },
  magenta: {
    border: "palette.magenta.400",
    fill: "palette.magenta.500",
    fillForeground: "white",
    foreground: "palette.magenta.600",
    tint: "palette.magenta.200",
  },
  green: {
    border: "palette.green.400",
    fill: "palette.green.500",
    fillForeground: "white",
    foreground: "palette.green.600",
    tint: "palette.green.200",
  },
  purple: {
    border: "palette.purple.400",
    fill: "palette.purple.500",
    fillForeground: "white",
    foreground: "palette.purple.600",
    tint: "palette.purple.200",
  },
});

type SharedFieldStateTokens = {
  labelColor?: string;
  legendColor?: string;
  shadow?: string;
};

type ControlFieldStateTokens = {
  controlBackground?: string;
  controlBorderColor?: string;
  controlBorderRadius?: number | string;
  controlForeground?: string;
};

type InputFieldStateTokens = {
  inputBackground?: string;
  inputBorderColor?: string;
  inputBorderRadius?: number | string;
  inputForeground?: string;
  iconColor?: string;
};

type FieldStateTokens = SharedFieldStateTokens &
  ControlFieldStateTokens &
  InputFieldStateTokens;

type FieldTokens = FieldStateTokens & {
  controlBorderWidth?: number | string;
  inputBorderWidth?: number | string;
  inputPlaceholder?: string;
  switchForeground?: string;
  disabled: FieldStateTokens;
  focus: FieldStateTokens;
  hover: FieldStateTokens;
  invalid: FieldStateTokens;
  selected: SharedFieldStateTokens & ControlFieldStateTokens;
};

const fields: FieldTokens = {
  controlBackground: "white",
  controlBorderColor: "variant.neutral.300",
  controlBorderRadius: radii.small,
  controlBorderWidth: 2,
  controlForeground: "palette.blue.500",
  // iconColor: variant('neutral', '500'), // TODO
  inputBackground: "variant.neutral.100",
  inputBorderColor: "variant.neutral.300",
  inputBorderRadius: radii.small,
  inputBorderWidth: 1,
  inputForeground: "variant.neutral.800",
  inputPlaceholder: "variant.neutral.500",

  labelColor: "variant.neutral.800",
  legendColor: "variant.neutral.600",
  switchForeground: "white",

  hover: {
    inputBorderColor: "variant.neutral.400",
    controlBorderColor: "palette.blue.500",
  },
  focus: {
    controlBorderColor: "palette.blue.500",
    inputBorderColor: "palette.blue.500",
    inputBackground: "white",
    shadow: `0 0 0 2px ${modes.light.focusRing}`,
  },
  disabled: {
    inputBackground: "variant.neutral.100",
    inputForeground: "variant.neutral.800",
    inputBorderColor: base.transparent,
    controlBackground: "variant.neutral.100",
    controlBorderColor: "variant.neutral.200",
    controlForeground: "variant.neutral.500",
  },
  invalid: {
    inputBackground: "variant.danger.100",
    inputForeground: "variant.neutral.700",
    labelColor: "variant.danger.600",
  },
  selected: {
    controlBackground: "palette.blue.500",
    controlBorderColor: "palette.blue.500",
    controlForeground: "white",
  },
};

/**
 * Export
 */

export const theme = {
  name: "Kyle",
  // Global Tokens
  typography,
  // palette,
  breakpoints,
  elevation,
  modes,
  radii,
  sizing,
  spacing,
  shadow,
  animation,
  opacity,
  // Alias Tokens
  headingStyles,
  controlSizes,
  colors,
  tones,
  selectableColors,
  fields,
};
