import { use } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function useTheme() {
  const context = use(ThemeContext);
  if (context === null) {
    throw new Error("useTheme can only be used within ThemeContextProvider");
  }
  return context;
}
