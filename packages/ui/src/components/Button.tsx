import { Children, PropsWithChildren, useMemo } from "react";
import { ColorVariantKey } from '@trms/theme'
import { classNames, isNil } from "@trms/utils";

import { forwardRefAs } from "../shared";
import { useVariant } from "../hooks";

import { Box, BoxProps } from "./Box";
import { Text } from './Text'
import { Spinner } from "./Spinner";

type LoadingBoxProps = Partial<Pick<BoxProps, 'radius'>> & {
  backgroundColor?: string
  zIndex?: number
}

const LoadingBox = forwardRefAs<"span", PropsWithChildren<LoadingBoxProps>>(
  ({ as: Tag = "span", children }, ref) => {
    return (
      <Tag
        ref={ref}
        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      >{children}</Tag>
    );
  }
);

const resolveBaseStyles = ({ size, wide, block, square, circle }: ButtonProps) => {
  const classes: string[] = []

  switch (size) {
    case 'sm':
      classes.push('text-sm')
      if (square || circle) {
        classes.push('h-8', 'w-8', 'p-0')
      } else {
        classes.push('px-2', 'py-1')
      }
      break
    case 'lg':
      classes.push('text-lg')
      if (square || circle) {
        classes.push('h-8', 'w-8', 'p-0')
      } else {
        classes.push('px-6', 'py-3')
      }
      break
    case 'md':
    default:
      classes.push('text-base')
      if (square || circle) {
        classes.push('h-8', 'w-8', 'p-0')
      } else {
        classes.push('px-3', 'py-1.5')
      }
  }

  if (circle) {
    classes.push('rounded-full')
  } else if (wide) {
    classes.push('w-64')
  } else if (block) {
    classes.push('w-full')
  }

  return classes
}

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  selected?: boolean;
  type?: "button" | "submit";
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  wide?: boolean
  square?: boolean
  circle?: boolean
  variant?: ColorVariantKey;
} & Partial<BoxProps>

export const useVariantButton = ({ variant = 'default', muted, outline, ...props }: ButtonProps) => {
  const [_variantScheme, variantClasses] = useVariant(variant, { muted, interactive: true, inverted: outline, schemeKeys: ['bg', 'border', 'borderInteractive', 'fgInteractive', 'text'] })
  const btnClasses = resolveBaseStyles(props)

  return {
    bg: outline ? 'transparent' : variantClasses?.bg,
    text: outline ? variantClasses?.fgInteractive : variantClasses?.text,
    border: outline ? variantClasses?.borderInteractive : variantClasses?.border,
    uiClasses: btnClasses,
  }
}

const buttonDefaults: Pick<BoxProps, 'border' | 'borderStyle' | 'display' | 'radius'> = {
  radius: 'DEFAULT',
  border: 'DEFAULT',
  borderStyle: 'solid',
  display: 'flex',
}

export const Button = forwardRefAs<"button", ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading,
      selected,
      type = "button",
      // Variant props
      size, wide, block, square, circle, variant,
      ...props
    },
    ref
  ) => {
    const { bg, text, border, uiClasses } = useVariantButton({
      size,
      wide,
      block,
      square,
      circle,
      variant,
    })
    // const [twClasses, attrProps] = useTW({ ...buttonDefaults, ...props })
    const classes = classNames(bg, border, text, uiClasses, className);

    const isDisabled = useMemo(
      () => Boolean(loading || disabled),
      [loading, disabled],
    )

    // const ChildWrapper = ({ children: child }: PropsWithChildren<{}>) => {
    //   if (typeof child === 'string') {
    //     return <Text as='span' className={classNames(text)}>{child}</Text>
    //   }

    //   return (
    //     <Box as="span" className={classNames(text)}>
    //       {child}
    //     </Box>
    //   );
    // }

    return (
      <Box
        as="button"
        className={classNames(classes, uiClasses, className)}
        data-disabled={isDisabled}
        data-selected={selected ? "" : undefined}
        disabled={isDisabled}
        ref={ref}
        type={type}
        {...buttonDefaults}
        {...props}
      >
        {!!loading && (
          <LoadingBox>
            <Spinner />
          </LoadingBox>
        )}

        {children}
        {/* {Children.map(children, (child) =>
          !isNil(child) ? <ChildWrapper children={child} /> : null
        )} */}
      </Box>
    );
  }
);
