"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { siteConfig } from "@/lib/site-config";

export default function FloatingBar({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-6"
    >
      <div className="flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white/95 p-1 shadow-[var(--shadow-soft-lg)] backdrop-blur sm:p-1.5">
        <Link
          href={`/${locale}#pricing`}
          data-cursor="link"
          className="whitespace-nowrap rounded-[var(--radius-pill)] px-3 py-2 text-xs font-semibold text-[var(--color-text-strong)] transition-colors duration-300 hover:text-[var(--color-accent)] sm:px-5 sm:py-2.5 sm:text-sm"
        >
          {dict.floatingBar.pricing}
        </Link>
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-surface-2)] py-2 pl-3 pr-1.5 text-xs font-semibold text-[var(--color-text-strong)] transition-colors duration-300 hover:bg-[var(--color-text-strong)] hover:text-white sm:gap-2 sm:py-2.5 sm:pl-5 sm:pr-2 sm:text-sm"
        >
          {dict.floatingBar.bookCall}
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white sm:h-7 sm:w-7 sm:text-xs">
            A
          </span>
        </a>
      </div>
    </motion.div>
  );
}
