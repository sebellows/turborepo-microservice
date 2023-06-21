import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";
// import { UIProps } from "./compose";

type CenterProps = Partial<BoxProps> & {
  fillView?: boolean;
};

export const Center = forwardRefAs<"div", CenterProps>(
  ({ as = 'div', fillView = false, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref}
        alignItems="center"
        display="flex"
        justify="center"
        minH={fillView && "screen"}
        w={fillView && "full"}
        {...props}
      />
    );
  }
);

// const CenterBox = createBox<"div", CenterProps>({
//   defaultProps: {
//     alignItems: "center",
//     display: "flex",
//     justify: "center",
//   },
//   displayName: "Center",
// });

// export const Center = forwardRefAs<"div", CenterProps>(({ fillView = false, ...props}, ref) => {
//   return <CenterBox data-ui='center' minH={fillView && "screen"} w={fillView && 'full'} {...props} ref={ref} />;
// })
