import { PropsWithChildren } from "react";
import { pick } from '@trms/utils'

import { forwardRefAs } from "../shared";

import { Text, TextProps } from "./Text";

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = TextProps

export const Heading = forwardRefAs<HeadingLevel, PropsWithChildren<HeadingProps>>(
  ({ as: Tag = 'h1', ...props }, ref) => {
    return (<Text as={Tag} ref={ref} {...props} />)
  },
)
