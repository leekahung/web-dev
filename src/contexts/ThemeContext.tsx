import { createContext } from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
