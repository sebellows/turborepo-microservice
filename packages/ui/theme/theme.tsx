import { ReactNode, createContext, useContext } from "react";

import { theme } from "./themes";
import { Theme } from "./types";

export const ThemeContext = createContext<{
  theme: Theme;
}>({
  theme,
});

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const { theme } = useContext(ThemeContext);
  return theme;
};
