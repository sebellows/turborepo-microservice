import { SpacingValues } from "./spacing";
import { setPropertyMap, setUnitValuePropertyMap } from "./style.utils";

export const DisplayValues = [
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "hidden",
  "table",
  "inline-table",
] as const;

export const Positions = [
  "absolute",
  "fixed",
  "relative",
  "static",
  "sticky",
] as const;

export const Placement = [
  // "inset",
  // "inset-x",
  // "inset-y",
  // "space-x",
  // "space-y",
  "start",
  "end",
  "top",
  "right",
  "bottom",
  "left",
] as const;

export const PlacementValues = [
  ...SpacingValues,
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4",
  "full",
  "auto",
] as const;

const OverflowValues = [
  "auto",
  "hidden",
  "clip",
  "visible",
  "scroll",
  "x-auto",
  "y-auto",
  "x-hidden",
  "y-hidden",
  "x-clip",
  "y-clip",
  "x-visible",
  "y-visible",
  "x-scroll",
  "y-scroll",
] as const;
const display = setPropertyMap(DisplayValues);
const overflow = setPropertyMap(OverflowValues, "overflow");
const position = setPropertyMap(Positions);
const placement = setUnitValuePropertyMap(Placement, PlacementValues);

export const layout = {
  display,
  overflow,
  position,
  ...placement,
};
