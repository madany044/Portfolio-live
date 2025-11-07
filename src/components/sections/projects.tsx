"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";

import { categories, projects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const filters = ["All", ...categories];

export function ProjectShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projects;
    return projects.filter((project) => project.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl px-6 py-24">
      <header className="flex flex-col gap-6 text-center md:text-left">
        <span className="mx-auto w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:mx-0">
          Selected Work
        </span>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex-1 space-y-3">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Modular product systems with immersive storytelling.
            </h2>
            <p className="max-w-2xl text-base text-white/70">
              Every project blends purposeful motion, interaction design, and
              reliable infrastructure. Filter the gallery to explore AI-driven
              assistants, observability tooling, and spatial web experiments.
            </p>
          </div>
        </div>
      </header>

      <div className="mt-10 flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "group relative overflow-hidden rounded-full border border-white/15 px-5 py-2 text-sm transition",
                isActive
                  ? "bg-white/20 text-white shadow-[0_12px_40px_rgba(129,140,248,0.45)]"
                  : "bg-transparent text-white/60 hover:border-white/30 hover:text-white",
              )}
            >
              {filter}
              {isActive && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-sky-500/40"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={`${project.title}-${project.category}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.2, ease: [0, 0, 0.58, 1] }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={project.spotlight?.includes("Winner") ?? false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                {project.spotlight && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {project.spotlight}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display text-2xl text-white">{project.title}</h3>
                  <p className="text-sm text-white/70">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
                      >
                        Live
                        <HiArrowTopRightOnSquare />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
                      >
                        Code
                        <FiGithub />
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-6 top-6 text-sm text-white/60 hover:text-white"
              >
                Close
              </button>
              <h3 className="font-display text-3xl text-white">{activeProject.title}</h3>
              <p className="mt-3 text-sm text-white/70">{activeProject.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Highlights
                  </h4>
                  <p className="mt-2 text-sm text-white/70">
                    {activeProject.spotlight ?? "Crafted with meticulous performance and usability focus."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Stack
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {activeProject.technologies.map((tech) => (
                      <li key={`${activeProject.title}-${tech}`}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
                  >
                    Launch project
                    <HiArrowTopRightOnSquare />
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
                  >
                    View repository
                    <FiGithub />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
