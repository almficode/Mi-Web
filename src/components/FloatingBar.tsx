"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { siteConfig, whatsappHref } from "@/lib/site-config";

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
          href={whatsappHref(dict.floatingBar.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          aria-label={dict.floatingBar.bookCall}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-surface-2)] py-2 pl-3 pr-1.5 text-xs font-semibold text-[var(--color-text-strong)] transition-colors duration-300 hover:bg-[var(--color-text-strong)] hover:text-white sm:gap-2 sm:py-2.5 sm:pl-5 sm:pr-2 sm:text-sm"
        >
          {dict.floatingBar.bookCall}
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white sm:h-7 sm:w-7">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="sm:h-3.5 sm:w-3.5">
              <path d="M17.6 6.32A7.85 7.85 0 0 0 12.02 4a7.94 7.94 0 0 0-6.87 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.8 1h.01a7.94 7.94 0 0 0 5.6-13.58Zm-5.58 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 1 1 5.6 3.1Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.77-.11.13-.23.15-.42.05a5.4 5.4 0 0 1-2.7-2.36c-.2-.35.2-.32.58-1.07.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.24-.18.19-.68.67-.68 1.63s.7 1.9.8 2.03c.1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.85.12-.94-.05-.09-.18-.14-.38-.24Z" />
            </svg>
          </span>
        </a>
      </div>
    </motion.div>
  );
}
