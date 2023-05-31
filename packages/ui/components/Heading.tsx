/** @jsx jsx */
import { PropsWithChildren } from "react";

// import { jsx } from '../shared/styles'
import { forwardRefAs, jsx, set, NoWrapStyles } from "../shared";
import { BoxProps, HeadingLevel } from "../theme/types";
import { HeadingStyleMap, useTheme } from '../theme';

import { Box } from './Box';

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
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  PropsWithChildren<HeadingProps>
>(({ as: Tag = "h1", size = Tag, children: childrenProp, ...props }, ref) => {
  const { headingStyles } = useTheme();
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

  return <Box as={Tag} css={styles} ref={ref} {...attrs} />;
});
