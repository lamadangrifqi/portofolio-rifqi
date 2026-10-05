import "@designcodeio/threeui/style.css";
import React, { useState } from "react";
import { TypographyVortexCanvas } from "@designcodeio/threeui/components/TypographyVortexCanvas";
import { Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface VortexBackgroundProps {
  interactive?: boolean;
}

export function VortexBackground({
  interactive = false,
}: VortexBackgroundProps) {
  const { theme } = useTheme();
  return (
    <div
      id="vortex-background-layer"
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
      style={{ opacity: theme === "light" ? 0.45 : 0.55 }}
    >
      <TypographyVortexCanvas
        mode={theme}
        speed={1}
        ringGrowth={1.21}
        opacity={1}
        dissolveRadius={1}
        particleAmount={0.7}
        suctionDuration={920}
        phrase="RIFQI LAMADANG / CREATIVE TECH / WEB SYSTEMS / "
      />
    </div>
  );
}
