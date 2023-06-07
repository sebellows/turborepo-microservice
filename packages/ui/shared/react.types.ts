import React from "react";

type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<
    SVGElementTagNameMap,
    Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
  >;

export type ReplaceProps<
  Inner extends React.ElementType,
  P extends PropertyKey | unknown
> = P extends PropertyKey
  ? Omit<React.ComponentPropsWithRef<Inner>, P> & P
  : React.ComponentPropsWithRef<Inner>;

// export interface BsPrefixOnlyProps {
//   bsPrefix?: string;
// }
export type AsProp<
  As extends React.ElementType = React.ElementType,
  P = unknown
> = {
  as?: As;
  ref?: React.Ref<
    As extends keyof ElementTagNameMap
      ? ElementTagNameMap[As]
      : As extends new (...args: any) => any
      ? InstanceType<As>
      : undefined
  >;
} & Omit<React.PropsWithoutRef<As>, "as"> &
  P;

/** @see {React.ForwardRefRenderFunction} */
export type RefForwardingComponentAs<
  TInitial extends React.ElementType,
  P = unknown
> = {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, AsProp<As> & P>>,
    context?: any
  ): React.ReactElement | null;
  defaultProps?: never | undefined;
  propTypes?: never | undefined;
  displayName?: string;
};

// export class AsComponent<
//   As extends React.ElementType,
//   P = unknown
// > extends React.Component<ReplaceProps<As, AsProp<As> & P>> {}

export interface HTMLElements {
  // HTML
  a: HTMLAnchorElement;
  abbr: HTMLElement;
  address: HTMLElement;
  area: HTMLAreaElement;
  article: HTMLElement;
  aside: HTMLElement;
  audio: HTMLAudioElement;
  b: HTMLElement;
  base: HTMLBaseElement;
  bdi: HTMLElement;
  bdo: HTMLElement;
  big: HTMLElement;
  blockquote: HTMLQuoteElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  caption: HTMLElement;
  center: HTMLElement;
  cite: HTMLElement;
  code: HTMLElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLDataElement;
  datalist: HTMLDataListElement;
  dd: HTMLElement;
  del: HTMLModElement;
  details: HTMLDetailsElement;
  dfn: HTMLElement;
  dialog: HTMLDialogElement;
  div: HTMLDivElement;
  dl: HTMLDListElement;
  dt: HTMLElement;
  em: HTMLElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  figcaption: HTMLElement;
  figure: HTMLElement;
  footer: HTMLElement;
  form: HTMLFormElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  head: HTMLHeadElement;
  header: HTMLElement;
  hgroup: HTMLElement;
  hr: HTMLHRElement;
  html: HTMLHtmlElement;
  i: HTMLElement;
  iframe: HTMLIFrameElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  kbd: HTMLElement;
  keygen: HTMLElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  main: HTMLElement;
  map: HTMLMapElement;
  mark: HTMLElement;
  menu: HTMLElement;
  menuitem: HTMLElement;
  meta: HTMLMetaElement;
  meter: HTMLMeterElement;
  nav: HTMLElement;
  noindex: HTMLElement;
  noscript: HTMLElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  output: HTMLOutputElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement;
  picture: HTMLElement;
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  rp: HTMLElement;
  rt: HTMLElement;
  ruby: HTMLElement;
  s: HTMLElement;
  samp: HTMLElement;
  slot: HTMLSlotElement;
  script: HTMLScriptElement;
  section: HTMLElement;
  select: HTMLSelectElement;
  small: HTMLElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  style: HTMLStyleElement;
  sub: HTMLElement;
  summary: HTMLElement;
  sup: HTMLElement;
  table: HTMLTableElement;
  template: HTMLTemplateElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableHeaderCellElement;
  thead: HTMLTableSectionElement;
  time: HTMLTimeElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  u: HTMLElement;
  ul: HTMLUListElement;
  var: HTMLElement;
  video: HTMLVideoElement;
  wbr: HTMLElement;
  webview: HTMLWebViewElement;

  // SVG
  svg: SVGSVGElement;

  animate: SVGElement; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
  animateMotion: SVGElement;
  animateTransform: SVGElement; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
  circle: SVGCircleElement;
  clipPath: SVGClipPathElement;
  defs: SVGDefsElement;
  desc: SVGDescElement;
  ellipse: SVGEllipseElement;
  feBlend: SVGFEBlendElement;
  feColorMatrix: SVGFEColorMatrixElement;
  feComponentTransfer: SVGFEComponentTransferElement;
  feComposite: SVGFECompositeElement;
  feConvolveMatrix: SVGFEConvolveMatrixElement;
  feDiffuseLighting: SVGFEDiffuseLightingElement;
  feDisplacementMap: SVGFEDisplacementMapElement;
  feDistantLight: SVGFEDistantLightElement;
  feDropShadow: SVGFEDropShadowElement;
  feFlood: SVGFEFloodElement;
  feFuncA: SVGFEFuncAElement;
  feFuncB: SVGFEFuncBElement;
  feFuncG: SVGFEFuncGElement;
  feFuncR: SVGFEFuncRElement;
  feGaussianBlur: SVGFEGaussianBlurElement;
  feImage: SVGFEImageElement;
  feMerge: SVGFEMergeElement;
  feMergeNode: SVGFEMergeNodeElement;
  feMorphology: SVGFEMorphologyElement;
  feOffset: SVGFEOffsetElement;
  fePointLight: SVGFEPointLightElement;
  feSpecularLighting: SVGFESpecularLightingElement;
  feSpotLight: SVGFESpotLightElement;
  feTile: SVGFETileElement;
  feTurbulence: SVGFETurbulenceElement;
  filter: SVGFilterElement;
  foreignObject: SVGForeignObjectElement;
  g: SVGGElement;
  image: SVGImageElement;
  line: SVGLineElement;
  linearGradient: SVGLinearGradientElement;
  marker: SVGMarkerElement;
  mask: SVGMaskElement;
  metadata: SVGMetadataElement;
  mpath: SVGElement;
  path: SVGPathElement;
  pattern: SVGPatternElement;
  polygon: SVGPolygonElement;
  polyline: SVGPolylineElement;
  radialGradient: SVGRadialGradientElement;
  rect: SVGRectElement;
  stop: SVGStopElement;
  switch: SVGSwitchElement;
  symbol: SVGSymbolElement;
  text: SVGTextElement;
  textPath: SVGTextPathElement;
  tspan: SVGTSpanElement;
  use: SVGUseElement;
  view: SVGViewElement;
}
