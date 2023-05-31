/** @jsx jsx */

import { forwardRefAs, jsx } from "../shared";

import { BoxProps, Theme, useMediaQuery, useRootTheme, useTheme } from "../theme";

import { Box } from "./Box";

type TextProps = {
  /** The leading of the text. */
  leading?: keyof Theme["typography"]["leading"];
  /** The size of the text. */
  size?: keyof Theme["typography"]["fontSize"];
  /** The tracking of the text. */
  tracking?: keyof Theme["typography"]["tracking"];
  /** The color of the text. */
  color?: string // keyof Theme["palette"];
  /** The font-weight of the text. */
  weight?: keyof Theme["typography"]["fontWeight"];
} & BoxProps;

export const Text = forwardRefAs<"div", TextProps>(
  (
    {
      color,
      leading = "base",
      size = "medium",
      tracking = "base",
      weight = "regular",
      ...props
    },
    ref
  ) => {
    const { mode } = useRootTheme();
    const { colors, modes, typography } = useTheme();

    const { mq } = useMediaQuery();

    const styles = mq({
      color: colors.palette[color] ?? color ?? modes[mode].foreground,
      fontSize: typography.fontSize[size],
      fontWeight: typography.fontWeight[weight],
      letterSpacing: typography.tracking[tracking],
      lineHeight: typography.leading[leading],
    });

    return <Box css={styles} ref={ref} {...props} />;
  }
);
