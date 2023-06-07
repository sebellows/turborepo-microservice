"use client";
import { Button, Header, Text } from "ui";

export default function Page() {
  return (
    <>
      <Header text="Web" />
      <Button variant="danger">
        <Text as="span" color="inherit">BOOM!</Text>
      </Button>
    </>
  );
}
