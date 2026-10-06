import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "./index.css";
import App from "./App.tsx";
import ThemeContextProvider from "./providers/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </MotionConfig>
  </StrictMode>,
);
