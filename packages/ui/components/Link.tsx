import { jsx } from "../shared/styles/css";

import { useTheme } from "../theme";
import { forwardRefAs } from "../shared/utils";

export const Link = forwardRefAs<"a", {}>(
  ({ as: Tag = "a", ...props }, ref) => {
    const { theme: { typography }, scheme } = useTheme();

    const styles = {
      color: scheme.linkColor,
      cursor: "pointer",
      fontWeight: typography.fontWeight.medium,
      textDecoration: "none",

      ":hover, :focus": {
        color: scheme.linkHoverColor,
        textDecoration: "underline",
      },
    };

    return <Tag css={styles} ref={ref} {...props} />;
  }
);
