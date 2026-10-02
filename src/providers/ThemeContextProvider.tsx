import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

interface Props {
  children: React.ReactNode;
}

export default function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(() => {
    let isLight = false;
    try {
      isLight = localStorage.getItem("theme") === "light";
    } catch {
      // Storage blocked (e.g. site data disabled); fall back to dark.
    }
    if (isLight) document.documentElement.classList.remove("dark");
    return !isLight;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const themeProviderObject = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode],
  );

  useEffect(() => {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // Storage blocked; theme just won't persist across visits.
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
      themeColor?.setAttribute("content", "#1e293b");
    } else {
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
