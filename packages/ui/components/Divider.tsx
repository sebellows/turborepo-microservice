import { forwardRefAs } from "../shared";
import { ColorVariantKey } from "../theme/color.types";

import { Box } from "./Box";

const axes = {
  x: "w",
  y: "h",
};

type DividerProps = {
  children?: never;
  variant?: ColorVariantKey;
  axis?: keyof typeof axes;
  className?: string;
};

export const Divider = forwardRefAs<'div', DividerProps>(({ axis = 'x', ...props }, ref) => {
  return (
    <Box
      role="separator"
      ref={ref}
      my={axis === 'x' ? '0' : '8'}
      mx={axis === 'x' ? '8' : '0'}
      h={axis === 'x' ? 'auto' : '8'}
      w={axis === 'x' ? '8' : 'auto'}
      {...props}
    />
  )
})
