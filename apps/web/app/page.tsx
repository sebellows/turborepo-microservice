import { Button, Header, RootContainer, Text, ThemeProvider } from "ui";

export default function Page() {
  return (
    <ThemeProvider>
      <RootContainer>
        <>
          <Header text="Web" />
          <Button>
            <Text>BOOM!</Text>
          </Button>
        </>
      </RootContainer>
    </ThemeProvider>
  );
}
