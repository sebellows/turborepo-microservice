import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";
import { TextOverflowBlock } from './TextOverflowBlock'
import { ColorVariantKey } from "../theme/color.types";
import { useVariant } from "../theme";
import { pick } from "@trms/utils";

export type TextProps = {
  muted?: boolean
  variant?: ColorVariantKey
} & BoxProps

export const Text = forwardRefAs<"p", TextProps>(
  (
    {
      as: Tag = "p",
      muted = false,
      variant = 'default',
      children: childrenProp,
      ...props
    },
    ref
  ) => {
    const variantClasses = useVariant(variant);
    const textClasses = muted ? variantClasses.muted : variantClasses.text

    let children = childrenProp;
    if (props?.textOverflow || props?.truncate || props?.lineClamp) {
      const overflowProps = pick(props, 'lineClamp', 'textOverflow', 'truncate')
      children = <TextOverflowBlock {...overflowProps}>{children}</TextOverflowBlock>
    }

    return <Box as={Tag} className={textClasses} ref={ref} {...props} children={children} />
  }
);
