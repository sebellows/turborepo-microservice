import { Metadata } from "next";
import { Box, Button, Center, Header, Heading, Stack, Text } from "@trms/ui";
import { lipsum } from '@trms/utils'

import { Card, CardBody, CardMedia, CardScrim } from "./components/Card";

export const metadata: Metadata = {
  title: "Web - Turborepo Example",
};

const CARD_CONTENT = [
  {
    title: "Fresh Kicks!",
    href: "javascript(void)",
    label: "Shoes",
    cta: "Shop",
  },
  {
    title: "See Our New Street Wear",
    href: "javascript(void)",
    label: "Shirts",
    cta: "Shop",
  },
  {
    title: "Mom Jeans for Everyone!",
    href: "javascript(void)",
    label: "Pants",
    cta: "Shop",
  },
];

export default function Page() {
  const minCardWidth = 320
  const stackWidth =
    minCardWidth * CARD_CONTENT.length + (16 * CARD_CONTENT.length - 1);

  return (
    <>
      <Header py="3" px="4">
        Generic Web Application
      </Header>
      <Center display="flex" w="full" minH="screen" variant="info" muted>
        <Stack
          className="grid-cols-1"
          cols={{ xs: "1", md: "3" }}
          gap="4"
          orientation="horizontal"
          placeContent="evenly"
          style={{ width: `${stackWidth}px` }}
        >
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} flex="1" h="96">
              <CardMedia placement="fill" />
              <CardScrim />
              <CardBody>
                <Text>{card.label}</Text>
                <Heading as="h3" fontSize="lg" fontWeight="bold" mb="2">
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
      </Center>
    </>
  );
}
