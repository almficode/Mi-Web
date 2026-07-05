"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  // Reunión / Meeting
  <path key="0" d="M4 5h16v10H9l-5 4V5Z" strokeLinejoin="round" strokeLinecap="round" />,
  // Diseño / Design
  <path
    key="1"
    d="M4 20l1.2-4.2L15.8 5.2a1.5 1.5 0 0 1 2.1 0l1 1a1.5 1.5 0 0 1 0 2.1L8.2 18.8 4 20Z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Desarrollo / Development
  <path key="2" d="M9 6 3 12l6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />,
  // Integración IA
  <path
    key="3"
    d="M12 3v3M12 18v3M4.2 12H2M22 12h-2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
    strokeLinecap="round"
  />,
  // Lanzamiento / Launch
  <path
    key="4"
    d="M14.5 9.5c2-2 5-2.5 5-2.5s-.5 3-2.5 5l-6 6-3-3 6-6ZM6 15l-2 5 5-2M9 6c1-2 4-3 4-3M15 18c-1 2-4 3-4 3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Mantenimiento / Maintenance
  <path
    key="5"
    d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

function StepIcon({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 sm:h-7 sm:w-7">
      {icons[index % icons.length]}
    </svg>
  );
}

export default function Process({ dict }: { dict: Dictionary }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [dotVisible, setDotVisible] = useState(false);

  useEffect(() => {
    const line = lineRef.current;
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    if (!line || !wrapper || !dot) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
            onEnter: () => setDotVisible(true),
            onLeaveBack: () => setDotVisible(false),
          },
        }
      );

      gsap.fromTo(
        dot,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 max-w-2xl lg:mx-auto lg:text-center">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)] lg:mx-auto">
              {dict.process.eyebrow}
            </p>
          </RevealOnScroll>
          <RevealText
            as="h2"
            className="break-words font-display text-[9vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl"
          >
            {dict.process.title}
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="mt-6 text-lg text-[var(--color-text-muted)]">
              {dict.process.subtitle}
            </p>
          </RevealOnScroll>
        </div>

        <div ref={wrapperRef} className="relative">
          {/* Center line (desktop) / left line (mobile) */}
          <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-[var(--color-border-strong)]/40 lg:left-1/2 lg:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-[27px] top-2 bottom-2 w-[2px] origin-top bg-[var(--color-accent)] lg:left-1/2 lg:-translate-x-1/2"
          />
          <div
            ref={dotRef}
            className="pointer-events-none absolute left-[27px] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_rgba(255,73,37,0.18)] transition-opacity duration-300 lg:left-1/2"
            style={{ opacity: dotVisible ? 1 : 0 }}
          />

          <div className="flex flex-col gap-14 lg:gap-0">
            {dict.process.steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className="relative flex gap-6 pl-2 lg:min-h-[180px] lg:items-center lg:gap-0 lg:pl-0"
                >
                  {/* Icon node */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.05 }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-white text-[var(--color-accent)] shadow-[var(--shadow-soft)] lg:absolute lg:left-1/2 lg:h-16 lg:w-16 lg:-translate-x-1/2"
                  >
                    <StepIcon index={i} />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className={`relative flex-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-[var(--color-accent)] sm:p-8 lg:w-[calc(50%-3rem)] ${
                      isLeft ? "lg:mr-auto lg:text-right" : "lg:ml-auto"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`font-display pointer-events-none absolute -top-6 text-7xl text-[var(--color-surface)] sm:text-8xl ${
                        isLeft ? "right-4 lg:left-4 lg:right-auto" : "right-4"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="relative text-xl font-semibold text-[var(--color-text-strong)] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-[var(--color-text-muted)]">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
