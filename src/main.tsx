import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ScrollProvider } from "./components/ScrollProvider";
import { MotionConfig } from "motion/react";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "@fontsource-variable/urbanist/index.css";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>,
);
