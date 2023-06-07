"use client";

import { PropsWithChildren } from "react";

import { jsx, styled } from "../shared/styles/css";

import { forwardRefAs, NoWrapStyles, set } from "../shared";
import { HeadingLevel, HeadingStyleMap, useTheme } from "../theme";

import { Box, BoxProps } from "./Box";

export type HeadingProps = {
  as?: React.ElementType | keyof JSX.IntrinsicElements;

  /** The level of the heading. [Default: 'h1'] */
  level?: HeadingLevel;

  size?: HeadingLevel;

  /** For occasions where it should be limited to a single line. */
  textOverflow?: "ellipsis";
} & BoxProps;

const SpanWithTextOverflow = forwardRefAs<"span", PropsWithChildren<{}>>(
  ({ as = 'span', children }, ref) => {
    const Component = styled[as]`
      ${NoWrapStyles}
    `;
    return <Component ref={ref} css={[NoWrapStyles]} children={children} />;
  }
);

type HeadingLevelTag<TLevel extends number> = `h${TLevel}`

export const Heading = forwardRefAs<HeadingLevelTag<HeadingLevel>, PropsWithChildren<HeadingProps>>(
  ({ as: Tag = "h1", size = Tag, children: childrenProp, ...props }, ref) => {
    const {
      theme: { headingStyles },
    } = useTheme();
    const { textOverflow, ...attrs } = props;
    const headingStyle = headingStyles[size];

    let children = childrenProp;
    if (textOverflow === "ellipsis") {
      children = <SpanWithTextOverflow children={children} />;
    }

    const styles = Object.entries(HeadingStyleMap).reduce(
      (acc, [key, prop]) => {
        set(acc, prop, headingStyle[key]);

        return acc;
      },
      { margin: 0 }
    );

    return (
      <Box as={Tag} css={styles} ref={ref} {...attrs} children={children} />
    );
  }
);
