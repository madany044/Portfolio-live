"use client";

import Link from "next/link";
import { useMotionTemplate, useMotionValue, motion, useSpring } from "framer-motion";
import { useState } from "react";
import { HiArrowDownRight } from "react-icons/hi2";
import { RiDownloadLine } from "react-icons/ri";

import { stats } from "@/data/highlights";
import { socialLinks } from "@/data/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useSpring(180, { stiffness: 200, damping: 40, mass: 0.6 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  const maskImage = useMotionTemplate`
    radial-gradient(${radius}px at ${mouseX}px ${mouseY}px, rgba(173, 134, 255, 0.7), transparent 70%)
  `;

  return (
    <section
      id="about"
      className="relative isolate flex min-h-[90vh] w-full flex-col justify-center overflow-hidden pt-44 pb-32"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - bounds.left);
        mouseY.set(event.clientY - bounds.top);
        radius.set(260);
        setIsPointerActive(true);
      }}
      onPointerLeave={() => {
        radius.set(180);
        setIsPointerActive(false);
      }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/50 via-indigo-400/40 to-transparent blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-gradient-to-bl from-emerald-400/40 via-blue-500/40 to-transparent blur-2xl" />
      </div>

      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[480px] -translate-y-1/3 blur-3xl transition-opacity",
          isPointerActive ? "opacity-90" : "opacity-60",
        )}
        style={{ maskImage, WebkitMaskImage: maskImage as unknown as string }}
      >
        <div className="h-full w-full bg-gradient-to-r from-purple-500/40 via-violet-400/40 to-indigo-500/40" />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:self-start">
              Full Stack Developer
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Building modern, scalable web apps and data solutions.
            </h1>
            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              Passionate developer who loves turning ideas into meaningful digital
              experiences. Solid foundation in web development and data science.
              Enjoys solving problems creatively and building solutions that make
              a difference.</p>
              <p> Motto: “Learn deeply. Build boldly. Share generously.”
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Link
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(99,102,241,0.35)] transition hover:scale-[1.02] hover:shadow-[0_20px_55px_rgba(99,102,241,0.45)]"
              >
                <RiDownloadLine className="text-lg" />
                Download Resume
              </Link>
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Explore Projects
                <HiArrowDownRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="glass-panel hero-glow relative mx-auto flex max-w-sm flex-col gap-3 overflow-hidden rounded-3xl p-6 text-left md:mx-0 md:self-auto"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Snapshot</span>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
              <Image src="/madan-dp.png" alt="Madan Y" fill className="object-cover object-center" />
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 transition hover:border-white/40 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 transition hover:border-white/30 hover:bg-white/10"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-semibold text-white">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                  {stat.label.split(" ")[0]}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">{stat.label}</p>
              <motion.span
                aria-hidden
                className="absolute inset-x-6 bottom-6 h-px origin-left bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

