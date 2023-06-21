import { ElementType, forwardRef } from "react";

import { IntrinsicElement, RefForwardingComponentAs } from "./react.types";

export const forwardRefAs = <As extends React.ElementType = ElementType, P = unknown>(
  render: RefForwardingComponentAs<IntrinsicElement<As>, P>
) => {
  return forwardRef(render) as any;
};

export const getChildTag = (parentTag?: ElementType) => {
  switch (parentTag) {
    case "ul":
    case "ol":
      return "li";
    default:
      return "div";
  }
};

const blockLevelTags = [
  "address",
  "article",
  "aside",
  "blockquote",
  "canvas",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "noscript",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "tfoot",
  "ul",
  "video",
];

const inlineLevelTags = [
  "a",
  "abbr",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "button",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "map",
  "object",
  "output",
  "q",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "textarea",
  "time",
  "tt",
  "var",
];

export const isBlockLevelTag = <As extends React.ElementType | string>(tag: As) =>
  blockLevelTags.indexOf(String(tag)) > -1;

export const isInlineLevelTag = <As extends React.ElementType | string>(tag: As) =>
  inlineLevelTags.indexOf(String(tag)) > -1;
