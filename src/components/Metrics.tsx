import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";
import type { Dictionary } from "@/lib/dictionaries";

export default function Metrics({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark)] py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg)] to-transparent lg:h-64"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,73,37,0.35) 0%, rgba(0,153,255,0.15) 50%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
        <RevealOnScroll>
          <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
            {dict.metrics.eyebrow}
          </p>
        </RevealOnScroll>
        <RevealText
          as="h2"
          className="mx-auto break-words font-display text-[9vw] leading-[1.2] text-[var(--color-dark-text-muted)] sm:text-5xl lg:text-6xl"
        >
          {dict.metrics.titleStart}{" "}
          <span className="text-[var(--color-accent)]">{dict.metrics.titleAccent}</span>
        </RevealText>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dict.metrics.items.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-[var(--radius-md)] bg-[var(--color-dark-surface)] p-6 text-left transition-colors duration-300 hover:bg-white">
                <h3 className="text-lg font-bold uppercase leading-tight text-white transition-colors duration-300 group-hover:text-[var(--color-text-strong)]">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-dark-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-text-muted)]">
                  {item.description}
                </p>
                <span className="font-display mt-10 text-4xl text-[var(--color-dark-text)] transition-colors duration-300 group-hover:text-[var(--color-salmon)] sm:text-5xl">
                  <AnimatedNumber value={item.value} />
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
