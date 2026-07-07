"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  name: string;
  description: string;
  category: string;
  viewLabel: string;
  index: number;
};

export default function ProjectCard({
  project,
  name,
  description,
  category,
  viewLabel,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.a
      ref={cardRef}
      href={project.href}
      target={project.href !== "#" ? "_blank" : undefined}
      rel={project.href !== "#" ? "noopener noreferrer" : undefined}
      data-cursor="link"
      data-cursor-label={viewLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{
        opacity: 0,
        y: 70,
        clipPath: "inset(18% 10% 18% 10% round 40px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0% round 24px)",
      }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group block overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-soft-lg)]"
    >
      <div className="border-b border-[var(--color-border)] px-6 py-4">
        <h3 className="font-display text-lg uppercase text-[var(--color-text-strong)]">{name}</h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
          {category}
        </p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
        <motion.div
          style={{ y: imageY, scale: hovered ? 1.07 : 1 }}
          transition={{ scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-[-12%]"
        >
          <Image
            src={project.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </motion.div>

        <div
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/35"
          aria-hidden
        >
          <span
            className="flex h-20 w-20 scale-0 items-center justify-center rounded-full bg-white text-center text-xs font-semibold uppercase leading-tight text-[var(--color-text-strong)] opacity-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
          >
            {viewLabel}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>
    </motion.a>
  );
}
