"use client";
import Silk from "@/components/ui/silk";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function SiteBackground() {
  // We need to get the resolved theme color as the silk component doesn't have access to CSS variables.
  const [color, setColor] = useState("#4A144B"); // Default deep plum
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // This ensures the color is fetched on the client after theme resolution
    // to avoid hydration mismatches.
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    if (primaryColor) {
      // Convert HSL string "299 56% 19%" to a valid HSL color `hsl(299, 56%, 19%)`
      const [h, s, l] = primaryColor.split(" ");
      setColor(`hsl(${h}, ${s}, ${l})`);
    }

  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 z-0 opacity-50">
        <Silk color={color} />
    </div>
  );
}
