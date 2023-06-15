import { forwardRef } from 'react'
import { Box, BoxProps, HeadingLevel, useTW, useVariant } from "@trms/ui";
import { classNames } from "@trms/utils";

export type CardProps = {
  inverted?: boolean
  level?: HeadingLevel
  muted?: boolean
} & BoxProps

const cardDefaults: Partial<BoxProps> = {
  border: 'DEFAULT',
  borderStyle: 'solid',
  p: '4',
  radius: 'DEFAULT',
  shadow: 'DEFAULT',
}

export const Card = forwardRef<Box, CardProps>(({
  children,
  className,
  muted = false,
  variant = 'default',
  ...props
}, ref) => {
  const [uiClasses, attrProps] = useTW({ ...cardDefaults, ...props})
  const variantScheme = useVariant(variant, props?.inverted)
  const variantClasses = [variantScheme.bgInteractive, variantScheme.border, variantScheme.foreground]

  return (
    <Box className={classNames(variantClasses, uiClasses, className)} ref={ref} {...attrProps}>{children}</Box>
  )
})

export const CardBody = forwardRef<Box, CardProps>(
  ({ as: Tag = 'div', flex = 'auto', py = '3', px = '4', ...props }, ref) => {
    return <Box as={Tag} flex={flex} py={py} px={px} {...props} ref={ref} />
  },
)

export type CardMediaProps = {
  aspectRatio?: string
  focusable?: boolean
  placeholder?: boolean
  placement?: 'top' | 'bottom' | 'fill'
  label?: string
  title?: string
  width?: number | string
  height?: number | string
} & BoxProps

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

export const CardMedia = forwardRef<SVGSVGElement, CardMediaProps>(
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