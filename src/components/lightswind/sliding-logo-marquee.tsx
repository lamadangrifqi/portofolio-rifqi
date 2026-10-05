// Adapted from Lightswind UI Sliding Logo Marquee (MIT, codewithMUHILAN).
// See docs/licenses/LIGHTSWIND-LICENSE.
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}
export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  height?: string;
  width?: string;
  gap?: string;
  scale?: number;
  direction?: "horizontal" | "vertical";
  enableBlur?: boolean;
  blurIntensity?: number;
  pauseOnHover?: boolean;
  showGridBackground?: boolean;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  backgroundColor?: string;
  onItemClick?: (item: SlidingLogoMarqueeItem) => void;
}
export function SlidingLogoMarquee({
  items,
  speed = 60,
  height = "120px",
  width = "100%",
  gap = "2rem",
  scale = 1,
  direction = "horizontal",
  enableBlur = true,
  blurIntensity = 2,
  pauseOnHover = true,
  showGridBackground = false,
  autoPlay = true,
  showControls = true,
  className = "",
  backgroundColor = "transparent",
  onItemClick,
}: SlidingLogoMarqueeProps) {
  const container = useRef<HTMLDivElement>(null),
    group = useRef<HTMLUListElement>(null);
  const [repeat, setRepeat] = useState(1),
    [distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false),
    [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = container.current,
      list = group.current;
    if (!root || !list || !items.length) return;
    const observer = new ResizeObserver(() => {
      const rootSize =
        direction === "horizontal" ? root.clientWidth : root.clientHeight;
      const rect = list.getBoundingClientRect();
      const groupSize = direction === "horizontal" ? rect.width : rect.height;
      if (groupSize > 0) {
        const oneSet = groupSize / repeat;
        setRepeat(Math.max(1, Math.ceil(rootSize / oneSet)));
        setDistance(groupSize);
      }
    });
    observer.observe(root);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items.length, repeat, direction]);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(root);
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const running =
    autoPlay &&
    !paused &&
    !(pauseOnHover && hovered) &&
    !focused &&
    visible &&
    !hidden &&
    !reduced &&
    speed > 0;
  const renderItem = (
    item: SlidingLogoMarqueeItem,
    key: string,
    duplicate: boolean,
  ) => {
    const props = {
      className: "brand-marquee-content",
      tabIndex: duplicate ? -1 : undefined,
    };
    return (
      <li
        key={key}
        className="brand-marquee-item"
        aria-hidden={duplicate || undefined}
      >
        {item.href ? (
          <a
            {...props}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onItemClick?.(item)}
          >
            {item.content}
          </a>
        ) : onItemClick ? (
          <button {...props} type="button" onClick={() => onItemClick(item)}>
            {item.content}
          </button>
        ) : (
          <div className="brand-marquee-content">{item.content}</div>
        )}
      </li>
    );
  };
  const listItems = (clone: boolean) =>
    Array.from({ length: reduced ? 1 : repeat }, (_, index) =>
      items.map((item) =>
        renderItem(item, `${item.id}-${index}`, clone || index > 0),
      ),
    );
  return (
    <div
      ref={container}
      className={`brand-marquee relative ${className}`}
      role="region"
      aria-label="Logo brand yang bekerja sama"
      data-direction={direction}
      data-static={!!reduced}
      data-play-state={running ? "running" : "paused"}
      style={
        {
          width,
          minHeight: height,
          height: reduced ? "auto" : height,
          backgroundColor,
          "--brand-gap": gap,
          "--brand-duration": `${Math.max(1, distance / Math.max(1, speed))}s`,
          "--brand-distance": `${distance}px`,
          "--brand-blur": `${Math.max(0, blurIntensity)}px`,
          "--brand-scale": scale,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
    >
      {showGridBackground && (
        <div className="brand-marquee-grid" aria-hidden="true" />
      )}
      <div className="brand-marquee-window">
        <div className="brand-marquee-track">
          <ul ref={group} className="brand-marquee-group">
            {listItems(false)}
          </ul>
          {!reduced && (
            <ul className="brand-marquee-group" aria-hidden="true" inert>
              {listItems(true)}
            </ul>
          )}
        </div>
      </div>
      {enableBlur && !reduced && (
        <>
          <div
            className="brand-marquee-blur brand-marquee-blur-left"
            aria-hidden="true"
          />
          <div
            className="brand-marquee-blur brand-marquee-blur-right"
            aria-hidden="true"
          />
        </>
      )}
      {showControls && !reduced && items.length > 0 && (
        <button
          type="button"
          className="absolute right-2 bottom-2 z-10 gallery-control"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? "Lanjutkan logo" : "Jeda logo"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  );
}
