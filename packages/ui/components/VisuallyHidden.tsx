import { classNames } from "@trms/utils";

import { forwardRefAs } from "../shared";

/**
 * Only display content to screen readers.
 * @see {@link https://a11yproject.com/posts/how-to-hide-content/}
 */
export const VisuallyHidden = forwardRefAs<"div", { showOnFocus?: boolean }>(
  ({ as: Tag = "div", className, showOnFocus = false, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={classNames(showOnFocus && 'focus:not-sr-only', className)}
        {...props}
      />
    )
  }
);
