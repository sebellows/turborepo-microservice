"use client"

import React from "react";
import { css, jsx } from "../shared/styles/css";
import { forwardRefAs } from "../shared";
import { BoxProps } from "./Box";
import { Heading } from "./Heading";
import { Theme, color, toUnit, useTheme } from "../theme";

type HeaderProps = { text?: string } & BoxProps

const HeaderStyles = (theme: Theme) =>
  css({
    padding: `${toUnit(theme.spacing.md, "rem")} ${toUnit(
      theme.spacing.lg,
      "rem"
    )}`,
    backgroundColor: color(theme.colors, "variants.neutral.300"),
  });

export const Header = forwardRefAs<"div", HeaderProps>(
  ({ as: Tag = "div", children, text, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = HeaderStyles(theme);

    return (
      <Tag css={styles} ref={ref} {...props}>
        {children ?? <Heading level={1}>{text}</Heading>}
      </Tag>
    );
  }
);
// export const Header = ({ text }: { text: string }) => {
//   return <h1>{text}</h1>;
// };
