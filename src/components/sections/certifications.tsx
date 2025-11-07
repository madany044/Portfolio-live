"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { certificates, volunteeringHighlights } from "@/data/certificates";

export function Certifications() {
  const [visible, setVisible] = useState(6);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const visibleItems = useMemo(() => certificates.slice(0, visible), [visible]);
  const active = activeIdx != null ? certificates[activeIdx] : null;

  return (
    <section id="certifications" className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 pb-8 text-center md:text-left">
        <span className="mx-auto w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:mx-0">
          Certifications & Volunteering
        </span>
        <h2 className="font-display text-3xl text-white sm:text-4xl">Growing skills, giving back.</h2>
        <p className="max-w-2xl text-base text-white/70">
          A curated selection of certifications and volunteering contributions. Click a certificate to preview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {visibleItems.map((item, idx) => (
          <button
            key={`${item.name}-${idx}`}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/30 hover:bg-white/10"
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/5">
              <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 text-sm text-white/80">{item.name}</div>
          </button>
        ))}
      </div>

      {visible < certificates.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + 3, certificates.length))}
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Load more
          </button>
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Volunteering</h3>
        <ul className="mt-4 grid gap-2 text-sm text-white/75 md:grid-cols-2">
          {volunteeringHighlights.map((item) => (
            <li key={item.label} className="list-disc pl-5">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm"
            onClick={() => setActiveIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 hover:border-white/30 hover:text-white"
                onClick={() => setActiveIdx(null)}
              >
                Close
              </button>
              <div className="px-2 pb-3 pt-8 text-white/90">{active.name}</div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <img src={active.img} alt={active.name} className="h-full w-full object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


