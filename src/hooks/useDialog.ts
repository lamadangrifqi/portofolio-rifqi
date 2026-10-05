import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

// Dialogs are portaled outside #app-root so the background can be inert.
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const lenis = useLenis();
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const app = document.getElementById("app-root");
    const wasInert = app?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    if (app) app.inert = true;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, textarea, select, [tabindex="0"]',
        ),
      ).filter((el) => el.getClientRects().length > 0);
    (focusable()[0] ?? dialog).focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      if (app) app.inert = wasInert;
      document.body.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, [open, lenis]);
  return ref;
}
