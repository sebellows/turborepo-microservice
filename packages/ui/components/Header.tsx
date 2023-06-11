import { forwardRefAs } from "../shared";

import { Box, BoxProps } from "./Box";
import { Heading } from "./Heading";

type HeaderProps = { text?: string } & BoxProps

export const Header = forwardRefAs<'header', HeaderProps>(
  ({ as: Tag = 'header', children, className, text, ...props }, ref) => {
    return (
      <Box as={Tag} role="header" ref={ref} {...props}>
        {children ?? <Heading>{text}</Heading>}
      </Box>
    )
  },
)
