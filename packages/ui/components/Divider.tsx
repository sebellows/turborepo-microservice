import { forwardRefAs } from "../shared";
import { ColorTintKey, ColorVariantKey } from "../theme/color.types";
import { classNames } from "../shared/utils/classNames";
import { Box } from "./Box";

const axes = {
  x: "w",
  y: "h",
};

type DividerProps = {
  children?: never;
  variant?: ColorVariantKey;
  tint?: ColorTintKey
  margin?: number;
  axis?: keyof typeof axes;
  className?: string;
};

const defaultProps = {
  axis: 'x',
  margin: 4,
  tint: '600',
}

const resolveClassNames = (props: DividerProps) => {
  const { className, variant, margin, tint, axis } = { ...defaultProps, ...props }

  const classes: string[] = []
  if (variant) {
    classes.push(`bg-${variant}-${tint}`)
  }
  if (axis === 'x') {
    classes.push('my-0', `mx-${margin}`, 'h-auto', `w-${margin}`)
  } else {
    classes.push('mx-0', `my-${margin}`, 'w-auto', `h-${margin}`)
  }

  return classNames(classes, className)
}

export const Divider = forwardRefAs<'div', DividerProps>((props, ref) => {
  const { className, variant, margin, tint, axis, ...attrs } = props
  const classes = resolveClassNames({ className, variant, margin, tint, axis })

  return <Box role="separator" className={classes} ref={ref} {...attrs} />
})
