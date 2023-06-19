import { PropsWithChildren } from 'react'
import {
  Box,
  BoxProps,
  HeadingLevel,
  forwardRefAs,
  useTW,
  useVariant,
} from "@trms/ui";
import { classNames } from "@trms/utils";

export type CardProps = {
  inverted?: boolean
  level?: HeadingLevel
  muted?: boolean
} & PropsWithChildren<BoxProps>

const cardDefaults: Partial<BoxProps> = {
  border: 'DEFAULT',
  borderStyle: 'solid',
  p: '4',
  radius: 'DEFAULT',
  shadow: 'DEFAULT',
}

const Card = forwardRefAs<'div', CardProps>(
  (
    { as: Tag = 'div', children, className, muted = false, variant = "default", ...props },
    ref
  ) => {
    const [_, attrProps] = useTW(props);
    const variantScheme = useVariant(variant, props?.inverted);
    const variantClasses = [
      variantScheme.bgInteractive,
      variantScheme.border,
      variantScheme.foreground,
    ];

    return (
      <Box
        as={Tag}
        className={classNames(variantClasses, className)}
        ref={ref}
        {...cardDefaults}
        {...attrProps}
      >
        {children}
      </Box>
    );
  }
);
Card.displayName = 'Card'

const CardBody = forwardRefAs<'div', CardProps>(
  ({ as: Tag = 'div', flex = 'auto', py = '3', px = '4', ...props }, ref) => {
    return <Box as={Tag} flex={flex} py={py} px={px} {...props} ref={ref} />
  },
)
CardBody.displayName = 'CardBody'

export type CardMediaProps = {
  aspectRatio?: string
  fill?: string
  focusable?: boolean
  labelFill?: string
  placeholder?: boolean
  placement?: 'top' | 'bottom' | 'fill'
  label?: string
  title?: string
  width?: number | string
  height?: number | string
} & Partial<BoxProps>

const getMediaPlacementProps = (placement: CardMediaProps['placement']): Partial<BoxProps> => {
  if (placement === 'bottom') {
    return {
      radiusB: 'DEFAULT',
    }
  }
  if (placement === 'fill') {
    return {
      radius: 'DEFAULT',
      position: 'absolute',
      top: '0',
      left: '0',
    }
  }

  return {
    radiusT: 'DEFAULT',
  }
}

const CardMedia = forwardRefAs<'svg', CardMediaProps>(
  (
    {
      aspectRatio = 'xMidYMid slice',
      className,
      fill = '#868e96',
      focusable = false,
      label = 'Card Image',
      labelFill = '#dee2e6',
      placement = 'top',
      placeholder = true,
      title = 'Placeholder',
      width = '100%',
      height: initialHeight,
      ...props
    },
    ref,
  ) => {
    const placementProps = getMediaPlacementProps(placement)
    const [uiClasses] = useTW({ ...placementProps, ...props })
    const height = placement === 'fill' ? '100%' : initialHeight ?? 180

    return (
      <svg
        className={classNames(uiClasses)}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={label}
        preserveAspectRatio={aspectRatio}
        focusable={focusable}
        ref={ref}
      >
        <title>{title}</title>
        <rect width="100%" height="100%" fill={fill}></rect>
        <text x="50%" y="50%" fill={labelFill} dy=".3em">
          {label}
        </text>
      </svg>
    )
  },
)
CardMedia.displayName = 'CardMedia'

export { Card, CardBody, CardMedia }
