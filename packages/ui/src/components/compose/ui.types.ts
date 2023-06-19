import { BaseTheme, TailwindTheme } from "@trms/theme";
import { ValueOf } from "@trms/utils";

export type StyleTransformFunction<
  Theme extends BaseTheme,
  K extends keyof Theme | undefined,
  TVal
> = (params: {
  value: TVal | undefined | null;
  theme: Theme;
  themeKey?: K;
}) => TVal | undefined | null;

export type AtLeastOneResponsiveValue<
  Value,
  B extends BaseTheme["screens"],
  R = { [Key in keyof B]: { [key in Key]: Value } }
> = Partial<{
  [K in keyof B]: Value;
}> &
  R[keyof R];

export type ResponsiveValue<Value, B extends BaseTheme["screens"]> =
  | Value
  | AtLeastOneResponsiveValue<Value, B>;

export type SafeVariants<T> = Omit<T, keyof TailwindTheme>;

export type Breakpoint = ValueOf<BaseTheme["screens"]>;

export interface Dimensions {
  width: number | string;
  height: number | string;
}

export interface UiStyleFunctionContainer<
  TProps extends Record<string, any> = {},
  Theme extends BaseTheme = BaseTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: UiStyleFunction<TProps, Theme>;
}

export type UiStyleFunction<
  TProps extends Record<string, any> = {},
  Theme extends BaseTheme = BaseTheme,
  S extends keyof any = string
> = (
  props: TProps,
  context: { theme: Theme; dimensions: Dimensions | null }
) => {
  [key in S]?: any;
};
