import colorUtils from "../../color/colorUtils";
import { identityType } from "../../utils";

import { colors } from "./colors";

const { color, variant } = colorUtils;

const { base, palette } = colors;

const typography = {
  fontFamily: {
    monospace:
      'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSize: {
    "3xs": "0.5rem",
    "2xs": "0.6rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    display1: "2.25rem",
    display2: "3rem",
    display3: "4rem",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
  leading: {
    tighter: 1,
    tight: 1.2,
    base: 1.4,
    loose: 1.6,
    looser: 1.8,
  },
  tracking: {
    tighter: "-0.02em",
    tight: "-0.01em",
    base: "0em",
    loose: "0.01em",
    looser: "0.02em",
  },
};

const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
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

type HeadingStyle = {
  color: string;
  family: string;
  size: string;
  transform: string;
  weight: number;
};

const headingStyles: { [key: string]: HeadingStyle } = {
  h1: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize["3xl"],
    transform: "none",
    weight: typography.fontWeight.heavy,
  },
  h2: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize["2xl"],
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h3: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize.xl,
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h4: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize.lg,
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h5: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize.md,
    transform: "none",
    weight: typography.fontWeight.bold,
  },
  h6: {
    color: variant("neutral", "900"),
    family: typography.fontFamily.heading,
    size: typography.fontSize.sm,
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
    backgroundMuted: variant("neutral", "100"),
    backgroundDim: variant("neutral", "200"),
    backgroundHover: color("blue", "50"),
    border: variant("neutral", "300"),
    borderCritical: variant("danger", "400"),
    borderFocus: color("blue", "400"),
    focusRing: color("blue", "200"),
    foreground: variant("neutral", "800"),
    foregroundMuted: variant("neutral", "900"),
    foregroundDim: variant("neutral", "700"),
    foregroundDisabled: variant("neutral", "500"),
    linkColor: color("blue", "500"),
    linkHoverColor: color("blue", "600"),
    overlayBackground: "rgba(18,18,18, 0.3)", // blanket behind modal dialogs
    loaderDark: variant("neutral", "500"),
    loaderLight: variant("neutral", "200"),
  },
  dark: {
    background: "black",
    backgroundMuted: variant("neutral", "600"),
    backgroundDim: variant("neutral", "700"),
    backgroundHover: color("blue", "50"),
    border: variant("neutral", "300"),
    borderCritical: variant("danger", "400"),
    borderFocus: color("blue", "400"),
    focusRing: color("blue", "200"),
    foreground: variant("neutral", "100"),
    foregroundMuted: variant("neutral", "200"),
    foregroundDim: variant("neutral", "300"),
    foregroundDisabled: variant("neutral", "600"),
    linkColor: color("blue", "500"),
    linkHoverColor: color("blue", "600"),
    overlayBackground: "rgba(18,18,18, 0.3)", // blanket behind modal dialogs
    loaderDark: variant("neutral", "200"),
    loaderLight: variant("neutral", "500"),
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
  active: {
    focusRing: color("blue", "200"),
    border: [color("blue", "300"), color("blue", "400"), color("blue", "500")],
    fill: [color("blue", "600"), color("blue", "700"), color("blue", "800")],
    tint: [color("blue", "50"), color("blue", "100"), color("blue", "200")],
    foreground: [
      color("blue", "600"),
      color("blue", "700"),
      color("blue", "800"),
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  neutral: {
    focusRing: variant("neutral", "300"),
    border: [
      variant("neutral", "300"),
      variant("neutral", "400"),
      variant("neutral", "500"),
    ],
    fill: [
      variant("neutral", "600"),
      variant("neutral", "700"),
      variant("neutral", "800"),
    ],
    tint: [
      variant("neutral", "200"),
      variant("neutral", "300"),
      variant("neutral", "400"),
    ],
    foreground: [
      variant("neutral", "700"),
      variant("neutral", "800"),
      variant("neutral", "900"),
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  success: {
    focusRing: color("green", "200"),
    border: [
      variant("success", "300"),
      variant("success", "400"),
      variant("success", "500"),
    ],
    fill: [
      variant("success", "600"),
      variant("success", "700"),
      variant("success", "800"),
    ],
    tint: [
      variant("success", "50"),
      variant("success", "100"),
      variant("success", "200"),
    ],
    foreground: [
      variant("success", "600"),
      variant("success", "700"),
      variant("success", "800"),
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  warning: {
    focusRing: variant("warning", "200"),
    border: [
      variant("warning", "300"),
      variant("warning", "400"),
      variant("warning", "500"),
    ],
    fill: [
      variant("warning", "400"),
      variant("warning", "500"),
      variant("warning", "600"),
    ],
    tint: [
      variant("warning", "50"),
      variant("warning", "100"),
      variant("warning", "200"),
    ],
    foreground: [
      variant("warning", "600"),
      variant("warning", "700"),
      variant("warning", "900"),
    ],
    fillForeground: [base.black, base.black, base.black],
  },
  danger: {
    focusRing: variant("danger", "200"),
    border: [
      variant("danger", "300"),
      variant("danger", "400"),
      variant("danger", "500"),
    ],
    fill: [
      variant("danger", "500"),
      variant("danger", "600"),
      variant("danger", "700"),
    ],
    tint: [
      variant("danger", "50"),
      variant("danger", "100"),
      variant("danger", "200"),
    ],
    foreground: [
      variant("danger", "600"),
      variant("danger", "700"),
      variant("danger", "800"),
    ],
    fillForeground: [base.white, base.white, base.white],
  },
  info: {
    focusRing: variant("info", "200"),
    border: [
      variant("info", "300"),
      variant("info", "400"),
      variant("info", "500"),
    ],
    fill: [
      variant("info", "500"),
      variant("info", "600"),
      variant("info", "700"),
    ],
    tint: [
      variant("info", "50"),
      variant("info", "100"),
      variant("info", "200"),
    ],
    foreground: [
      variant("info", "600"),
      variant("info", "700"),
      variant("info", "800"),
    ],
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
    border: color("orange", "400"),
    fill: color("orange", "500"),
    fillForeground: "white",
    foreground: color("orange", "600"),
    tint: color("orange", "200"),
  },
  gray: {
    border: color("gray", "600"),
    fill: color("gray", "700"),
    fillForeground: "white",
    foreground: color("gray", "700"),
    tint: color("gray", "300"),
  },
  blue: {
    border: color("blue", "400"),
    fill: color("blue", "500"),
    fillForeground: "white",
    foreground: color("blue", "600"),
    tint: color("blue", "200"),
  },
  magenta: {
    border: color("magenta", "400"),
    fill: color("magenta", "500"),
    fillForeground: "white",
    foreground: color("magenta", "600"),
    tint: color("magenta", "200"),
  },
  green: {
    border: color("green", "400"),
    fill: color("green", "500"),
    fillForeground: "white",
    foreground: color("green", "600"),
    tint: color("green", "200"),
  },
  purple: {
    border: color("purple", "400"),
    fill: color("purple", "500"),
    fillForeground: "white",
    foreground: color("purple", "600"),
    tint: color("purple", "200"),
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
  controlBorderColor: variant("neutral", "300"),
  controlBorderRadius: radii.small,
  controlBorderWidth: 2,
  controlForeground: color("blue", "500"),
  // iconColor: variant('neutral', '500'), // TODO
  inputBackground: variant("neutral", "100"),
  inputBorderColor: variant("neutral", "300"),
  inputBorderRadius: radii.small,
  inputBorderWidth: 1,
  inputForeground: variant("neutral", "800"),
  inputPlaceholder: variant("neutral", "500"),

  labelColor: variant("neutral", "800"),
  legendColor: variant("neutral", "600"),
  switchForeground: "white",

  hover: {
    inputBorderColor: variant("neutral", "400"),
    controlBorderColor: color("blue", "500"),
  },
  focus: {
    controlBorderColor: color("blue", "500"),
    inputBorderColor: color("blue", "500"),
    inputBackground: "white",
    shadow: `0 0 0 2px ${modes.light.focusRing}`,
  },
  disabled: {
    inputBackground: variant("neutral", "100"),
    inputForeground: variant("neutral", "800"),
    inputBorderColor: base.transparent,
    controlBackground: variant("neutral", "100"),
    controlBorderColor: variant("neutral", "200"),
    controlForeground: variant("neutral", "500"),
  },
  invalid: {
    inputBackground: variant("danger", "100"),
    inputForeground: variant("neutral", "700"),
    labelColor: variant("danger", "600"),
  },
  selected: {
    controlBackground: color("blue", "500"),
    controlBorderColor: color("blue", "500"),
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
  palette,
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
