"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 3D scroll-out: content tilts back in perspective, sinks and fades
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // Parallax layers at different speeds
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pb-16"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ y: sceneY }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div className="absolute right-[-10%] top-[58%] h-[560px] w-[560px] -translate-y-1/2 opacity-70">
          <HeroScene />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0px, transparent 60px, rgba(0,0,0,0.015) 61px, transparent 62px)",
        }}
      />

      <motion.div
        style={{
          rotateX,
          scale,
          y: contentY,
          opacity,
          transformOrigin: "center 20%",
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto w-full max-w-7xl px-6 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ y: badgeY }}
          className="mb-8 inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-strong)]"
        >
          {dict.hero.badge}
        </motion.p>

        <RevealText
          as="h1"
          className="max-w-5xl break-words font-display text-[7.2vw] leading-[1.25] text-[var(--color-text-strong)] sm:text-[6.2vw] sm:leading-[1.2] lg:text-[58px] lg:leading-[1.2] xl:text-[68px]"
        >
          {dict.hero.titleStart}{" "}
          <span className="text-[var(--color-accent)]">{dict.hero.titleAccent}</span>
        </RevealText>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <MagneticButton
              as="a"
              href={`/${locale}#projects`}
              className="bg-[var(--color-text-strong)] text-white hover:bg-[var(--color-accent)]"
            >
              {dict.hero.cta} →
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-sm text-lg text-[var(--color-text-muted)] lg:text-right"
          >
            {dict.hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
          {dict.hero.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-[var(--color-border-strong)]"
        />
      </motion.div>
    </section>
  );
}
