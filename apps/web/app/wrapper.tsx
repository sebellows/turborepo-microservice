"use client";
import { RootContainer, ThemeProvider } from "ui";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RootContainer>
        {children}
      </RootContainer>
    </ThemeProvider>
  );
}
