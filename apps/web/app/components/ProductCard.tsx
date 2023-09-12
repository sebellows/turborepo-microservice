import { Box, BoxProps, Link, Stack, Text, forwardRefAs } from '@trms/ui'
import { CardScrim } from './Card'

type ProductCardProps = {
  altText: string
  ariaLabel: string
  discount?: string
  href: string
  id: string
  imageUrl: string
  index?: number
  imageWidth: number | string
  imageHeight: number | string
  kicker?: string
  currentPrice: string
  previousPrice?: string
  subtitle?: string
  swatches?: { name: string; src: string; width?: number; height?: number }[]
  title: string
} & BoxProps

export const ProductCard = forwardRefAs(
  (
    {
      altText = '',
      ariaLabel,
      currentPrice,
      discount,
      previousPrice,
      href,
      id,
      imageUrl,
      imageWidth = 400,
      imageHeight = 600,
      index = 0,
      kicker,
      subtitle,
      swatches,
      title,
      ...props
    }: ProductCardProps,
    ref,
  ) => {
    return (
      <Box
        className="product-card"
        data-el-type="Card"
        data-testid="product-card"
        ref={ref}
        position="relative"
        mb="4"
        style={{ maxWidth: '592px' }}
        {...props}
      >
        <Box as="figure">
          <CardScrim
            className="product-card__link-overlay"
            data-testid="product-card__link-overlay"
            href={href}
          >
            {title}
          </CardScrim>
          <Link
            aria-label={ariaLabel}
            className="product-card__img-link-overlay"
            data-el-type="Hero"
            data-testid="product-card__img-link-overlay"
            href={href}
            display="block"
            zIndex="1"
            position="relative"
          >
            <Box className="wall-image-loader" data-testid="wall-image-loader">
              <img
                alt={altText}
                className="w-fill h-auto block transition-opacity product-card__hero-image"
                loading="eager"
                sizes=""
                src={imageUrl}
              />
              <noscript>
                <img
                  alt={altText}
                  className="w-fill h-auto block transition-opacity product-card__hero-image"
                  height={imageHeight}
                  loading="lazy"
                  width={imageWidth}
                />
              </noscript>
            </Box>
          </Link>
          <Box position="relative" pt="3" pb="0.5" className="min-h-[185px] product-card__info">
            <Box className="product_msg_info">
              {kicker && (
                <Text
                  as="span"
                  variant="secondary"
                  data-testid="product-card__kicker"
                  className="-mt-0.5 product-card__kicker"
                >
                  {kicker}
                </Text>
              )}
              <Box className="product-card__titles">
                <Text
                  as="span"
                  display="block"
                  fontWeight="medium"
                  className="product-card__title"
                  id={id}
                  role="link"
                >
                  {title}
                </Text>
                {subtitle && (
                  <Text as="span" muted={true} className="product-card__subtitle" role="link">
                    {subtitle}
                  </Text>
                )}
              </Box>
            </Box>
            {swatches?.length && (
              <Box
                className="product-card__swatches-wrapper"
                data-testid="product-card__swatches-wrapper "
              >
                <Stack
                  as="ul"
                  orientation="horizontal"
                  display="flex"
                  className="product-card__swatches-list"
                >
                  {swatches.map(swatch => {
                    const { src, name, ...dimensions } = swatch
                    return (
                      <Box key={name}>
                        <img src={src} alt={name} {...dimensions} tabIndex={0} role="button" />
                      </Box>
                    )
                  })}
                </Stack>
              </Box>
            )}
            <Box className="product-card__price" data-testid="product-card__price" role="link">
              <Box className="product-price__wrapper">
                <Text
                  as="span"
                  fontWeight="medium"
                  pr="1.5"
                  className="product-price is--current-price"
                  data-testid="product-price"
                  role="link"
                >
                  {currentPrice}
                </Text>
                {previousPrice && (
                  <Text
                    as="s"
                    muted={true}
                    className="product-price is--previous-price"
                    data-testid="product-price"
                    role="link"
                  >
                    {previousPrice}
                  </Text>
                )}
              </Box>
              {discount && (
                <Text
                  mb="0"
                  mt="2"
                  textColor="red-500"
                  fontWeight="medium"
                  className="product-card__discount"
                >
                  {discount}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  },
)
