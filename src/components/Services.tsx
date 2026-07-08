"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

/**
 * One service title on the left column. Each letter rotates continuously as
 * the shared scroll `progress` (a fractional service index) moves past this
 * title's index, so you literally watch the cylinder roll while scrolling.
 */
function ServiceLetter({
  char,
  index,
  progress,
  accent,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
  accent: string;
}) {
  // Signed distance from this title to the current scroll position.
  const rotateX = useTransform(progress, (p) => {
    const d = Math.max(-1, Math.min(1, p - index));
    return d * 90; // ahead → folded up, behind → folded down
  });
  const y = useTransform(progress, (p) => {
    const d = Math.max(-1, Math.min(1, p - index));
    return -d * 16;
  });
  const opacity = useTransform(progress, (p) => {
    const d = Math.min(1, Math.abs(p - index));
    return 1 - d * 0.7;
  });
  const color = useTransform(progress, (p) => {
    const d = Math.min(1, Math.abs(p - index));
    return d < 0.5 ? accent : "var(--color-text-faint)";
  });

  return (
    <motion.span
      aria-hidden
      className="inline-block"
      style={{ rotateX, y, opacity, color, transformOrigin: "50% 50%", whiteSpace: "pre" }}
    >
      {char}
    </motion.span>
  );
}

function ServiceTitle({
  title,
  index,
  progress,
  accent,
}: {
  title: string;
  index: number;
  progress: MotionValue<number>;
  accent: string;
}) {
  return (
    <span
      className="font-display block text-4xl uppercase leading-none lg:text-[2.75rem]"
      aria-label={title}
      style={{ perspective: 700 }}
    >
      {title.split("").map((char, ci) => (
        <ServiceLetter key={ci} char={char} index={index} progress={progress} accent={accent} />
      ))}
    </span>
  );
}

const serviceImages: Record<string, string> = {
  "desarrollo-web": "/services/desarrollo-web.png",
  "chatbots-ia": "/services/chatbot-ia.png",
  mantenimiento: "/services/mantenimiento.jpg",
  mejoras: "/services/mejoras.jpg",
  automatizacion: "/services/automatizacion.jpg",
};

export default function Services({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  // Continuous fractional service index driven by scroll — feeds the fluid
  // letter roll on the left so the change is visible little by little.
  const progress = useMotionValue(0);
  const items = dict.services.items;
  const activeService = items[active];
  const accent = active % 2 === 0 ? "var(--color-accent)" : "var(--color-accent-2)";
  const activeImage = serviceImages[activeService.id];

  useEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    if (!section || !pinTarget) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isDesktop || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (items.length - 1) * 0.9}`,
        pin: pinTarget,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          // Continuous position (0 … n-1) for the fluid letter roll…
          const p = self.progress * (items.length - 1);
          progress.set(p);
          // …and the nearest index for the right-hand image/panel swap.
          setActive(Math.round(p));
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)]"
    >
      <div ref={pinRef} className="flex min-h-screen flex-col justify-center py-20 lg:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-6 max-w-2xl lg:mb-8">
            <RevealOnScroll>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                {dict.services.eyebrow}
              </p>
            </RevealOnScroll>
            <RevealText
              as="h2"
              className="break-words font-display text-[9vw] leading-[1.25] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl"
            >
              {dict.services.titleStart}{" "}
              <span className="text-[var(--color-accent)]">{dict.services.titleAccent}</span>
            </RevealText>
          </div>

          {/* Desktop: scroll-driven pinned tabs (no click needed) */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <div className="flex flex-col">
              {items.map((service, i) => {
                const itemAccent = i % 2 === 0 ? "var(--color-accent)" : "var(--color-accent-2)";
                return (
                  <div
                    key={service.id}
                    className="border-b border-[var(--color-border)] py-4 first:border-t"
                  >
                    <ServiceTitle
                      title={service.title}
                      index={i}
                      progress={progress}
                      accent={itemAccent}
                    />
                  </div>
                );
              })}
            </div>

            <div className="relative min-h-[460px] self-start overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.35 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-[var(--color-surface)] p-6"
                >
                  <p className="text-lg text-[var(--color-text)] sm:text-xl">
                    {activeService.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeService.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[var(--radius-pill)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)] shadow-[var(--shadow-soft)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white">
                    {activeImage ? (
                      <Image
                        src={activeImage}
                        alt={activeService.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <svg viewBox="0 0 400 300" className="h-full w-full" fill="none">
                        <rect x="0" y="0" width="400" height="34" fill="var(--color-surface-2)" />
                        <circle cx="20" cy="17" r="4" fill={accent} />
                        <circle cx="34" cy="17" r="4" fill="var(--color-border-strong)" />
                        <circle cx="48" cy="17" r="4" fill="var(--color-border-strong)" />
                        <rect x="24" y="60" width="220" height="16" rx="8" fill={accent} opacity="0.55" />
                        <rect x="24" y="90" width="280" height="8" rx="4" fill="var(--color-border)" />
                        <rect x="24" y="106" width="240" height="8" rx="4" fill="var(--color-border)" />
                        <rect x="24" y="140" width="100" height="34" rx="17" fill={accent} />
                        <rect x="24" y="200" width="110" height="76" rx="12" fill="var(--color-surface-2)" />
                        <rect x="145" y="200" width="110" height="76" rx="12" fill="var(--color-surface-2)" />
                        <rect x="266" y="200" width="110" height="76" rx="12" fill="var(--color-surface-2)" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 hidden items-center justify-center gap-6 lg:flex">
            <div className="flex items-center gap-2">
              {items.map((service, i) => (
                <span
                  key={service.id}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "24px" : "6px",
                    background: active === i ? "var(--color-accent)" : "var(--color-border-strong)",
                  }}
                />
              ))}
            </div>
            <motion.div
              animate={{ opacity: active === items.length - 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]"
            >
              {dict.services.scrollHint}
              <motion.svg
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
              >
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          </div>

          {/* Mobile: simple stacked list, each service reveals as you scroll past it */}
          <div className="flex flex-col gap-6 lg:hidden">
            {items.map((service, i) => {
              const mobileAccent = i % 2 === 0 ? "var(--color-accent)" : "var(--color-accent-2)";
              const mobileImage = serviceImages[service.id];
              return (
                <RevealOnScroll key={service.id} delay={0}>
                  <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <span
                      className="font-display block text-[9vw] uppercase leading-none"
                      style={{ color: mobileAccent }}
                    >
                      {service.title}
                    </span>
                    <p className="mt-4 text-lg text-[var(--color-text)]">{service.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[var(--radius-pill)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)] shadow-[var(--shadow-soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {mobileImage && (
                      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white">
                        <Image
                          src={mobileImage}
                          alt={service.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
