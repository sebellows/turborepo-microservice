import { useMemo } from 'react'
import {
  ColorVariantKey,
  ColorVariantKeys,
  VariantColorScheme,
  VariantColorSchemeKey,
  variants,
} from "@trms/theme";
import { UIThemeProps } from '../components';

type VariantColorSchemeBase = Omit<
  VariantColorScheme,
  "bgInteractive" | "mutedInteractive"
>;
type VariantClasses = Partial<VariantColorSchemeBase>;

type VariantSchemeProps<P extends UIThemeProps> = P & {
  scheme: VariantColorScheme;
  schemeKeys?: VariantColorSchemeKey[];
};

export const resolveVariantClasses = <P extends UIThemeProps>(
  schemeProps: VariantSchemeProps<P>
) => {
  const { muted, interactive, scheme, schemeKeys = [] } = schemeProps;
  let variantClasses: VariantClasses = {};

  if (schemeKeys.includes("bg")) {
    if (interactive) {
      variantClasses.bg = muted ? scheme.mutedInteractive : scheme.bgInteractive;
    } else {
      variantClasses.bg = muted ? scheme.muted : scheme.bg;
    }
  }
  const keys = [
    "border",
    "borderInteractive",
    "cta",
    "fg",
    "fgInteractive",
    "link",
    "text",
  ] as VariantColorSchemeKey[];
  const filteredKeys = keys.filter((key) => schemeKeys.includes(key));

  if (filteredKeys?.length) {
    filteredKeys.forEach((key) => {
      variantClasses[key] = scheme[key];
    });
  }

  return variantClasses;
};

const isValidVariant = (variant: ColorVariantKey) => ColorVariantKeys.includes(variant)

type UseVariantOptions = {
  inverted?: boolean;
  muted?: boolean;
  interactive?: boolean;
  schemeKeys?: VariantColorSchemeKey[];
};

export const useVariant = (
  initialVariant?: ColorVariantKey,
  options: UseVariantOptions = {},
  deps: any[] = []
): [VariantColorScheme, VariantClasses] | [] => {
  const { inverted = false, ...opts } = options;
  const variant = useMemo(() => {
    if (!initialVariant || !isValidVariant(initialVariant)) return;

    let _variantClasses: VariantClasses = {};

    const variantKey = initialVariant;
    let _scheme = inverted
      ? variants.inverted[variantKey]
      : variants[variantKey];

    if (opts?.schemeKeys?.length) {
      _variantClasses = resolveVariantClasses({ scheme: _scheme, ...opts });
    }

    return [_scheme, _variantClasses] as [VariantColorScheme, VariantClasses];
  }, deps);

  return variant ?? [];
};
