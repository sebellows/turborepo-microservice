import React from "react";

import { VisuallyHiddenStyles, forwardRefAs } from "../shared";

/**
 * Only display content to screen readers.
 * @see {@link https://a11yproject.com/posts/how-to-hide-content/}
 */
export const VisuallyHidden = forwardRefAs<"div", {}>(
  ({ as: Tag = "div", ...props }, ref) => {
    return <Tag ref={ref} style={VisuallyHiddenStyles} {...props} />;
  }
);
