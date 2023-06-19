import React from "react";
import {
  ColorVariantKey,
  UIComponentProps,
  UIStyleCategory,
} from "@trms/theme";
import { classNames } from "@trms/utils";

import { AsComponentProps, forwardRefAs } from "../../shared";
import { useTW } from "../../hooks";

type UIThemeProps = {
  interactive?: boolean;
  inverted?: boolean;
  muted?: boolean;
  variant?: ColorVariantKey;
};

export type UIProps<P = {}> = {
  className?: string | undefined;
  excludeProps?: (keyof P | string)[];
  // role?: string;
  // type?: string;
} & UIThemeProps &
  Omit<UIComponentProps, keyof P>

export type WrapUIProps<
  As extends React.ElementType = React.ElementType,
  P = {}
> = AsComponentProps<
  As,
  UIProps<P>
>;

const throwIfInvalidTag = (
  as: React.ElementType,
  validTags: React.ElementType[] = []
) => {
  if (validTags?.length && !validTags.includes(as)) {
    throw new TypeError(
      `${as} is not a valid HTML element to create this component type.`
    );
  }
};

type AsTags<As extends React.ElementType = React.ElementType> = As[];

type ComponentFactoryConfig<
  As extends React.ElementType,
  P extends UIProps<P>,
> = {
  as?: As;
  displayName: string;
  defaultProps?: Partial<P>;
  validTags?: AsTags;
  omittableStyleCategories?: UIStyleCategory[];
};

export const createBox = <
  TInitial extends React.ElementType = React.ElementType,
  Props extends UIProps = UIProps,
>(
  config: ComponentFactoryConfig<TInitial, Props>
) => {
  const {
    as: initialAs = "div",
    defaultProps = {},
    displayName,
    validTags = [],
    omittableStyleCategories = [],
  } = config;

  const UiComponent = forwardRefAs<typeof initialAs, Props>((props, ref) => {
    const {
      as: Tag = initialAs,
      children,
      className,
      excludeProps = [],
      muted,
      interactive,
      inverted,
      variant,
      ...rest
    } = props;

    throwIfInvalidTag(Tag, validTags);

    const [uiProps, nonUIProps] = useTW(rest, [
      ...excludeProps,
      ...omittableStyleCategories,
    ]);

    return (
      <Tag className={classNames(uiProps, className)} ref={ref} {...nonUIProps}>
        {children}
      </Tag>
    );
  });

  if (displayName) {
    UiComponent.displayName = displayName;
  }
  UiComponent.defaultProps = defaultProps;

  type UiComponentType = typeof UiComponent;
  return UiComponent as UiComponentType & {
    defaultProps?: Partial<Props>;
  };
};

const validTextElements = [
  "p",
  "span",
  "a",
  "b",
  "i",
  "em",
  "strong",
  "cite",
  "abbr",
  "code",
  "pre",
  "kbd",
  "small",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "dt",
  "dd",
  "blockquote",
] as AsTags;
const asValidTextTags = [
  "p",
  "span",
  "a",
  "b",
  "i",
  "em",
  "strong",
  "cite",
  "abbr",
  "code",
  "pre",
  "kbd",
  "small",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "dt",
  "dd",
  "blockquote",
] as const

// class InitialTextElement {
//   readonly p: React.ElementType<'p'> = 'p'
// }
// const init = new InitialTextElement()

export const createText = <
  TInitial extends React.ElementType = React.ElementType,
  Props extends UIProps = UIProps,
  As extends React.ElementType = TInitial
>(initialConfig: ComponentFactoryConfig<As, Props>) => {
  const config = {
    as: "p",
    defaultProps: initialConfig?.defaultProps,
    displayName: initialConfig.displayName,
    validTags: validTextElements,
    omittableStyleCategories: initialConfig?.omittableStyleCategories,
  } as ComponentFactoryConfig<As, Props>;

  // @ts-ignore
  return createBox<'p', Props>(config);
};
