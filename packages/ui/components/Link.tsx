import { classNames } from "@trms/utils";
import { forwardRefAs } from "../shared";
import { useVariant } from "../theme";
import { ColorVariantKey } from "../theme/color.types";

export const Link = forwardRefAs<"a", { variant?: ColorVariantKey }>(
  ({ as: Tag = "a", className, variant = 'default', ...props }, ref) => {
    const colorScheme = useVariant(variant)
    const classes = classNames(colorScheme.link, className)

    return <Tag className={classes} ref={ref} {...props} />
  }
);
