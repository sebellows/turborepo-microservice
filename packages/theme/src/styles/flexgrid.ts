import {
  _BaseAlignments,
  _DispersedAlignments,
  _Range12,
  _Range6,
} from "./constants";
import { SpacingValues } from "./spacing";
import { setPropertyMap, setUnitValuePropertyMap } from "./style.utils";

export const FlexGridRows = [..._Range6, "none"] as const;
export const GridRowSpans = [..._Range6, "auto", "full"] as const;
export const FlexGridRowPositions = [..._Range6, "7", "auto"] as const;
export const FlexGridCols = [..._Range12, "none"] as const;
export const FlexGridColSpans = [..._Range12, "auto", "full"] as const;
export const FlexGridColPositions = [..._Range12, "13", "auto"] as const;
export const OrderValues = [..._Range12, "first", "last", "none"] as const;

const JustifyAlignments = [..._BaseAlignments, "stretch"] as const;
const ItemAlignments = [..._BaseAlignments, "stretch", "baseline"] as const;
const ContentAlignments = [
  ..._BaseAlignments,
  ..._DispersedAlignments,
  "none",
] as const;
const FlexValues = ["1", "auto", "initial", "none"] as const;
const FlexDirections = ["row", "row-reverse", "col", "col-reverse"] as const;
const FlexWrap = ["wrap", "wrap-reverse", "nowrap"] as const;
const PlaceContent = [...ItemAlignments, ..._DispersedAlignments] as const;
const PlaceSelf = [..._BaseAlignments, "auto", "stretch"] as const;

const alignItems = setPropertyMap(ItemAlignments, "items");
const flexContent = setPropertyMap(ContentAlignments, "content");
const justify = setPropertyMap(JustifyAlignments, "justify");
const flex = setPropertyMap(FlexValues, "flex");
const flexDirection = setPropertyMap(FlexDirections, "flex");
const flexWrap = setPropertyMap(FlexWrap, "flex");
const alignSelf = setPropertyMap(ItemAlignments, "self");
const placeContent = setPropertyMap(PlaceContent, "place-content");
const placeItems = setPropertyMap(ItemAlignments, "place-items");
const placeSelf = setPropertyMap(PlaceSelf, "place-self");
const grow = {
  "1": "grow",
  "0": "grow-0",
};
const shrink = {
  "1": "shrink",
  "0": "shrink-0",
};
const order = setPropertyMap(OrderValues, "order");
const cols = setPropertyMap(FlexGridCols, "grid-cols");
const rows = setPropertyMap(FlexGridRows, "grid-rows");
const colSpan = setPropertyMap(FlexGridColSpans, "col-span", { auto: "col" });
const colStart = setPropertyMap(FlexGridColPositions, "col-start");
const colEnd = setPropertyMap(FlexGridColPositions, "col-end");
const rowSpan = setPropertyMap(GridRowSpans, "row-span", { auto: "row" });
const rowStart = setPropertyMap(FlexGridRowPositions, "row-start");
const rowEnd = setPropertyMap(FlexGridRowPositions, "row-end");

const GapClasses = ["gap", "gapX", "gapY"] as const;
const gap = setUnitValuePropertyMap(GapClasses, SpacingValues);

export const flexgrid = {
  alignItems,
  alignSelf,
  flexContent,
  ...gap,
  justify,
  flex,
  flexDirection,
  flexWrap,
  placeContent,
  placeItems,
  placeSelf,
  grow,
  shrink,
  order,
  cols,
  rows,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
};
