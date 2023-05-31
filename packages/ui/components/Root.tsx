"use client"

import { Fragment, ReactNode } from "react";

import { jsx, Global } from "../shared/styles/css";

import { normalize } from '../shared/styles/normalize';
import { useTheme } from "../theme";

type RootProps = {
  /** The app content. */
  children: ReactNode;
  /** Include styles to normalize element styles among browsers. */
  includeNormalize?: boolean;
  /** Optimize text rendering with CSS. */
  optimizeLegibility?: boolean;
};

export const RootContainer = ({
  children,
  includeNormalize = true,
  optimizeLegibility = true,
}: RootProps) => {
  return (
    <Fragment>
      <BaseCSS
        includeNormalize={includeNormalize}
        optimizeLegibility={optimizeLegibility}
      />
      {children}
    </Fragment>
  );
};

// Base CSS
// ------------------------------

type BaseCSSProps = Omit<RootProps, "children">;

const BaseCSS = ({ includeNormalize, optimizeLegibility }: BaseCSSProps) => {
  const { theme: { typography }, scheme } = useTheme();

  return (
    <Fragment>
      {includeNormalize && <Global styles={normalize} />}
      <Global
        styles={{
          html: {
            fontSize: "initial !important", // ensure user's font-size settings are observed, for rems
          },

          body: {
            backgroundColor: scheme.background,
            color: scheme.foreground,
            fontSize: "1rem",
            fontWeight: typography.fontWeight.regular,
            lineHeight: typography.lineHeight.base,
            fontFamily: typography.fontFamily.body,

            // optimize legibility
            ...(optimizeLegibility && {
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }),
          },

          // Set correct default colors for links from the theme
          a: {
            color: scheme.linkColor,
            ":hover": {
              color: scheme.linkHoverColor,
            },
          },

          // [1] reset all box sizing to border-box
          // [2] default borders so you can add a border by specifying just the width
          "*, ::before, ::after": {
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: scheme.border,
          },
        }}
      />
    </Fragment>
  );
};
