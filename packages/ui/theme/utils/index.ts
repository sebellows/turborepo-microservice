"use client";

import { CSSObject } from "@emotion/react";
import { ElementType } from "react";

/**
 * Simple switch to return a child tag from a parent tag argument.
 * Returns a div by default.
 */
export const getChildTag = (parentTag?: ElementType<any>): "li" | "div" => {
  switch (parentTag) {
    case "ul":
    case "ol":
      return "li";
    default:
      return "div";
  }
};

/** Reluctant trick for fixing TypeScript inference issues around dynamic types. */
export function identityType<T>() {
  function inner<U extends T>(u: U): U {
    return u;
  }
  return inner;
}

/**
 * Bidirectional display support.
 * Applies to following CSS properties:
 * - border-block-start/border-block-end
 * - border-block-start-(color|style|width)/border-block-end-(color|style|width)
 * - grid-column-*
 * - grid-row-*
 * - margin-block/margin-block-*
 * - margin-inline/margin-inline-*
 * - padding-block/padding-block-*
 * - padding-inline/padding-inline-*
 * - inset-block/inset-block-*
 * - inset-inline/inset-inline-*
 */
export function getBidiSuffix(placement: string, isRTL?: boolean) {
  let direction = placement;
  if (placement === "left") {
    direction = isRTL ? "end" : "start";
  } else if (placement === "right") {
    direction = isRTL ? "start" : "end";
  }

  return direction;
}

export const mapResponsiveProp = <P extends CSSObject, K extends keyof P>(
  value: K | readonly (K | null)[],
  valueMap: P
) => {
  if (Array.isArray(value)) {
    return value.map((k) => valueMap[k] ?? null);
  } else if (typeof value == "string") {
    return valueMap[value];
  }

  return null;
};

/**
 * Convert pixel value to em units
 */
export function toEm(value: `${string}px` | number, baseValue = 16): string {
  let pixelValue = 0;

  if (typeof value === "string") {
    pixelValue = parseFloat(value);
  }

  return pixelValue === 0 ? "0" : `${pixelValue / 16}em`;
}

/**
 * Convert pixel value to rem units
 */
export function toRem(value: `${string}px` | number, baseValue = 16): string {
  let pixelValue = 0;

  if (typeof value === "string") {
    pixelValue = parseFloat(value);
  }

  return pixelValue === 0 ? "0" : `${pixelValue / baseValue}rem`;
}

/**
 * Convert number, em, or rem unit values to px units
 */
export function toPx(value: number, baseValue?: number): string {
  let relativeValue = 0;

  if (typeof value === "string") {
    relativeValue = parseFloat(value);
  }

  if (baseValue) {
    relativeValue *= baseValue;
  }

  return relativeValue === 0 ? "0" : `${relativeValue}px`;
}
