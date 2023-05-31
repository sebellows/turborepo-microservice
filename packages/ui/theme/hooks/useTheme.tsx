"use client"

import { ReactNode, createContext, useContext } from "react";

import { theme as baseTheme } from "../themes";
import { RootThemeContextValue, Theme, ThemeContextValue, ThemeMode } from "../types";

export const ThemeContext = createContext<RootThemeContextValue>({
  theme: baseTheme,
  mode: "light",
});

export const ThemeProvider = ({
  theme = baseTheme,
  mode = 'light',
  children,
}: {
  theme?: Theme;
  mode?: ThemeMode;
  children: ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={{ theme, mode }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const { theme, mode: modeContext } = useContext(ThemeContext);
  const scheme = theme.modes[modeContext];

  return { theme, scheme };
};
