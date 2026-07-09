"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

const HeroBlueprintCanvas = dynamic(() => import("./HeroBlueprintCanvas"), {
  ssr: false,
});

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
    offset: ["start start", "end end"],
  });

  // Cinematic zoom-out: the full-screen "video" shrinks into a rounded card
  // while the generative code keeps zooming slowly behind the content.
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const frameRadius = useTransform(scrollYProgress, [0, 1], ["0px", "48px"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.28, 0.5], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  // Second act: only after the headline has fully cleared does the brand
  // wordmark rise into the stage, further down the scroll — no overlap.
  const act2Opacity = useTransform(scrollYProgress, [0.66, 0.88], [0, 1]);
  const act2Scale = useTransform(scrollYProgress, [0.66, 1], [0.82, 1]);
  const act2Y = useTransform(scrollYProgress, [0.66, 1], ["18%", "0%"]);

  const meta =
    locale === "es"
      ? { location: "Lanzarote, España", scope: "Web · IA · Automatización" }
      : { location: "Lanzarote, Spain", scope: "Web · AI · Automation" };

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: frameScale, borderRadius: frameRadius }}
          className="relative h-full w-full overflow-hidden bg-[var(--color-dark)]"
        >
          {/* Full-screen generative "video": wireframes of websites drifting
              through a neural field with traveling light pulses */}
          <motion.div style={{ scale: videoScale }} className="absolute inset-0">
            <HeroBlueprintCanvas />
          </motion.div>

          {/* Balanced overlays: headline pops, the code stays clearly visible */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(16,16,16,0.85) 0%, rgba(16,16,16,0.55) 45%, rgba(16,16,16,0.2) 70%, rgba(16,16,16,0.05) 100%), radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.45) 100%), linear-gradient(180deg, rgba(20,20,20,0.5) 0%, transparent 22%, transparent 72%, rgba(20,20,20,0.75) 100%)",
            }}
          />

          {/* Corner meta labels — studio-style professional detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{ opacity: hintOpacity }}
            aria-hidden
            className="absolute inset-x-0 top-24 z-10 hidden items-center justify-between px-10 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 lg:flex"
          >
            <span>{meta.scope}</span>
            <span>{meta.location}</span>
          </motion.div>

          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 lg:px-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
              {dict.hero.badge}
            </motion.p>

            <RevealText
              as="h1"
              className="max-w-5xl break-words font-display text-[7.2vw] leading-[1.25] text-white sm:text-[6.2vw] sm:leading-[1.2] lg:text-[58px] lg:leading-[1.2] xl:text-[68px]"
            >
              {dict.hero.titleStart}{" "}
              <span className="text-[var(--color-accent)]">{dict.hero.titleAccent}</span>
            </RevealText>

            <div className="mt-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <MagneticButton
                  as="a"
                  href={`/${locale}#projects`}
                  className="bg-[var(--color-accent)] text-white hover:bg-white hover:text-[var(--color-dark)]"
                >
                  {dict.hero.cta} →
                </MagneticButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="max-w-sm text-lg text-white/70 lg:text-right"
              >
                {dict.hero.subtitle}
              </motion.p>
            </div>

          </motion.div>

          {/* Second act: brand wordmark rises while the headline exits,
              so the scroll-out never feels empty */}
          <motion.div
            aria-hidden
            style={{ opacity: act2Opacity, scale: act2Scale, y: act2Y }}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5"
          >
            <span className="font-display text-[13vw] leading-none text-white sm:text-[10vw]">
              Alm<span className="text-[var(--color-accent)]">fi</span>code
            </span>
            <span className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/50 sm:text-xs">
              <span className="hidden h-[1px] w-10 bg-white/30 sm:block" />
              {meta.scope}
              <span className="hidden h-[1px] w-10 bg-white/30 sm:block" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          >
            <span className="text-xs uppercase tracking-wide text-white/50">
              {dict.hero.scrollHint}
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-[1px] bg-white/40"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
