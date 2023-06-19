import { Metadata } from "next";
import { Button, Center, Header, Heading, Stack, Text } from "@trms/ui";
import { lipsum } from '@trms/utils'

import { Card, CardBody, CardMedia } from "./components/Card";

export const metadata: Metadata = {
  title: "Web - Turborepo Example",
};

const CARD_CONTENT = [
  {
    title: "Caching Tasks",
    href: "javascript(void)",
    text: lipsum(1, { random: true }),
    cta: "Read More",
  },
  {
    title: "Running Tasks",
    href: "javascript(void)",
    text: lipsum(1, { random: true }),
    cta: "Read More",
  },
  {
    title: "Configuration Options",
    href: "javascript(void)",
    text: lipsum(1, { random: true }),
    cta: "Read More",
  },
];

export default function Page() {
  return (
    <>
      <Header py="3" px="4">
        Generic Web Application
      </Header>
      <Center display="flex" w="full" minH="screen" variant="info" muted>
        <Stack cols={{ xs: '1', md: '3' }} gap='4' placeContent='evenly'>
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} flex='1'>
              <CardMedia />
              <CardBody>
                <Heading as="h3" fontSize="lg" fontWeight="bold">{card.title}</Heading>
                <Text>{card.text}</Text>
                <Button variant="danger" block>
                  <Text as="span" color="inherit">
                    {card.cta}
                  </Text>
                </Button>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Center>
      {/* <div className="flex w-full min-h-screen justify-center items-center bg-blue-50">
        <div className="flex space-x-3 items-center">
          <h1 className="font-bold text-lg text-red-500">Web</h1>
          <Button variant="primary">Primary Button</Button>
        </div>
      </div> */}
    </>
  );
}
