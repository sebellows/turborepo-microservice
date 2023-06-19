import { forwardRefAs } from "../shared";

import { Box } from "./Box";
import { UIProps } from "./compose";

type CenterProps = UIProps<{
  fillView?: boolean;
}>;

export const Center = forwardRefAs<"div", CenterProps>(
  ({ fillView = false, ...props }, ref) => {
    return (
      <Box
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
