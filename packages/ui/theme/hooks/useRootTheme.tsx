import { useContext } from "react";

import { ThemeContextValue } from "../types";

import { ThemeContext } from "./useTheme";

/**
 * Passes down any change in the display mode to the ThemeContextProvider.
 */
export function useRootTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useRootTheme(): missing context value");
  }

  return value as ThemeContextValue;
}
