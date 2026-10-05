import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
export function usePageScroll() {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  return useCallback(
    (id: string) => {
      const target = id === "hero" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (lenis)
        lenis.scrollTo(target, {
          offset: id === "hero" ? 0 : -90,
          immediate: !!reducedMotion,
        });
      else
        window.scrollTo({
          top:
            target === 0
              ? 0
              : target.getBoundingClientRect().top + window.scrollY - 90,
          behavior: "instant",
        });
    },
    [lenis, reducedMotion],
  );
}
