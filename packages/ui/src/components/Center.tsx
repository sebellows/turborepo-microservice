import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";

type CenterProps = Partial<BoxProps> & {
  fillView?: boolean;
};

export const Center = forwardRefAs<"div", CenterProps>(
  ({ as = 'div', fillView = false, minH, w, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref}
        alignItems="center"
        display="flex"
        justify="center"
        minH={fillView ? "screen" : minH}
        w={fillView ? "full" : w}
        {...props}
      />
    );
  }
);
