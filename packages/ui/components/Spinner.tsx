import React, { useMemo } from "react";
import { classNames, toPx } from '@trms/utils'

import { forwardRefAs } from "../shared";

import { BoxProps } from "./Box";
import { Center } from './Center'

import '../css/spinner.css'

export const Spinner = forwardRefAs<"div", BoxProps>(
  ({ as: Tag = "div", size = 80 }, ref) => {
    const borderWidthValue = useMemo(() => (size <= 80 ? 4 : Math.floor(size / 20)), [size]);

    return (
      <Center as={Tag} className="ripple" ref={ref}>
        <div className={classNames(`border-[${toPx(borderWidthValue)}]`, 'ripple-element')} />
        <div className={classNames(`border-[${toPx(borderWidthValue)}]`, 'ripple-element')} />
        <div className={classNames(`border-[${toPx(borderWidthValue)}]`, 'ripple-element')} />
      </Center>
    )
  }
);
