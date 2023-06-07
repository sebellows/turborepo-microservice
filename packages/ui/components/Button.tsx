import { PropsWithChildren, useMemo } from "react";

import { forwardRefAs } from "../shared";
import { ColorVariantKey } from "../theme/color.types";

import { Box } from "./Box";
import { Inline } from "./Inline";
import { Spinner } from "./Spinner";
import { classNames } from "@trms/utils";

type LoadingBoxProps = {
  backgroundColor?: string
  borderRadius?: string
  zIndex?: number
}
const LoadingBox = forwardRefAs<"span", PropsWithChildren<LoadingBoxProps>>(
  ({ as: Tag = "span", className, children }, ref) => {
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
    case 'md':
      classes.push('text-base')
      if (square || circle) {
        classes.push('h-8', 'w-8', 'p-0')
      } else {
        classes.push('px-3', 'py-1.5')
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

const resolveVariant = (variant: ColorVariantKey, outline?: boolean) => {
  if (variant === 'default' || variant === "neutral") {
    if (outline) {
      return [
        `text-neutral-900`,
        `bg-neutral-100`,
        `hover:bg-neutral-200`,
        `focus:bg-neutral-300`,
        `disabled:opacity-75`,
        `border-neutral-900`,
        `hover:border-neutral-950`,
        `focus:border-neutral-950`,
        // dark
        `dark:text-neutral-100`,
        `dark:bg-neutral-900`,
        `dark:hover:bg-neutral-950`,
        `dark:focus:bg-neutral-950`,
        `dark:border-neutral-100`,
        `dark:hover:border-neutral-200`,
        `dark:focus:border-neutral-300`,
        `dark:disabled:opacity-75`,
      ];
    }

    return [
      `text-neutral-900`,
      `bg-neutral-300`,
      `hover:bg-neutral-400`,
      `focus:bg-neutral-500`,
      `border-neutral-400`,
      `hover:border-neutral-500`,
      `focus:border-neutral-600`,
      `disabled:opacity-75`,
    ];
  }

  if (outline) {
    return [
      `text-${variant}-600`,
      `bg-neutral-100`,
      `hover:bg-neutral-200`,
      `focus:bg-neutral-300`,
      `border-${variant}-600`,
      `hover:border-${variant}-700`,
      `focus:border-${variant}-800`,
      `disabled:opacity-75`,
      // dark
      `text-${variant}-400`,
      `dark:bg-neutral-900`,
      `dark:hover:bg-neutral-950`,
      `dark:focus:bg-neutral-950`,
      `dark:border-${variant}-400`,
      `dark:hover:border-${variant}-500`,
      `dark:focus:border-${variant}-600`,
      `dark:disabled:opacity-75`,
    ];
  }

  return [
    `text-white`,
    `bg-${variant}-600`,
    `hover:bg-${variant}-700`,
    `focus:bg-${variant}-800`,
    `border-${variant}-300`,
    `hover:border-${variant}-400`,
    `focus:border-${variant}-500`,
    `disabled:opacity-75`,
  ];
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
};

export const Button = forwardRefAs<"button", ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading,
      outline,
      selected,
      type = "button",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const variantClasses = useMemo(() => resolveVariant(variant, outline), [variant, outline])
    const classes = resolveBaseStyles(props)
    const isDisabled = useMemo(
      () => Boolean(loading || disabled),
      [loading, disabled]
    );

    return (
      <Box
        as="button"
        className={classNames(classes, variantClasses, className)}
        data-disabled={isDisabled}
        data-selected={selected ? '' : undefined}
        disabled={isDisabled}
        ref={ref}
        type={type}
        {...props}
      >
        {!!loading && (
          <LoadingBox>
            <Spinner />
          </LoadingBox>
        )}

        <Inline as="span" align={align}>
          {children}
        </Inline>
      </Box>
    )
  }
);