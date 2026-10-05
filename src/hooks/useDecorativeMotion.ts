import { useEffect, useState } from "react";
export function useDecorativeMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const desktop = matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setEnabled(desktop.matches && !reduced.matches && !document.hidden);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return enabled;
}
