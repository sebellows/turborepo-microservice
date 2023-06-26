import { PropsWithChildren, useMemo } from 'react'
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
  fill?: boolean
  inverted?: boolean
  level?: HeadingLevel
  muted?: boolean
} & PropsWithChildren<BoxProps>

const cardDefaults: Partial<BoxProps> = {
  border: 'DEFAULT',
  borderStyle: 'solid',
  display: 'flex',
  p: '0',
  position: 'relative',
  radius: 'DEFAULT',
  shadow: 'DEFAULT',
}

const Card = forwardRefAs<'div', CardProps>(
  (
    { children, className, fill = false, inverted, muted = false, variant = "default", ...props },
    ref
  ) => {
    // const [uiProps, attrProps] = useTW(props);
    const [_variantScheme, _variantClasses] = useVariant(variant, {
      interactive: fill,
      inverted,
      muted,
      schemeKeys: ['bg', 'border', 'text'],
    })
    const variantClasses = useMemo(() => Object.values(_variantClasses).flat(), [_variantClasses])

    return (
      <Box className={classNames(variantClasses, className)} ref={ref} {...cardDefaults} {...props}>
        {children}
      </Box>
    )
  }
);
Card.displayName = 'Card'

const CardBody = forwardRefAs<'div', CardProps>(
  ({ as: Tag = 'div', flex = 'auto', p = '4', ...props }, ref) => {
    return <Box as={Tag} flex={flex} p={p} position="relative" zIndex='20' {...props} ref={ref} />
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

const CardScrim = ({ href = '#!' }: { href?: string }) => {
  return (
    <Box
      as="a"
      href={href}
      display="block"
      position="absolute"
      top="0"
      left="0"
      w="full"
      h="full"
      zIndex="10"
      className="bg-fixed bg-black opacity-12 transition duration-300 ease-in-out hover:opacity-30"
    />
  )
}
CardScrim.displayName = 'CardScrim'

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
        <text textAnchor='middle' x="50%" y="50%" fill={labelFill} dy=".3em">
          {label}
        </text>
      </svg>
    )
  },
)
CardMedia.displayName = 'CardMedia'

export { Card, CardBody, CardMedia, CardScrim };
