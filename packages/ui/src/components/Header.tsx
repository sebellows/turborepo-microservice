import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";

type HeaderProps = BoxProps

export const Header = forwardRefAs<'header', HeaderProps>(
  ({ as: Tag = 'header', ...props }, ref) => {
    return <Box as={Tag} role="header" ref={ref} {...props} />
  },
)
