import { Metadata } from 'next'
import { Box, Button, Center, Header, Heading, Link, Stack, Text } from '@trms/ui'

import { Card, CardBody, CardMedia, CardScrim } from './components/Card'
import { Carousel } from './components/Carousel'
import { Block, BlockBody, BlockMedia } from './components/Block'
import { ApiValidator, api } from './utils/api'

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
}

const CARD_CONTENT = [
  {
    title: 'Fresh Kicks!',
    href: 'javascript(void)',
    label: 'Shoes',
    cta: 'Shop',
  },
  {
    title: 'See Our New Street Wear',
    href: 'javascript(void)',
    label: 'Shirts',
    cta: 'Shop',
  },
  {
    title: 'Mom Jeans for Everyone!',
    href: 'javascript(void)',
    label: 'Pants',
    cta: 'Shop',
  },
]
const SLIDER_CARDS = [
  ...CARD_CONTENT,
  {
    title: "Trucker Caps Like it's 2006!",
    href: 'javascript(void)',
    label: 'Hats',
    cta: 'Shop',
  },
  ...CARD_CONTENT,
]

type Product = {
  id: string
  brand: string | null
  code?: string
  description: string
  name: string
  uid: string
  [key: string]: any
}

const validateProducts = (data: unknown): data is Product[] => data[0].uid.startsWith('PC')

export default async function Page() {
  const minCardWidth = 288
  const stackWidth = minCardWidth * SLIDER_CARDS.length + (16 * SLIDER_CARDS.length - 1) + 32

  const products = await api.get<Product[]>('/products', {
    validate: validateProducts as ApiValidator,
  })

  return (
    <>
      <Header py="3" px="4">
        Generic Co.<abbr title="Not really">™️</abbr> ~ Clothing &amp; Stuff
      </Header>

      <Center display="flex" flexDirection="col" fillView className="bg-cyan-100">
        <Carousel title={'Shop by Category'} cols={7} slideHeight="388px">
          {SLIDER_CARDS.map(card => (
            <Block as="figure" role="img" key={card.title} flexDirection="col" w="full">
              <BlockMedia h="80" />
              <BlockBody as="figcaption" justify="between" py="6">
                <Box>
                  <Text fontSize="sm">{card.label}</Text>
                  <Heading as="h3" fontSize="xl" fontWeight="bold" mb="4">
                    {card.title}
                  </Heading>
                </Box>
                <Link href="!#" isCta>
                  {card.cta}
                </Link>
              </BlockBody>
            </Block>
          ))}
        </Carousel>

        <Box as="section" className="section">
          <Box as="header" className="section-header">
            <Heading as="h2" className="section-title">
              Featured
            </Heading>
          </Box>
          <Stack
            cols={{ xs: '1', md: '3' }}
            gap="4"
            orientation="horizontal"
            placeContent="evenly"
            className="section-wrapper"
          >
            {products.map(product => (
              <Card key={product.id} inverted flex="1" alignItems="end" h="96">
                <CardMedia placement="fill" />
                <CardScrim />
                <CardBody p="6">
                  <Text fontSize="sm">{product.brand}</Text>
                  <Heading as="h3" fontSize="2xl" fontWeight="bold" mb="4">
                    {product.name}
                  </Heading>
                  <Text color="inherit">{product.description}</Text>
                  <Button variant="default" radius="3xl">
                    <Text as="span" color="inherit">
                      Add to Cart
                    </Text>
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Box>
      </Center>
    </>
  )
}
