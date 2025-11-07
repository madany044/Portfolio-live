"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {!mounted ? (
        <span className="h-4 w-4 rounded-full bg-white/40" />
      ) : (
        <motion.span
          key={resolvedTheme}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="text-lg"
        >
          {isDark ? <HiSun /> : <HiMoon />}
        </motion.span>
      )}
    </button>
  );
}

