import { WithBreakpoint } from "./breakpoints";
import { setUnitValuePropertyMap } from "./style.utils";

export const SpacingValues = [
  "px", // '1px'
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
] as const;
export type SpacingNumber = (typeof SpacingValues)[number];

export const MarginValues = [...SpacingValues, "auto"] as const;

export const MarginClasses = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "me",
  "ms",
  "mx",
  "my",
] as const;
export type MarginClass = (typeof MarginClasses)[number];

export const PaddingClasses = [
  "p",
  "px",
  "py",
  "ps",
  "pe",
  "pt",
  "pr",
  "pb",
  "pl",
] as const;
export type PaddingClass = (typeof PaddingClasses)[number];

/**
 * Can be either: `8` | `{ md: 8, lg: 12 }`
 */
export type SpacingValue =
  | string
  | SpacingNumber
  | WithBreakpoint<SpacingNumber>;

/**
 * Can be a mix of property keys with numeric or breakpoint object values:
 * @example
 * { mb: 8, mt: { sm: 8, lg: 16 }, p: 4 }
 */
export type SpacingProps = Record<MarginClass, SpacingValue>;

export const spacing = {
  ...setUnitValuePropertyMap(MarginClasses, MarginValues),
  ...setUnitValuePropertyMap(PaddingClasses, SpacingValues),
};
