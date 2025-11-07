"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { skills } from "@/data/skills";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      ease: [0, 0, 0.58, 1],
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
};

export function SkillsShowcase() {
  const groupedSkills = useMemo(() => {
    return skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category]?.push(skill);
        return acc;
      },
      {} as Record<string, typeof skills>,
    );
  }, []);

  return (
    <section id="skills" className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[ minmax(0,0.75fr)_minmax(0,1fr) ] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Skills & Stack
          </span>
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            A holistic toolkit for products that need to scale and inspire.
          </h2>
          <p className="text-base text-white/70">
            From design systems and platform architecture to AI-assisted
            workflows, I partner with teams to ship experiences that stay fast,
            secure, and lovable no matter the scale. I pair modern frameworks
            with proven engineering rigor.
          </p>
          <ul className="space-y-3 text-sm text-white/60">
            <li>• Progressive enhancement and accessibility-first thinking</li>
            <li>• Observable pipelines with automated quality gates</li>
            <li>• AI copilots woven into real product journeys</li>
          </ul>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {Object.entries(groupedSkills).map(([category, items]) => (
            <motion.article
              key={category}
              variants={item}
              className="glass-panel relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6"
            >
              <header className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                  {category}
                </span>
                <span className="text-xs text-white/40">{items.length} tools</span>
              </header>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <skill.icon className="text-lg text-accent" />
                        <span>{skill.name}</span>
                      </div>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                       transition={{ duration: 1.2, ease: [0, 0, 0.58, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

