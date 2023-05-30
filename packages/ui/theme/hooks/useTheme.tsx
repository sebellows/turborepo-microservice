import { ReactNode, createContext, useContext } from "react";

import { theme } from "../themes";
import { Theme, ThemeContextValue, ThemeMode } from "../types";

export const ThemeContext = createContext<ThemeContextValue>({
  theme,
  mode: 'light'
});

export const ThemeProvider = ({
  theme,
  mode = 'light',
  children,
}: {
  theme: Theme;
  mode: ThemeMode;
  children: ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={{ theme, mode }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const { theme } = useContext(ThemeContext);
  return theme;
};
