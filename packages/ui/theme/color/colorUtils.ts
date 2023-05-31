import { isNil } from "../../shared";

const hexFormatRE = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
const hexAlphaFormatRE = /^#[0-9a-f]{8}/i;
const rgbFormatRE = /^rgb?a\((:?(\d{1,3}?,?\s){3}(:?(0(:?\.\d+)|1)))\)/i;
// for capturing the params of an `rgb(a)` color
const rgbParamsRE = /(?<=rgb?a\()(.+?)(?=\))/i;
const hslFormatRE =
  /^hsl?a\((:?\d{1,3}?,?\s\d{1,3}%?,?\s\d{1,3}%?,?\s(:?(0(:?\.\d+)|1)))\)/i;
// for capturing the params of an `hsl(a)` color
const hslParamsRE = /(?<=hsl?a\()(.+?)(?=\))/i;

/**
 * Check if color is a valid hex color.
 * - hex color should start with "#"
 * - hex can be set RGB (e.g., "#fff"), or
 * - hex can be set RRGGBB (e.g., "#ffffff"), or
 * - hex can have alpha and set as RRGGBBAA (e.g., "#ffffff0a")
 */
export const isHexColor = (color: string) => {
  if (isNil(color)) return false;

  return hexFormatRE.test(color) || hexAlphaFormatRE.test(color);
};

export const hasAlphaChannel = (color: string) => {
  if (
    color.startsWith("rgba") ||
    hexAlphaFormatRE.test(color) ||
    color.startsWith("hsla")
  ) {
    return true;
  }

  return false;
};

export const isRGB = (color: string) => {
  let isValid = rgbFormatRE.test(color);

  if (!isValid) return false;

  // extract the parameters from the `rgb(a)` value
  const rgbParams = color.match(rgbParamsRE)?.[0];

  if (!rgbParams?.length) {
    throw new Error(
      `Possible rgb(a) color is malformed. 'isRGB' was passed value of "${color}".`
    );
  }

  const values = rgbParams.split(",").map((v) => v.trim());

  let i = 0;

  for (const value of values) {
    let numValue = parseFloat(value);
    if (
      numValue < 0 ||
      (i === 3 && numValue > 1) ||
      (i < 3 && numValue > 255)
    ) {
      isValid = false;
      break;
    }
    i++;
  }

  return isValid;
};

export const isHSL = (color: string) => {
  let isValid = hslFormatRE.test(color);

  if (!isValid) return false;

  // extract the parameters from the `rgb(a)` value
  const hslParams = color.match(hslParamsRE)?.[0];

  if (!hslParams?.length) {
    throw new Error(
      `Possible rgb(a) color is malformed. 'isRGB' was passed value of "${color}".`
    );
  }

  const values = hslParams.split(",").map((v) => v.trim());

  let i = 0;

  for (const value of values) {
    let numValue = parseFloat(value);
    if (
      numValue < 0 ||
      (i === 0 && numValue > 360) ||
      (i > 0 && i < 3 && (!value.endsWith("%") || numValue > 100)) ||
      (i === 3 && numValue > 1)
    ) {
      isValid = false;
      break;
    }
    i++;
  }

  return isValid;
};

export const isValidColor = (color: string) => {
  const el = document.createElement("div");
  el.style.backgroundColor = color;
  return el.style.backgroundColor ? true : false;
};
