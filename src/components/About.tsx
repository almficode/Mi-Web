import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import AboutCard from "./AboutCard";
import type { Dictionary } from "@/lib/dictionaries";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="relative overflow-hidden border-t border-[var(--color-border)] py-28 lg:py-36">
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
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
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
            <RevealOnScroll delay={0.15}>
              <p className="mt-8 max-w-md text-lg text-[var(--color-text-muted)]">
                {dict.about.description}
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dict.about.points.map((point, i) => (
              <AboutCard key={point.title} index={i} title={point.title} description={point.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
