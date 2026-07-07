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

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={
                i % 3 === 1 ? "lg:mt-14" : i % 3 === 2 ? "lg:mt-7" : undefined
              }
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
      </div>
    </section>
  );
}
