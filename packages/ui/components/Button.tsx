"use client"

import { PropsWithChildren, useMemo } from "react";

import { AbsoluteFillStyles, FlexCenterStyles, forwardRefAs } from "../shared";
import { ColorVariantKey, useTheme } from "../theme";

import { Box, BoxProps } from "./Box";
import { Inline } from "./Inline";
import { Spinner } from "./Spinner";

type ButtonProps = {
  variant?: ColorVariantKey | "default";
  icon?: boolean;
  iconRight?: boolean;
  loading?: boolean;
  text?: string;
  tint?: 0 | 1 | 2;
  type?: string;
} & BoxProps;

type LoadingBoxProps = {
  backgroundColor?: string
  borderRadius?: string
  zIndex?: number
}
const LoadingBox = forwardRefAs<"span", PropsWithChildren<LoadingBoxProps>>(
  ({ as: Tag = "span", backgroundColor = 'inherit', borderRadius = 'inherit', zIndex = 1, children }, ref) => {
    const styles = {
      backgroundColor,
      borderRadius,
      zIndex,
    };

    return (
      <Tag
        ref={ref}
        css={[AbsoluteFillStyles, FlexCenterStyles, styles]}
        children={children}
      />
    );
  }
);

export const Button = forwardRefAs<"button", ButtonProps>(
  (
    {
      align = 'center',
      children,
      disabled,
      fontSize,
      icon,
      iconRight,
      loading,
      selected,
      text,
      tint = 0,
      type = "button",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const { theme, scheme } = useTheme();

    const isDisabled = useMemo(
      () => Boolean(loading || disabled),
      [loading, disabled]
    );

    const tone = variant === 'default' ? theme.tones.neutral : theme.tones[variant];
    const styles = {
      backgroundColor: tone.fill[0],
      color: tone.fillForeground[0],
      borderColor: tone.border[0],

      ":hover, :focus": {
        backgroundColor: tone.fill[1],
        color: tone.fillForeground[1],
        borderColor: tone.border[1],
      },
    };

    return (
      <Box
        css={[styles]}
        data-disabled={isDisabled}
        data-selected={selected ? "" : undefined}
        disabled={isDisabled}
        ref={ref}
        type={type}
        {...props}
      >
        {!!loading && (
          <LoadingBox>
            <Spinner />
          </LoadingBox>
        )}

        <Inline as="span" align={align}>
          {children}
        </Inline>
      </Box>
    );
  }
);