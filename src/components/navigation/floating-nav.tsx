"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineBars3 } from "react-icons/hi2";

import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function FloatingNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-40 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-xl shadow-xl shadow-slate-900/10 dark:border-white/15 dark:bg-slate-900/60"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white"
        >
          Madan Y
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <HiOutlineBars3 className="text-xl" />
          </button>
        </div>
      </motion.nav>

      <motion.div
        id="mobile-nav"
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className={cn(
          "pointer-events-auto mt-4 flex w-full max-w-xs flex-col gap-2 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-white backdrop-blur-3xl md:hidden",
          open ? "visible" : "invisible",
        )}
      >
        {navItems.map((item) => (
          <a
            key={`mobile-${item.href}`}
            href={item.href}
            className="rounded-2xl px-4 py-3 text-base font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

