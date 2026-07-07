"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import AboutCard from "./AboutCard";
import type { Dictionary } from "@/lib/dictionaries";

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {children}&nbsp;
    </motion.span>
  );
}

/** Big statement whose words light up one by one as you scroll through it. */
function ScrollStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

/** Rotating circular badge — spins slowly with scroll. */
function OrbitBadge({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, 200]);
  return (
    <motion.div
      style={{ rotate }}
      className="relative hidden h-32 w-32 shrink-0 lg:block xl:h-40 xl:w-40"
      aria-hidden
    >
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <defs>
          <path
            id="orbit-circle"
            d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="fill-[var(--color-text-muted)] font-display text-[13.5px] uppercase tracking-[2.5px]">
          <textPath href="#orbit-circle">
            Almficode ✦ Web ✦ IA ✦ Código ✦ Diseño ✦
          </textPath>
        </text>
        <circle cx="80" cy="80" r="26" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path
          d="M72 80h16m0 0-6-6m6 6-6 6"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function About({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Opposite-direction parallax for the two card columns
  const col1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [110, -30]);

  const col1 = dict.about.points.filter((_, i) => i % 2 === 0);
  const col2 = dict.about.points.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--color-border)] py-32 lg:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 h-[700px] w-[700px] animate-[drift_18s_ease-in-out_infinite] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,73,37,0.16) 0%, rgba(0,153,255,0.08) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[600px] w-[600px] animate-[drift_22s_ease-in-out_infinite_reverse] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,255,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start justify-between gap-10">
          <div>
            <RevealOnScroll>
              <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                {dict.about.eyebrow}
              </p>
            </RevealOnScroll>
            <RevealText
              as="h2"
              className="break-words font-display text-[10vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-6xl lg:text-7xl"
            >
              {dict.about.title}
            </RevealText>
          </div>
          <OrbitBadge progress={scrollYProgress} />
        </div>

        {/* Statement that lights up word by word while scrolling */}
        <ScrollStatement
          text={dict.about.description}
          className="mt-14 max-w-4xl text-2xl font-medium leading-snug text-[var(--color-text-strong)] sm:text-3xl lg:text-4xl"
        />

        {/* Floating cards with opposite parallax per column */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-28 lg:gap-8">
          <motion.div style={{ y: col1Y }} className="flex flex-col gap-4 lg:gap-8">
            {col1.map((point, i) => (
              <AboutCard
                key={point.title}
                index={i * 2}
                title={point.title}
                description={point.description}
              />
            ))}
          </motion.div>
          <motion.div style={{ y: col2Y }} className="flex flex-col gap-4 lg:mt-16 lg:gap-8">
            {col2.map((point, i) => (
              <AboutCard
                key={point.title}
                index={i * 2 + 1}
                title={point.title}
                description={point.description}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
