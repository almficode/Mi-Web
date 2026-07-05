"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "./RevealText";
import RevealOnScroll from "./RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

export default function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[var(--color-border)] py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <RevealOnScroll>
              <p className="mb-6 inline-flex rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-strong)]">
                {dict.faq.eyebrow}
              </p>
            </RevealOnScroll>
            <RevealText
              as="h2"
              className="break-words font-display text-[11vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-6xl lg:text-6xl"
            >
              {dict.faq.titleStart}{" "}
              <span className="text-[var(--color-accent)]">{dict.faq.titleAccent}</span>
            </RevealText>
          </div>

          <div className="flex flex-col gap-3">
            {dict.faq.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.question}
                  className={`rounded-[var(--radius-md)] border transition-colors duration-300 ${
                    isOpen ? "border-[var(--color-accent)] bg-white" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    data-cursor="link"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-sm uppercase text-[var(--color-text-strong)] sm:text-base">
                      Q{i + 1}: {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-text-strong)] text-lg text-white"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[var(--color-border)] px-6 py-5 text-[var(--color-text-muted)]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
