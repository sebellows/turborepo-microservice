import { jsx } from "../shared/styles";

import { forwardRefAs } from "../shared/utils";

import { Box, BoxProps } from "./Box";

type CenterProps = {
  fillView?: boolean;
} & BoxProps;

export const Center = forwardRefAs<"div", CenterProps>(
  ({ fillView = false, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        css={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: fillView ? "100vh" : undefined,
          width: fillView ? "100vw" : undefined,
        }}
        {...props}
      />
    );
  }
);
