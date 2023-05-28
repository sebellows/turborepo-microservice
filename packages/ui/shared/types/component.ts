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
type AsProp<
  As extends React.ElementType = React.ElementType,
  P extends PropertyKey | unknown = unknown
> = {
  as?: As;
  ref?: React.Ref<
    As extends keyof ElementTagNameMap
      ? ElementTagNameMap[As]
      : As extends new (...args: any) => any
      ? InstanceType<As>
      : undefined
  >;
} & Omit<React.ComponentPropsWithoutRef<As>, "as" | keyof P>;

// export interface AsProp<As extends React.ElementType = React.ElementType> {
//   as?: As;
// }

// export interface BsPrefixProps<As extends React.ElementType = React.ElementType>
//   extends AsProp<As> {}

export interface AsRefForwardingComponent<
  TInitial extends React.ElementType,
  P extends PropertyKey | unknown
> {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, AsProp<As, P>>>,
    context?: any
  ): React.ReactElement | null;
  // propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export class AsComponent<
  As extends React.ElementType,
  P = unknown
> extends React.Component<ReplaceProps<As, AsProp<As, P>>> {}

// Need to use this instead of typeof Component to get proper type checking.
export type AsComponentClass<
  As extends React.ElementType,
  P = unknown
> = React.ComponentClass<ReplaceProps<As, AsProp<As, P>>>;
