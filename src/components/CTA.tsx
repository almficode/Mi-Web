import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";
import { whatsappHref } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[var(--color-dark)] py-32 text-center lg:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,255,0.35) 0%, rgba(255,73,37,0.15) 50%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <RevealText
          as="h2"
          className="mx-auto break-words font-display text-[11vw] leading-[1.2] text-white sm:text-6xl lg:text-7xl"
        >
          {dict.cta.title}
        </RevealText>
        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-[var(--color-dark-text-muted)]">
            {dict.cta.subtitle}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <div className="mt-10 flex justify-center">
            <MagneticButton
              as="a"
              href={whatsappHref(dict.cta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-accent)] text-white hover:bg-white hover:text-[var(--color-dark)]"
            >
              {dict.cta.button}
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
