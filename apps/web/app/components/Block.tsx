import { PropsWithChildren, useMemo } from 'react'
import { Box, BoxProps, HeadingLevel, forwardRefAs, useTW, useVariant } from '@trms/ui'
import { classNames } from '@trms/utils'

export type BlockProps = {
  fill?: boolean
  inverted?: boolean
  level?: HeadingLevel
  muted?: boolean
} & PropsWithChildren<BoxProps>

const blockDefaults: Partial<BoxProps> = {
  display: 'flex',
  flexDirection: 'col',
  p: '0',
  position: 'relative',
}

const Block = forwardRefAs<'div', BlockProps>(
  (
    { children, className, fill = false, inverted, muted = false, variant = 'default', ...props },
    ref,
  ) => {
    // const [uiProps, attrProps] = useTW(props);
    const [_variantScheme, _variantClasses] = useVariant(variant, {
      interactive: fill,
      inverted,
      muted,
      schemeKeys: ['text'],
    })
    const variantClasses = useMemo(() => Object.values(_variantClasses).flat(), [_variantClasses])

    return (
      <Box className={classNames(variantClasses, className)} ref={ref} {...blockDefaults} {...props}>
        {children}
      </Box>
    )
  },
)
Block.displayName = 'Block'

const BlockBody = forwardRefAs<'div', BlockProps>(
  ({ as: Tag = 'div', display = 'flex', flexDirection = 'col', flex = '1', ...props }, ref) => {
    return <Box as={Tag} flex={flex} position="relative" zIndex="20" {...props} ref={ref} />
  },
)
BlockBody.displayName = 'BlockBody'

export type BlockMediaProps = {
  absoluteFill?: boolean
  altText?: string
  aspectRatio?: string
  fill?: string
  focusable?: boolean
  src?: string
  width?: number | string
  height?: number | string

  labelText?: string
  placeholderTextColor?: string
  title?: string
} & Partial<BoxProps>

const resolveMediaProps = (props: BlockMediaProps): Partial<BoxProps> => {
  const { absoluteFill, position = 'relative', w = 'full', h = '44', ...rest } = props

  if (absoluteFill) {
    return {
      ...rest,
      position: 'absolute',
      top: '0',
      left: '0',
      w: 'full',
      h: 'full',
    }
  }

  return {
    ...rest,
    position,
    w,
    h,
  }
}

const BlockMedia = forwardRefAs<'svg', BlockMediaProps>(
  (
    {
      altText = 'Placeholder',
      aspectRatio = 'xMidYMid slice',
      className,
      fill = '#868e96',
      focusable = false,
      labelText = 'Block Image',
      placeholderTextColor = '#dee2e6',
      src,
      ...props
    },
    ref,
  ) => {
    const [uiClasses, attrs] = useTW(resolveMediaProps(props))

    return src ? (
      <img
        className={classNames(uiClasses)}
        alt={altText}
        aria-label={labelText}
        src={src}
        {...attrs}
        ref={ref}
      />
    ) : (
      <Box
        as="svg"
        className={classNames(uiClasses)}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={labelText}
        preserveAspectRatio="xMidYMid slice"
        focusable={focusable}
        {...attrs}
        ref={ref}
      >
        <title>{altText}</title>
        <rect width="100%" height="100%" fill={fill}></rect>
        <text textAnchor="middle" x="50%" y="50%" fill={placeholderTextColor} dy=".3em">
          {labelText}
        </text>
      </Box>
    )
  },
)
BlockMedia.displayName = 'BlockMedia'

export { Block, BlockBody, BlockMedia }
