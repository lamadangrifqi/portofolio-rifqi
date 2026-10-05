import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Cloud, Sparkles } from "lucide-react";
import { useTheme, Theme } from "../../context/ThemeContext";

export interface CoolThemeToggleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  theme?: Theme;
  onToggle?: (newTheme: Theme) => void;
  disabled?: boolean;
}

export function CoolThemeToggle({
  size = "md",
  className = "",
  theme: controlledTheme,
  onToggle,
  disabled = false,
}: CoolThemeToggleProps) {
  // Use context if not controlled from props
  let contextTheme: Theme = "dark";
  let contextToggle: () => void = () => {};

  try {
    const ctx = useTheme();
    contextTheme = ctx.theme;
    contextToggle = ctx.toggleTheme;
  } catch {
    // If used outside provider, fallback to internal/controlled state
  }

  const currentTheme = controlledTheme ?? contextTheme;
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    if (disabled) return;
    const nextTheme: Theme = isDark ? "light" : "dark";
    if (onToggle) {
      onToggle(nextTheme);
    } else {
      contextToggle();
    }
  };

  // Dimension presets
  const sizeConfig = {
    sm: {
      width: "w-14", // 56px
      height: "h-7", // 28px
      thumbSize: "w-[22px] h-[22px]", // 22px
      thumbTranslateX: 28, // 56 - 22 - 3*2 = 28
      padding: "p-[3px]",
      iconSize: 12,
      cloudSize: 10,
      starSize: 8,
    },
    md: {
      width: "w-[74px]", // 74px
      height: "h-[36px]", // 36px
      thumbSize: "w-[28px] h-[28px]", // 28px
      thumbTranslateX: 38, // 74 - 28 - 4*2 = 38
      padding: "p-[4px]",
      iconSize: 15,
      cloudSize: 13,
      starSize: 10,
    },
    lg: {
      width: "w-24", // 96px
      height: "h-12", // 48px
      thumbSize: "w-[38px] h-[38px]", // 38px
      thumbTranslateX: 48, // 96 - 38 - 5*2 = 48
      padding: "p-[5px]",
      iconSize: 19,
      cloudSize: 16,
      starSize: 12,
    },
  }[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Beralih ke mode ${isDark ? "terang (light mode)" : "gelap (dark mode)"}`}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex items-center justify-start
        ${sizeConfig.width} ${sizeConfig.height} ${sizeConfig.padding}
        rounded-full cursor-pointer select-none overflow-hidden
        transition-shadow duration-300 ease-out outline-none
        focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95"}
        border ${isDark ? "border-indigo-900/60 shadow-inner" : "border-sky-300/80 shadow-md"}
        ${className}
      `}
    >
      {/* Background Track with Day/Night Scenic Environment */}
      <motion.div
        className="absolute inset-0 w-full h-full rounded-full transition-colors duration-500 pointer-events-none"
        animate={{
          background: isDark
            ? "linear-gradient(135deg, #0b0f19 0%, #1e1b4b 60%, #030712 100%)"
            : "linear-gradient(135deg, #38bdf8 0%, #60a5fa 55%, #93c5fd 100%)",
        }}
      />

      {/* Light Mode Scenery: Animated Floating Clouds & Sun Ray Shimmer */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            key="day-scenery"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Soft Sun Ray Glow */}
            <div className="absolute -left-2 -top-2 w-10 h-10 rounded-full bg-yellow-200/30 blur-md pointer-events-none" />

            {/* Cloud 1 */}
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute right-2 top-1 text-white/90 drop-shadow-sm"
            >
              <Cloud size={sizeConfig.cloudSize} fill="currentColor" />
            </motion.div>

            {/* Cloud 2 */}
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute right-5 bottom-1 text-white/70 drop-shadow-sm"
            >
              <Cloud size={sizeConfig.cloudSize * 0.8} fill="currentColor" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark Mode Scenery: Twinkling Stars & Cosmic Dust */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            key="night-scenery"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Star 1 */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              className="absolute left-2.5 top-1.5 text-indigo-200"
            >
              <Sparkles size={sizeConfig.starSize} />
            </motion.div>

            {/* Star 2 (tiny dot) */}
            <motion.div
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute left-6 bottom-2 w-1 h-1 rounded-full bg-white/80 shadow-[0_0_3px_#ffffff]"
            />

            {/* Star 3 (tiny dot) */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: "easeInOut",
                delay: 1.1,
              }}
              className="absolute left-8 top-2 w-1 h-1 rounded-full bg-indigo-300/90 shadow-[0_0_2px_#a5b4fc]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Interactive Knob / Thumb with Spring Motion */}
      <motion.div
        className={`
          relative z-10 rounded-full flex items-center justify-center
          ${sizeConfig.thumbSize} shadow-md
        `}
        animate={{
          x: isDark ? sizeConfig.thumbTranslateX : 0,
          backgroundColor: isDark ? "#f8fafc" : "#f59e0b",
        }}
        transition={{
          type: "spring",
          stiffness: 480,
          damping: 28,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-thumb"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center w-full h-full text-indigo-950"
            >
              {/* Moon Icon with crater details */}
              <Moon
                size={sizeConfig.iconSize}
                className="fill-indigo-950 stroke-indigo-950"
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun-thumb"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center w-full h-full text-amber-950"
            >
              {/* Sun Icon */}
              <Sun
                size={sizeConfig.iconSize}
                className="text-amber-950 stroke-[2.4]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

export default CoolThemeToggle;
