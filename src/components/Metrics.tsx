import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";
import type { Dictionary } from "@/lib/dictionaries";

// Repeating sine wave (2x width so it can loop seamlessly while sliding)
const WAVE_PATH =
  "M0 70 Q 180 8 360 70 T 720 70 T 1080 70 T 1440 70 T 1800 70 T 2160 70 T 2520 70 T 2880 70 V 130 H 0 Z";

export default function Metrics({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative bg-[var(--color-dark)] py-28 lg:py-36">
      {/* Animated wave divider bridging the white section above with the dark one */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 -translate-y-[calc(100%-2px)] overflow-hidden sm:h-24 lg:h-28"
      >
        {/* Accent wave behind, drifting the opposite way and peeking above */}
        <div
          className="absolute inset-y-0 left-0 w-[200%]"
          style={{ animation: "wave-x 19s linear infinite reverse" }}
        >
          <svg className="h-full w-full -translate-y-[14%]" viewBox="0 0 2880 130" preserveAspectRatio="none">
            <path d={WAVE_PATH} fill="var(--color-accent)" opacity="0.85" />
          </svg>
        </div>
        {/* Blue hint wave, slower */}
        <div
          className="absolute inset-y-0 left-0 w-[200%]"
          style={{ animation: "wave-x 27s linear infinite" }}
        >
          <svg className="h-full w-full -translate-y-[7%]" viewBox="0 0 2880 130" preserveAspectRatio="none">
            <path d={WAVE_PATH} fill="var(--color-accent-2)" opacity="0.5" />
          </svg>
        </div>
        {/* Dark wave in front, sliding forward */}
        <div
          className="absolute inset-y-0 left-0 w-[200%]"
          style={{ animation: "wave-x 13s linear infinite" }}
        >
          <svg className="h-full w-full" viewBox="0 0 2880 130" preserveAspectRatio="none">
            <path d={WAVE_PATH} fill="var(--color-dark)" />
          </svg>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,73,37,0.35) 0%, rgba(0,153,255,0.15) 50%, transparent 75%)",
          }}
        />
      </div>
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
