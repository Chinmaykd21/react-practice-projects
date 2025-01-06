import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "Theme context cannot be used outside of the context provider"
    );
  }
  return context;
};
