/**
 * Adapted from theme-related types in tailwindcss.
 * @see config.d.ts
 * @link https://github.com/tailwindlabs/tailwindcss/blob/v3.3.2/types/config.d.ts
 */

export type KeyValuePair<K extends keyof any = string, V = string> = Record<
  K,
  V
>;
interface RecursiveKeyValuePair<K extends keyof any = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}

export type ResolvableTo<T> = T | ((...args: any[]) => T);

export type CSSRuleObject = RecursiveKeyValuePair<
  string,
  null | string | string[]
>;

type Screen =
  | { raw: string }
  | { min: string }
  | { max: string }
  | { min: string; max: string };
type ScreensConfig =
  | string[]
  | KeyValuePair<string, string | Screen | Screen[]>;

interface ThemeConfig {
  // Responsiveness
  screens: ResolvableTo<ScreensConfig>;
  supports: ResolvableTo<Record<string, string>>;
  data: ResolvableTo<Record<string, string>>;

  // Reusable base configs
  colors: ResolvableTo<RecursiveKeyValuePair>;
  spacing: ResolvableTo<KeyValuePair>;

  // Components
  container: ResolvableTo<
    Partial<{
      screens: ScreensConfig;
      center: boolean;
      padding: string | Record<string, string>;
    }>
  >;

  // Utilities
  inset: ThemeConfig["spacing"];
  zIndex: ResolvableTo<KeyValuePair>;
  order: ResolvableTo<KeyValuePair>;
  gridColumn: ResolvableTo<KeyValuePair>;
  gridColumnStart: ResolvableTo<KeyValuePair>;
  gridColumnEnd: ResolvableTo<KeyValuePair>;
  gridRow: ResolvableTo<KeyValuePair>;
  gridRowStart: ResolvableTo<KeyValuePair>;
  gridRowEnd: ResolvableTo<KeyValuePair>;
  margin: ThemeConfig["spacing"];
  aspectRatio: ResolvableTo<KeyValuePair>;
  height: ThemeConfig["spacing"];
  maxHeight: ThemeConfig["spacing"];
  minHeight: ResolvableTo<KeyValuePair>;
  width: ThemeConfig["spacing"];
  maxWidth: ResolvableTo<KeyValuePair>;
  minWidth: ResolvableTo<KeyValuePair>;
  flex: ResolvableTo<KeyValuePair>;
  flexShrink: ResolvableTo<KeyValuePair>;
  flexGrow: ResolvableTo<KeyValuePair>;
  flexBasis: ThemeConfig["spacing"];
  borderSpacing: ThemeConfig["spacing"];
  transformOrigin: ResolvableTo<KeyValuePair>;
  translate: ThemeConfig["spacing"];
  rotate: ResolvableTo<KeyValuePair>;
  skew: ResolvableTo<KeyValuePair>;
  scale: ResolvableTo<KeyValuePair>;
  animation: ResolvableTo<KeyValuePair>;
  keyframes: ResolvableTo<
    KeyValuePair<string, KeyValuePair<string, KeyValuePair>>
  >;
  cursor: ResolvableTo<KeyValuePair>;
  scrollMargin: ThemeConfig["spacing"];
  scrollPadding: ThemeConfig["spacing"];
  listStyleType: ResolvableTo<KeyValuePair>;
  columns: ResolvableTo<KeyValuePair>;
  gridAutoColumns: ResolvableTo<KeyValuePair>;
  gridAutoRows: ResolvableTo<KeyValuePair>;
  gridTemplateColumns: ResolvableTo<KeyValuePair>;
  gridTemplateRows: ResolvableTo<KeyValuePair>;
  gap: ThemeConfig["spacing"];
  space: ThemeConfig["spacing"];
  divideWidth: ThemeConfig["borderWidth"];
  divideColor: ThemeConfig["borderColor"];
  divideOpacity: ThemeConfig["borderOpacity"];
  borderRadius: ResolvableTo<KeyValuePair>;
  borderWidth: ResolvableTo<KeyValuePair>;
  borderColor: ThemeConfig["colors"];
  borderOpacity: ThemeConfig["opacity"];
  backgroundColor: ThemeConfig["colors"];
  backgroundOpacity: ThemeConfig["opacity"];
  backgroundImage: ResolvableTo<KeyValuePair>;
  gradientColorStops: ThemeConfig["colors"];
  backgroundSize: ResolvableTo<KeyValuePair>;
  backgroundPosition: ResolvableTo<KeyValuePair>;
  fill: ThemeConfig["colors"];
  stroke: ThemeConfig["colors"];
  strokeWidth: ResolvableTo<KeyValuePair>;
  objectPosition: ResolvableTo<KeyValuePair>;
  padding: ThemeConfig["spacing"];
  textIndent: ThemeConfig["spacing"];
  fontFamily: ResolvableTo<
    KeyValuePair<
      string,
      | string
      | string[]
      | [
          fontFamily: string | string[],
          configuration: Partial<{
            fontFeatureSettings: string;
            fontVariationSettings: string;
          }>
        ]
    >
  >;
  fontSize: ResolvableTo<
    KeyValuePair<
      string,
      | string
      | [fontSize: string, lineHeight: string]
      | [
          fontSize: string,
          configuration: Partial<{
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string | number;
          }>
        ]
    >
  >;
  fontWeight: ResolvableTo<KeyValuePair>;
  lineHeight: ResolvableTo<KeyValuePair>;
  letterSpacing: ResolvableTo<KeyValuePair>;
  textColor: ThemeConfig["colors"];
  textOpacity: ThemeConfig["opacity"];
  textDecorationColor: ThemeConfig["colors"];
  textDecorationThickness: ResolvableTo<KeyValuePair>;
  textUnderlineOffset: ResolvableTo<KeyValuePair>;
  placeholderColor: ThemeConfig["colors"];
  placeholderOpacity: ThemeConfig["opacity"];
  caretColor: ThemeConfig["colors"];
  accentColor: ThemeConfig["colors"];
  opacity: ResolvableTo<KeyValuePair>;
  boxShadow: ResolvableTo<KeyValuePair>;
  boxShadowColor: ThemeConfig["colors"];
  outlineWidth: ResolvableTo<KeyValuePair>;
  outlineOffset: ResolvableTo<KeyValuePair>;
  outlineColor: ThemeConfig["colors"];
  ringWidth: ResolvableTo<KeyValuePair>;
  ringColor: ThemeConfig["colors"];
  ringOpacity: ThemeConfig["opacity"];
  ringOffsetWidth: ResolvableTo<KeyValuePair>;
  ringOffsetColor: ThemeConfig["colors"];
  blur: ResolvableTo<KeyValuePair>;
  brightness: ResolvableTo<KeyValuePair>;
  contrast: ResolvableTo<KeyValuePair>;
  dropShadow: ResolvableTo<KeyValuePair<string, string | string[]>>;
  grayscale: ResolvableTo<KeyValuePair>;
  hueRotate: ResolvableTo<KeyValuePair>;
  invert: ResolvableTo<KeyValuePair>;
  saturate: ResolvableTo<KeyValuePair>;
  sepia: ResolvableTo<KeyValuePair>;
  backdropBlur: ThemeConfig["blur"];
  backdropBrightness: ThemeConfig["brightness"];
  backdropContrast: ThemeConfig["contrast"];
  backdropGrayscale: ThemeConfig["grayscale"];
  backdropHueRotate: ThemeConfig["hueRotate"];
  backdropInvert: ThemeConfig["invert"];
  backdropOpacity: ThemeConfig["opacity"];
  backdropSaturate: ThemeConfig["saturate"];
  backdropSepia: ThemeConfig["sepia"];
  transitionProperty: ResolvableTo<KeyValuePair>;
  transitionTimingFunction: ResolvableTo<KeyValuePair>;
  transitionDelay: ResolvableTo<KeyValuePair>;
  transitionDuration: ResolvableTo<KeyValuePair>;
  willChange: ResolvableTo<KeyValuePair>;
  content: ResolvableTo<KeyValuePair>;

  [key: string]: any;
}

export type TailwindTheme = Partial<
  ThemeConfig & { extend: Partial<ThemeConfig> }
>;

// export interface BaseTheme extends TailwindTheme {
//   [key: string]: any;
// }
