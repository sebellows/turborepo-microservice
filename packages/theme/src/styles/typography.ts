import { _Range10, _Range6 } from "./constants";
import { setPropertyMap } from "./style.utils";

const FontFamilies = ["sans", "serif", "mono"] as const;
const FontSizes = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "display1", // custom
  "display2", // custom
] as const;
const FontWeights = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
];
const Tracking = ["tighter", "tight", "normal", "wide", "wider", "widest"];
const Leading = [
  ..._Range10,
  "none", // 1
  "tight", // 1.25
  "snug", // 1.375
  "normal", // 1.5
  "relaxed", // 1.625
  "loose", // 2
];
const TextAlignments = [
  "left",
  "right",
  "center",
  "justify",
  "start",
  "end",
] as const;
const TextOverflow = ["ellipsis", "clip"] as const;
const ClampableLines = [..._Range6, "none"] as const;
const ListStyles = ["none", "disc", "decimal"] as const;
const Truncate = ["truncate"] as const;

const fontFamily = setPropertyMap(FontFamilies, "font");
const fontSize = setPropertyMap(FontSizes, "text");
const fontStyle = {
  italic: "italic",
  regular: "not-italic",
};
const fontWeight = setPropertyMap(FontWeights, "font");
const leading = setPropertyMap(Leading, "leading");
const tracking = setPropertyMap(Tracking, "tracking");
const lineClamp = setPropertyMap(ClampableLines, "line-clamp");
const listPosition = {
  inside: "list-inside",
  outside: "list-outside",
};
const listStyle = setPropertyMap(ListStyles, "list");
const textAlign = setPropertyMap(TextAlignments, "text");
const textOverflow = setPropertyMap(TextOverflow, "text-overflow");
const truncate = setPropertyMap(Truncate, "");

export const typography = {
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  leading,
  tracking,
  lineClamp,
  listPosition,
  listStyle,
  textAlign,
  textOverflow,
  truncate,
};
