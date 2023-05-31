import { CSSObject } from "@emotion/serialize";

export const NoWrapStyles: CSSObject = {
  display: "block",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

// a11y support
export const VisuallyHiddenStyles = {
  border: 0,
  clip: "rect(0, 0, 0, 0)",
  height: 1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
} as const;

export const AbsoluteFillStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const FlexCenterStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
