import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

interface Props {
  children: React.ReactNode;
}

export default function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      return true;
    }
    return false;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const themeProviderObject = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode]
  );

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={themeProviderObject}>
      {children}
    </ThemeContext.Provider>
  );
}
