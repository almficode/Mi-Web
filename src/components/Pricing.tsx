import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";
import { whatsappHref } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="pricing" className="relative border-t border-[var(--color-border)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
              {dict.pricing.eyebrow}
            </p>
          </RevealOnScroll>
          <RevealText
            as="h2"
            className="break-words font-display text-[9vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl"
          >
            {dict.pricing.titleStart}{" "}
            <span className="text-[var(--color-accent)]">{dict.pricing.titleAccent}</span>
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="mt-6 text-lg text-[var(--color-text-muted)]">
              {dict.pricing.subtitle}
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {dict.pricing.plans.map((plan, i) => (
            <RevealOnScroll key={plan.name} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-[var(--radius-lg)] border p-8 ${
                  plan.highlighted
                    ? "border-[var(--color-accent)] bg-[var(--color-text-strong)] text-white shadow-[var(--shadow-soft-lg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {dict.pricing.mostPopular}
                  </span>
                )}
                <h3
                  className={`text-xl font-semibold ${
                    plan.highlighted ? "text-white" : "text-[var(--color-text-strong)]"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`font-display mt-4 text-3xl ${
                    plan.highlighted ? "text-[var(--color-accent)]" : "text-[var(--color-text-strong)]"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-4 text-sm ${
                    plan.highlighted ? "text-white/70" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.highlighted ? "text-white/85" : "text-[var(--color-text)]"
                      }`}
                    >
                      <span className="mt-0.5 text-[var(--color-accent)]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <MagneticButton
                    as="a"
                    href={whatsappHref(dict.cta.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    className={
                      plan.highlighted
                        ? "bg-[var(--color-accent)] text-white hover:bg-white hover:text-[var(--color-text-strong)]"
                        : "bg-[var(--color-text-strong)] text-white hover:bg-[var(--color-accent)]"
                    }
                  >
                    {dict.pricing.cta}
                  </MagneticButton>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
