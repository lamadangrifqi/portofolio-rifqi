import type { ReactNode } from "react";
import ReactLenis from "lenis/react";
import { useReducedMotion } from "motion/react";
export function ScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{ smoothWheel: !reduced, duration: 1.2, syncTouch: false }}
    >
      {children}
    </ReactLenis>
  );
}
