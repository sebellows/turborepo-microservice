"use client";

import { jsx, styled } from "../shared/styles/css";
import { PropsWithChildren } from "react";

import { NoWrapStyles, forwardRefAs, set } from "../shared";
import {
  TextStyleMap,
  Theme,
  resolveThemeColor,
  useMediaQuery,
  useTheme,
} from "../theme";

import { Box, BoxProps } from "./Box";

type TextProps = {
  /** The leading of the text. */
  leading?: keyof Theme["typography"]["lineHeight"];

  /** The size of the text. */
  size?: keyof Theme["typography"]["fontSize"];

  /** The tracking of the text. */
  tracking?: keyof Theme["typography"]["letterSpacing"];

  /** The color of the text. */
  color?: string; // keyof Theme["palette"];

  /** The font-weight of the text. */
  weight?: keyof Theme["typography"]["fontWeight"];

  /** For occasions where it should be limited to a single line. */
  textOverflow?: "ellipsis";
} & BoxProps;

const SpanWithTextOverflow = forwardRefAs<"span", PropsWithChildren<{}>>(
  ({ as = "span", children }, ref) => {
    const Component = styled[as]`
      ${NoWrapStyles}
    `;
    return <Component ref={ref} css={[NoWrapStyles]} children={children} />;
  }
);

export const Text = forwardRefAs<"p", TextProps>(
  (
    {
      as: Tag = "p",
      color: colorProp,
      leading = "base",
      size = "medium",
      tracking = "base",
      weight = "regular",
      textOverflow,
      children: childrenProp,
      ...props
    },
    ref
  ) => {
    const {
      theme: { colors, modes, typography },
      scheme,
    } = useTheme();

    const { mq } = useMediaQuery();

    const initStyles = colorProp ? { color: resolveThemeColor(colors, colorProp) } : {};

    let children = childrenProp;
    if (textOverflow === "ellipsis") {
      children = <SpanWithTextOverflow children={children} />;
    }

    const styleProps = Object.entries(TextStyleMap).reduce(
      (acc, [key, prop]) => {
        set(acc, prop, typography[prop][key]);

        return acc;
      },
      initStyles
    );

    const styles = mq(styleProps);

    return (
      <Box as={Tag} css={styles} ref={ref} {...props} children={children} />
    );
  }
);
