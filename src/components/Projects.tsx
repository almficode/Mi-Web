"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";
import ProjectCard from "./ProjectCard";
import Marquee from "./Marquee";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

export default function Projects({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="projects" className="relative overflow-hidden border-t border-[var(--color-border)] py-20 lg:py-28">
      <div className="mb-16">
        <Marquee items={dict.projects.marquee} variant="giant" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
            {dict.projects.eyebrow}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mb-16 max-w-2xl text-lg text-[var(--color-text-muted)]">
            {dict.projects.subtitle}
          </p>
        </RevealOnScroll>

        {/* Mobile: swipe horizontally · Desktop: staggered grid */}
        <div className="-mx-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-8 [&::-webkit-scrollbar]:hidden">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`w-[82%] flex-none snap-start sm:w-auto ${
                i % 3 === 1 ? "lg:mt-14" : i % 3 === 2 ? "lg:mt-7" : ""
              }`}
            >
              <ProjectCard
                project={project}
                name={project.name[locale]}
                description={project.description[locale]}
                category={project.category[locale]}
                viewLabel={dict.projects.viewProject}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* Swipe hint (mobile only) */}
        <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)] sm:hidden">
          {locale === "es" ? "Desliza para ver más" : "Swipe to see more"}
          <motion.svg
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
          >
            <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
