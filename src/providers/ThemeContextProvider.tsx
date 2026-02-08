import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

interface Props {
  children: React.ReactNode;
}

export default function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      return false;
    }
    document.documentElement.classList.add("dark");
    return true;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const themeProviderObject = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode]
  );

  useEffect(() => {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      themeColor?.setAttribute("content", "#1e293b");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      themeColor?.setAttribute("content", "#e2e8f0");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={themeProviderObject}>
      {children}
    </ThemeContext.Provider>
  );
}
