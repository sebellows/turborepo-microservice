import { PropsWithChildren } from "react";

import { jsx } from '../shared/styles/css'

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

const SpanWithTextOverflow = forwardRefAs<'span', PropsWithChildren<{}>>(({ as: Tag = 'span', children }, ref) => {
  return <Tag ref={ref} css={[NoWrapStyles]} children={children} />;
});

export const Heading = forwardRefAs<
  HeadingLevel,
  PropsWithChildren<HeadingProps>
>(({ as: Tag = "h1", size = Tag, children: childrenProp, ...props }, ref) => {
  const { theme: { headingStyles } } = useTheme();
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

  return <Box as={Tag} css={styles} ref={ref} {...attrs} children={children} />;
});
