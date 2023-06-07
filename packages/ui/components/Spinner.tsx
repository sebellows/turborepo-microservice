"use client"

import { useMemo } from "react";
import { CSSObject } from "@emotion/serialize";

import { keyframes } from "../shared/styles/css";

import { forwardRefAs } from "../shared";
import { DimensionType, toPx } from "../theme";

const ripple = (size: number, borderWidth: number) => keyframes`
  0% {
    top: ${size / 2 - borderWidth}px;
    left: ${size / 2 - borderWidth}px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: ${size / 2 - borderWidth}px;
    left: ${size / 2 - borderWidth}px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: ${size / 2 - borderWidth}px;
    left: ${size / 2 - borderWidth}px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: ${size - borderWidth * 2}px;
    height: ${size - borderWidth * 2}px;
    opacity: 0;
`;

export const Spinner = forwardRefAs<"div", { size?: number; color?: string }>(
  ({ as: Tag = "div", color = "#fff", size = 80 }, ref) => {
    const borderWidthValue = useMemo(() => (size <= 80 ? 4 : Math.floor(size / 20)), [size]);
    const { borderWidth, spinnerSize } = useMemo(
      () => ({
        spinnerSize: toPx(size),
        borderWidth: toPx(borderWidthValue),
      }),
      [size]
    );
    const outerStyle: CSSObject = {
      display: "inline-block",
      position: "relative",
      width: spinnerSize,
      height: spinnerSize,
    };
    const inner1Style: CSSObject = {
      position: "absolute",
      border: `${borderWidth} solid ${color}`,
      opacity: 1,
      borderRadius: "50%",
      animation: `${ripple(size, borderWidthValue)} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
    };
    const inner2Style: CSSObject = {
      animationDelay: "-0.5s",
    };

    return (
      <Tag css={[outerStyle]} ref={ref}>
        <div css={[inner1Style]}>
          <div css={[inner2Style]}></div>
        </div>
      </Tag>
    );
  }
);
