import { Metadata } from "next";
import { Box, Button, Header, Text } from "@trms/ui";
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
      <Box
        display="flex"
        w="full"
        minH="screen"
        justify="center"
        alignItems="center"
        variant="info"
        muted
      >
        {CARD_CONTENT.map((card) => (
          <Card>
            <CardMedia />
            <CardBody>
              <Heading as='h3'>{card.title}</Heading>
              <Text>
                {card.text}
              </Text>
              <Button variant="danger" block>
                <Text as="span" color="inherit">
                  {card.cta}
                </Text>
              </Button>
            </CardBody>
          </Card>
        ))}
      </Box>
      {/* <div className="flex w-full min-h-screen justify-center items-center bg-blue-50">
        <div className="flex space-x-3 items-center">
          <h1 className="font-bold text-lg text-red-500">Web</h1>
          <Button variant="primary">Primary Button</Button>
        </div>
      </div> */}
    </>
  );
}
