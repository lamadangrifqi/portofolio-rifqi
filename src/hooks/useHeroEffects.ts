import { useEffect, useRef, type RefObject } from "react";

export function useHeroEffects(
  enabled: boolean,
  hero: RefObject<HTMLElement | null>,
  reveal: RefObject<HTMLDivElement | null>,
  grid: RefObject<SVGPatternElement | null>,
  particlesCanvas: RefObject<HTMLCanvasElement | null>,
) {
  const mouse = useRef({ x: -999, y: -999 });
  useEffect(() => {
    const section = hero.current;
    const canvas = particlesCanvas.current;
    const ctx = canvas?.getContext("2d");
    if (!enabled || !section || !canvas || !ctx) return;
    let frame = 0;
    let visible = true;
    let previous = { x: -999, y: -999 };
    let smooth = { ...previous };
    let gridX = 0;
    let gridY = 0;
    let bounds = section.getBoundingClientRect();
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
    }[] = [];
    const resize = () => {
      bounds = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const paint = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const target = mouse.current;
      if (smooth.x < -500 && target.x > -500) smooth = { ...target };
      smooth.x += (target.x - smooth.x) * 0.1;
      smooth.y += (target.y - smooth.y) * 0.1;
      reveal.current?.style.setProperty(
        "--mouse-x",
        `${smooth.x.toFixed(1)}px`,
      );
      reveal.current?.style.setProperty(
        "--mouse-y",
        `${smooth.y.toFixed(1)}px`,
      );
      const nextX = target.x > -500 ? (target.x / bounds.width - 0.5) * 16 : 0;
      const nextY = target.y > -500 ? (target.y / bounds.height - 0.5) * 16 : 0;
      gridX += (nextX - gridX) * 0.06;
      gridY += (nextY - gridY) * 0.06;
      grid.current?.setAttribute("x", gridX.toFixed(2));
      grid.current?.setAttribute("y", gridY.toFixed(2));
      ctx.clearRect(0, 0, bounds.width, bounds.height);
      const movement =
        previous.x > -500
          ? Math.hypot(smooth.x - previous.x, smooth.y - previous.y)
          : 0;
      if (target.x > -500 && movement > 1 && particles.length < 65) {
        for (let i = 0; i < Math.min(3, Math.ceil(movement / 6)); i++)
          particles.push({
            x: smooth.x,
            y: smooth.y,
            vx: (Math.random() - 0.5) * 1.8,
            vy: -Math.random(),
            life: 60,
            size: 0.8 + Math.random() * 1.8,
            color: ["255,59,92", "0,240,255", "255,255,255"][
              Math.floor(Math.random() * 3)
            ],
          });
      }
      previous = { ...smooth };
      particles = particles.filter((p) => --p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        ctx.fillStyle = `rgba(${p.color},${(p.life / 60) * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (
        particles.length ||
        Math.abs(smooth.x - target.x) > 0.1 ||
        Math.abs(smooth.y - target.y) > 0.1 ||
        Math.abs(gridX - nextX) > 0.01 ||
        Math.abs(gridY - nextY) > 0.01
      )
        frame = requestAnimationFrame(paint);
    };
    const start = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(paint);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const move = (e: PointerEvent) => {
      // Translate viewport coordinates to hero coordinates; no touch smoothing.
      if (e.pointerType === "touch") return;
      bounds = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
      start();
    };
    const leave = () => {
      mouse.current = { x: -999, y: -999 };
      start();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else {
          stop();
          leave();
          particles = [];
          ctx.clearRect(0, 0, bounds.width, bounds.height);
        }
      },
      { threshold: 0 },
    );
    observer.observe(section);
    const visibility = () => {
      if (document.hidden) stop();
      else start();
    };
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      stop();
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled, hero, reveal, grid, particlesCanvas]);
}
