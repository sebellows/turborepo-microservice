import { Metadata } from "next";
import { Box, Button, Center, Header, Heading, Link, Stack, Text } from '@trms/ui'

import { Card, CardBody, CardMedia, CardScrim } from "./components/Card";
import { Carousel } from "./components/Carousel";
import { Block, BlockBody, BlockMedia } from "./components/Block";

export const metadata: Metadata = {
  title: "Web - Turborepo Example",
};

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

export default function Page() {
  const minCardWidth = 288
  const stackWidth = minCardWidth * SLIDER_CARDS.length + (16 * SLIDER_CARDS.length - 1) + 32

  return (
    <>
      <Header py="3" px="4">
        Generic Web Application
      </Header>
      <Center display="flex" flexDirection="col" fillView className="bg-cyan-100">
        <Carousel title={'Shop by Category'} slideHeight="388px">
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
                <Link href="!#" isCta>{card.cta}</Link>
              </BlockBody>
            </Block>
          ))}
        </Carousel>

        <Box as="section" className="section">
          <Box as="header" className="section-header">
            <Heading as="h2" className="section-title">Card Section</Heading>
          </Box>
          <Stack
            cols={{ xs: '1', md: '3' }}
            gap="4"
            orientation="horizontal"
            placeContent="evenly"
            className="section-wrapper"
          >
            {CARD_CONTENT.map(card => (
              <Card key={card.title} inverted flex="1" alignItems="end" h="96">
                <CardMedia placement="fill" />
                <CardScrim />
                <CardBody p="6">
                  <Text fontSize="sm">{card.label}</Text>
                  <Heading as="h3" fontSize="2xl" fontWeight="bold" mb="4">
                    {card.title}
                  </Heading>
                  <Button variant="default" radius="3xl">
                    <Text as="span" color="inherit">
                      {card.cta}
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
